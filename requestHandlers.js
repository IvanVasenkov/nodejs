
var https = require("https");
var parsedData = '';
  var rawData = '';
function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+'<style>'+
	'.button{width: 270px;height: 90px;}'+'</style>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+'<div align = "center">'+'<br>'+'<br>'+'<br>'+'<br>'+'<br>'+'<br>'+
    '<form action="/upload" method="post">'+
    '<input type="submit" value="Загрузить данные" class="button"/>'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response) {

  https.get('https://jsonplaceholder.typicode.com/todos', (res) => {
  const statusCode = res.statusCode;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error(`Request Failed.\n` +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error(`Invalid content-type.\n` +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.log(error.message);
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    try {
      parsedData = JSON.parse(rawData);
	  var page = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+'<div align = "center">'+'<big>'+'<br>'+"Вот что загрузилось"+'<br>'+'<br>'+'</big>'+'<table border="1px">'+'<tr>'+'<td>'+"id"+'</td>'+'<td>'+"userId"+'</td>'+'<td>'+"title"+'</td>'+'<td>'+"completed"+'</td>';     
     for (var i in parsedData)
	  {
         page += '<tr>'+'<td>'+parsedData[i]['id']+'</td>' +'<td>'+parsedData[i]['userId']+'</td>'+'<td>'+parsedData[i]['title']+'</td>'+'<td>'+parsedData[i]['completed']+'</td>'+'</tr>';
	  }
  page +='</table>'+'</body>'+'</html>';
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(page);
  response.end();
    } catch (e) {
      console.log(e.message);
    }
  });
  res.resume();
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});


}

exports.start = start;
exports.upload = upload;
