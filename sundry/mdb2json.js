
//async function toJSON(jsonResult:string, sql:string, dbPath:string) {
async function toJSON(jsonResult, sql, dbPath) {

    const adodb = await import("node-adodb");
    const fs = await import("fs");
  try {
    const connection = adodb.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=db.mdb;');
    const data = await connection.query(sql);
    const dataString=JSON.stringify(data, null, 2);

    fs.writeFile('data/' + jsonResult, dataString, (err) => {  
      if (err) throw err;
      console.log(jsonResult + ' saved!');
  });
  } catch (error) {
    console.log(jsonResult + ' error !');
    console.error(error);
  }
}

toJSON("D:\\Dev\\OhioLeps01\\SiteDate.js", "select * from SiteDate", "D:\\Dev\\OhioLeps01\\prisma\\OlbmClv10.Converted.accdb");
