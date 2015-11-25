var express = require('express');
var app = express();
var request = require('request');
var multer=require('multer');
var upload=multer();
var fs = require('fs')


app.get('/', function (req, res) {
  res.send('Hello World!');
});



app.post('/',  upload.single('datas'),function(req, res){
	
	var url='https://klws.keylemon.com/api/recognize/?user=jacopo1395&key=j83bSVhaKzkI1EeT7DGHeYAjwbIRhQhVXyxVKHEFhNoh2fU0PggVPL&groups=f2bcc191-f31f-467c-b5a5-56842b49dd7e';
	var header={ 'Content-type':'multipart/form-data'
	}
	
	fs.writeFile(__dirname + '/temp/foto.jpg', req.file.buffer);
	console.log(req.body);
	console.log(req.file);
	
		
	
	 var formData = {	  
		  my_file: fs.createReadStream(__dirname + '/temp/foto.jpg')
		  };
		  console.log(formData);
		  
		  
	request.post({url:url, formData: formData}, function optionalCallback(err, httpResponse, body) {
			  if (err) {
				return console.error('upload failed:', err);
			  }
			  console.log('Upload successful!  Server responded with:', body);
			  res.send(body);
			  
			});
 
});  



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
