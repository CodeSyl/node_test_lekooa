const admin = require('firebase-admin');
const users = require('../assets/users.json');
const compareDb = require('../utils/compareDb');
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

        const usersDb = await UserService.getUsers();
        _.findKey(usersDb, user => { usersDbArray.push(user) });

        const usersSynchronized = await UserService.resetUsers(compareDb(usersDbArray, users));

        return usersSynchronized;
    }
}

module.exports = UserService