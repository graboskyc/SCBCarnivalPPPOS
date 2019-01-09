exports = async function(payload,response) {
  var station = payload.query.station || '';
  var year = payload.query.year || '';
  year = year*1;
  var conn = context.services.get("mongodb-atlas").db("digisign").collection("menu");
  var r = '';
  var docs = await conn.find({"station":station, "menuyear":year}).toArray()
  r = JSON.stringify(docs[0]);
  
  //console.log(r);
  response.setHeader("Content-Type", "application/json");
  response.setBody(r);

};