let conn = new Mongo("mongo:27017")
let db = conn.getDB("ingredients")
db.createCollection('ingredients');
db.ingredients.update({"name":"Radishes","amount":200,"unit":"gr"}, {"name":"Radishes","amount":200,"unit":"gr"}, {upsert: true})
db.ingredients.update({"name":"Cucumber","amount":175,"unit":"gr"}, {"name":"Cucumber","amount":175,"unit":"gr"}, {upsert: true})