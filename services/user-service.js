const admin = require('firebase-admin');
const users = require('../assets/users.json');
const _ = require('lodash');

const UserService = {
    getUsers: () => {
        return new Promise((resolve, reject) => {
            admin.database().ref('users').once('value',
                snapshot => {
                    resolve(snapshot.val())
                }, error => {
                    reject(error)
                })
        })
    },

    persistUser: user => {
        return admin.database().ref('users').push(user)
    },

    resetUsers: async users => {
        await admin.database().ref('users').set(null) // Supprimer les users
        let promises = []
        for (let user of users) {
            promises.push(UserService.persistUser(user))
        }
        return Promise.all(promises)
    },

    synchronization: async users => {
        let usersDbArray = [];
        let usersSync = [];
        const usersDb = await UserService.getUsers();

        _.findKey(usersDb, user => { usersDbArray.push(user) });

        for (let i = 0; i < usersDbArray.length; i++) {

            if (usersDbArray[i].id_ext === users[i].id) {
                // Update user informations if user already existed and it have prop id_ext
                usersSync.push(
                    {
                        firstName: users[i].prenom,
                        lastName: users[i].nom,
                        id_ext: users[i].id,
                        email: users[i].adresses.email,
                        domicile: users[i].adresses.domicile
                    }
                )
            } else {
                // Add users who not need updated
                usersSync.push(usersDbArray[i]);

                // Add users who don't already exist in database
                usersSync.push(
                    {
                        firstName: users[i].prenom,
                        lastName: users[i].nom,
                        id_ext: users[i].id,
                        email: users[i].adresses.email,
                        domicile: users[i].adresses.domicile
                    }
                )
            }
        }

        const usersSynchronized = await UserService.resetUsers(usersSync);

        return usersSynchronized;
    }
}

module.exports = UserService