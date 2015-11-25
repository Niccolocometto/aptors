var express = require('express');    // inclusione modulo express per gestire la comunicazione verso il nostro server
var app = express();
var request = require('request');//inclusione del modulo request per gestire le richieste REST verso le varie piattaforme
var multer=require('multer'); //inclusione del modulo multer per prendere le immagini dalle post ricevute sul server
var upload=multer();
var fs = require('fs');//inclusione del modulo fs(file System) per gestire il salvataggio dei file immagine sul server per poi poterle riinviare


app.get('/', function (req, res) {
  res.send('Welcome to Aptors!!!!');
}); //comando di test sul server , inviano una get alla root('/') del server restituisce il messaggio di benvenuto


//Sezione di codice che si occupa di cosa accade se viene fatta una post sull'indirizzo di roott 
app.post('/',  upload.single('datas'),function(req, res){
	// la variabile url specifica che stiamo andando l'indirizzo dove vogliamo fare la richiesta rest(nel nostro caso usiamo le api di keylemon)
	// nella url ci autentichiamo presso il sito stesso per accedere alle API
	var url='https://klws.keylemon.com/api/recognize/?user=jacopo1395&key=j83bSVhaKzkI1EeT7DGHeYAjwbIRhQhVXyxVKHEFhNoh2fU0PggVPL&groups=f2bcc191-f31f-467c-b5a5-56842b49dd7e';
	//la variabile header ci serve perchè la richiesta che stiamo andando a fare richiede questo tipo di Header
	var header={ 'Content-type':'multipart/form-data'
	}
	//Nella post fatta al nostro server (dall'applicazione android ) viene inviato un file immagine che salviamo tramite fs
	fs.writeFile(__dirname + '/temp/foto.jpg', req.file.buffer);
	console.log(req.body);
	console.log(req.file);
	
		
	
	 var formData = {	  
		  my_file: fs.createReadStream(__dirname + '/temp/foto.jpg')
		  };
		  console.log(formData);
		  
	// ora tramite il modulo request inviamo la post che ha come argomenti url e form data e ci restituirà
	// il nome dell'attore nella foto
	request.post({url:url, formData: formData}, function optionalCallback(err, httpResponse, body) {
			  if (err) {
				return console.error('upload failed:', err);
			  }
			  console.log('Upload successful!  Server responded with:', body);
			  res.send(body);
 //in seguito cancelliamo la foto dal nostro server			  
			});
	fs.unlink(_dirname+'/temp/foto.jpg',function(err){
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});)
	
 
});  



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
