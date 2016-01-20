/**
 * Método que obtiene todos los estudiantes y los muestra
 */
function getAll(){
	$.ajax({
		type: "GET",
		//va a devolver el contenido en un Json
		dataType: "json",
		//url de nuestro servicio web
		url: "http://localhost:8080/WebRestServer/TFG/all",
		crossDomain : true ,
		//esto se hará en caso de que el servicio web funcione
		success: function(data){
			var html ="";
			//bucle que recorre todos los elementos del json 
			$.each(data, function(i,item){		
				html+='<ul>'
					+'<li> Nombre del estudiante: ' + item.nombre + ' ' + item.apellido1 + ' ' + item.apellido2 + '</li>'
					+'<li> Tema del TFG: '+item.tema+'</li>'
					+'<li> Director del TFG: '+item.tutor1+'</li>';
					if(item.tutor2!="null") html+='<li> Co-director del TFG: '+item.tutor2+'</li>';
					html+='<li> Estado del TFG: '+item.estado+'</li>'
					if(item.estado=="PRESENTADO"){
						html+='<li> Fecha de presentación: '+item.fechaPresentacion+'</li>'
						+'<li> Calificación: '+item.calificacion+'</li>';
					}
					html+='</ul><br><br>';
			});
			//se pasa el contenido a la vista
			$("#contenido").html(html);
		},		
		//esto se hará en caso de que el servicio web falle
		error:function(res){
			alert("ERROR "+ res.statusText);
		}
	});
}
/**
 * Método que obtiene un estudiante y muestra sus datos
 */
function getEstudiante(){
	//obtenemos los apellidos del estudiante que se desea mostrar, 
	//estos se han introducido en un formulario del html
	var estudiante = $('#apellidos_estudiante').val();
	//Quitamos los espacios
	estudiante = estudiante.replace(/\s+/g, '');
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/WebRestServer/TFG/estudiante/"+estudiante,
		success: function(data){
			$("#contenido2").html(data); 
		},
		error:function(res){
			alert("ERROR "+ res.statusText);
		}
	});
}

/**
 * Método que permite modificar el tema, estado fecha de presentación y calificación
 *  de un TFG de un alumno, pasándole los nuevos datos mediante un formulario html
 */
function modificarEstudiante(){
	//nos traemos los datos del formulario
	var estudiante = $("#apellidos2_modificar").val();
	//eliminamos los espacios de los apellidos
	estudiante = estudiante.replace(/\s+/g, '');
	var tema = $("#tema_modificar").val();
	var estado = $("#estado_modificar").val();
	var fecha = $("#fecha_modificar").val();
	var calificacion = $("#calificacion_modificar").val();
	if(estado==""){
		estado="NULL";
	}
	$.ajax({
		type:"PUT",
		url:"http://localhost:8080/WebRestServer/TFG/update/"+estudiante,
		contentType:"application/json",
		dataType:"text",
		//pasamos una cadena a JSON que es lo que nuestro servicio web nos pide
		data:JSON.stringify( {"tema": tema,"estado": estado,
			"fechaPresentacion":fecha,"calificacion": calificacion}),
	    success: function(data){
	    	var html="Estudiante actualizado";
	    	$("#contenido3").html(html);
	    },
	    error:function(res){
	    	alert("ERROR "+ res.statusText);
	    }
	});
}

/**
 * Método que permite añadir un nuevo estudiante pasándole 
 * los datos mediante un formulario html(transformándolo a json)
 */
function nuevoEstudianteJSON(){
	//Nos traemos los datos del formulario
	var nombre = $("#nombre_nuevo").val();
	var apellido1 = $("#apellido1_nuevo").val();
	var apellido2 = $("#apellido2_nuevo").val();	
	var tema = $("#tema_nuevo").val();
	var tutor1 = $("#director_nuevo").val();
    var tutor2 = $("#co-director_nuevo").val();	
	var estado = $("#estado_nuevo").val();
	var fecha = $("#fecha_nuevo").val();
	var calificacion = $("#calificacion_nuevo").val();
	$.ajax( {
		type:"POST",
		url:"http://localhost:8080/WebRestServer/TFG/addEstudiante",
		contentType:"application/json",
		dataType:"text",
		//creamos el json que recibe el servicio web
		data:JSON.stringify( {"nombre": nombre,"apellido1": apellido1,
			"apellido2": apellido2,"tema":tema, "tutor1": tutor1,
			"tutor2": tutor2,"estado": estado, "fechaPresentacion":fecha,
	      "calificacion": calificacion}),
	    success:function(data){
	    	var html="Estudiante añadido";
	    	$('#contenido4').html(html);
	    },
	    error:function(res){
	    	alert("ERROR "+ res.statusText); }
	});
}

/**
 * Método que permite añadir un nuevo estudiante pasándole 
 * los datos mediante un formulario html
 */
function nuevoEstudianteFORM(){
	//Nos traemos los datos del formulario
	var nombre = $("#nombre").val();
	var apellido1 = $("#apellido1").val();
	var apellido2 = $("#apellido2").val();	
	var tema = $("#tema").val();
	var tutor1 = $("#director").val();
    var tutor2 = $("#co-director").val();	
	var estado = $("#estado").val();
	var fecha = $("#fecha").val();
	var calificacion = $("#calificacion").val();
	$("#idForm").submit(function(e) {
	    var url = "http://localhost:8080/WebRestServer/TFG/addEstudianteForm"; // the script where you handle the form input.

	    $.ajax({
	           type: "POST",
	           url: url,
	           contentType: 'application/x-www-form-urlencoded',
	           data: $("#idForm").serialize(), // serializes the form's elements.
	        
	           success: function(data)
	           {
	               alert(data); // show response from the php script.
	           },
	    error:function(res){
	    	data.print(); }
	         });

	    e.preventDefault(); // avoid to execute the actual submit of the form.
	});
	
}
function borrarEstudiante(alumno){
	//Nos traemos los datos del formulario
	var apellidos = $("#apellidos_borrar").val();
	//eliminamos los espacios de los apellidos
	apellidos = apellidos.replace(/\s+/g, '');
	$.ajax( {
		type:"DELETE",
		url:"http://localhost:8080/WebRestServer//TFG/delete/"+apellidos,
		contentType:"application/json",
		dataType:"json",
		success:function(data){
			var html="Estudiante borrado";
			$("#contenido6").html(html);
		},
		error:function(res){
			alert("ERROR "+ res.statusText); 
		}
	});
}




