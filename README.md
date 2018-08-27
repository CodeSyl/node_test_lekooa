# Notes de Sylvain LAPART

Je ne savais si vous souhaitiez que j'utilise firebase update methode pour mettre à jour les utilisateurs ? 
Si vous me laissez un peu de temps je peux le faire. J'ai lu la documentation et c'est dans mes cordes. 

Par contre je n'ai pas compris une chose. Les proprietes de la base de données de firebase ne correspond pas à la doc. J'ai pu me trompé mais je crois qu'elles sont en français et pas en Anglais. Je pense que l'erreur vient du fichier reset-users.json. 

Merci pour ce test, il m'a bien amusé. 

A bientot, 

Sylvain

## Format des données :

Les données sont au format JSON.

Pour notre BD, un `user` est comme suit :
```json
{
    "firstName": "Prenom",
    "lastName": "Nom",
    "email": "unmail@test.com",
    "id_ext": "IDENTIFIANT_EXTERNE"
}
```

Il fait parti d'un objet Firebase `users` qui est donc comme suit :
```json
"users" : {
    "IDENTIFIANT_FIREBASE1": {
        "firstName": "Prenom",
        "lastName": "Nom",
        "email": "unmail@test.com",
        "id_ext": "IDENTIFIANT_EXTERNE"
    },
    "IDENTIFIANT_FIREBASE2": {
        ...
    }
}
```

L'identifiant d'un utilisateur est en fait sa `key` dans l'objet supérieur stocké sur Firebase

Un identifiant Firebase peut par exemple être : `-L33K7bpaCoMT8mEwMFf`

C'est une chaîne de caractère générée automatiquement par Firebase lors d'un `push` => [En savoir plus](https://firebase.google.com/docs/database/admin/save-data)

Pour la BD distante, leur doc nous donne ce format pour un `user` :
```json
{
    "prenom": "Prenom",
    "nom": "Nom",
    "adresses": {
        "email": "unmail@test.com",
        "domicile": "Une adresse"
    },
    "id": "NOM-PRENOM",
}
```

# Happy coding!