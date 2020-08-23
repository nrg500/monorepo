let conn = new Mongo("mongo:27017")
let db = conn.getDB("ingredients")
db.createCollection('ingredients');
db.ingredients.update({"name":"Verse geitenkaas","amount":200,"unit":"gr"}, {"name":"Verse geitenkaas","amount":200,"unit":"gr"}, {upsert: true})
db.ingredients.update({"name":"Geraspte jonge kaas","amount":175,"unit":"gr"}, {"name":"Geraspte jonge kaas","amount":175,"unit":"gr"}, {upsert: true})