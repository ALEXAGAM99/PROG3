const express = require('express');
	const mysql = require('mysql');
	const app = express();
	console.time('Conexion Basica');

	const db = mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'',
		database:'electronicos'
	});

	db.connect((error)=>{
		if(error){
			console.error('error al conectar a la base de datos: ' , error);
		}else{
			console.timeEnd('Conexion Basica');
			console.log('conectado correctamente')
		}
	})

	app.use(express.urlencoded({extended:true}));
	app.use(express.static(__dirname));

	app.post('/guardar' , (req,res)=>{
		const {nombre,marca,modelo,precio} = req.body;
		db.query('INSERT INTO dispositivos (nombre,marca,modelo,precio) VALUES(?,?,?,?)',[nombre,marca,modelo,precio] , (error)=>{
			if (error) {
				console.error(error);
				return res.status(500).json({error:'Error al guardar'})
			}
			res.status(200).json({success: true});
		})
	})

	app.listen(3000,()=>{
		console.log('Servidor listo en el puerto http://localhost:3000');
	});
	process.on('SIGINT',()=>{
		db.end();
		process.exit();
	});