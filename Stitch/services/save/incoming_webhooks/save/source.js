exports = async function(payload,response) {
  var recpt = JSON.parse(payload.body.text());
  recpt.created = new Date(Date.now());
  var conn = context.services.get("mongodb-atlas").db("digisign").collection("pos");
  await conn.insertOne(recpt);
};