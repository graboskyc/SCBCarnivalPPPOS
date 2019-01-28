exports = async function(payload,response) {
  var station = payload.query.station || '';
  var year = payload.query.year || '';
  year = year*1;
  var conn = context.services.get("mongodb-atlas").db("digisign").collection("menu");
  var r = '';
  //var docs = await conn.find({"station":station, "menuyear":year}).toArray()
  var fulldoc = await conn.aggregate([{$match: {"station":station, "menuyear":year}}]).toArray();
  var docs = await conn.aggregate([{$match: {"station":station, "menuyear":year}}, {$unwind: {path: "$products",includeArrayIndex: 'index',preserveNullAndEmptyArrays: false}}, {$sort: {"products.itemType":1, "products.name":1}}, {$group: {_id: "$_id",products: {$push:"$products"}}}]).toArray();
  let mergeddoc = {...fulldoc[0], ...docs[0]}
  r = JSON.stringify(mergeddoc);
  
  //console.log(r);
  response.setHeader("Content-Type", "application/json");
  response.setBody(r);

};