const _ = require('lodash');

const compareDb = (usersExt, userLocal) => {
  let dbSynchronized = [];

  usersExt.forEach(ext => {
    // Add users who not need updated
    if (!ext.id_ext) {
      dbSynchronized.push(ext);
    }

    userLocal.forEach(local => {
      if (ext.id_ext === local.id) {

        // Update user informations if user already existed and it have prop id_ext
        dbSynchronized.push(
          {
            firstName: local.prenom,
            lastName: local.nom,
            id_ext: local.id,
            email: local.adresses.email,
            domicile: local.adresses.domicile
          }
        );

      } else {

        // Add users who don't already exist in database
        dbSynchronized.push(
          {
            firstName: local.prenom,
            lastName: local.nom,
            id_ext: local.id,
            email: local.adresses.email,
            domicile: local.adresses.domicile
          }
        );

      }

    });
  });

  return _.uniqBy(dbSynchronized, 'lastName');
};

module.exports = compareDb;