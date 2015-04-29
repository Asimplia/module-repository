
use farfalia_prod;
db.createUser({user: "back", pwd: "ANY_PASSWORD_HERE", roles: [{role: "readWrite", db: "farfalia_prod"}]});
