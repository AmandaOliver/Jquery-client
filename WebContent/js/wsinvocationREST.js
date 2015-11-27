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
			var html ="Estudiantes";
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
			$('#contenido').html("ERROR "+ res.statusText); 
		}
	});
}

function getEstudiante(){
	var estudiante = $('#apellidos').val();
	estudiante = estudiante.replace(/\s+/g, '');
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/WebRestServer/TFG/estudiante/"+estudiante,
		success: function(data){
			$("#contenido").html(data); 
		},
		error:function(res){
			$("#contenido").html("ERROR "+ res.statusText);
		}
	});
}

function postJSON(){
	var estudiante = $("#estudiante").val();
	var estnombre = $("#estnombre").val();
	var estapellidos = $("#estapellidos").val();
	var esttema = $("#esttema").val();
	var esttutores = $("#esttutores").val();
	var estestado = $("#estestado").val();
	var estfecha = $("#estfecha").val();
	var estcalificacion = $("#estcalificacion").val();
	$.ajax( {
	type:"POST",
	url:"http://localhost:8080/WebRestServer//TFG/addEstudiante/"+estudiante,
	contentType:"application/json",
	dataType:"json",
	data:JSON.stringify( {"nombreAlumno":estnombre,"apellidosAlumno":estapellidos,
	      "temaProyecto": esttema, "listaTutores": esttutores,
	      "estado": estestado, "fechaPresentacion":estfecha,
	      "calificacion": estcalificacion}),
	success:function(data){
	var newAlumno = "<br>&nbsp&nbsp Alumno: "+data.nombreAlumno+" "+ data.apellidosAlumno+
    "<br>&nbsp&nbsp Tema: "+ data.temaProyecto+"<br>&nbsp&nbsp Tutores: "+
    data.listaTutores+"<br>&nbsp&nbsp Estado: "+data.estado+
    "<br>&nbsp&nbsp Fecha de presentacion: "+data.fechaPresentacion+
    "<br>&nbsp&nbsp Calificacion: "+data.calificacion+"<br>";
	$("#Proyecto").html("Date received: "+newAlumno); },
	error:function(res){
	alert("ERROR "+ res.statusText); }
	});
}

function postForm(){
	var estudiante = $("#estudiante").serializeObject();
	var estnombre = $("#estnombre").val();
	var estapellidos = $("#estapellidos").val();
	var esttema = $("#esttema").val();
	var esttutores = $("#esttutores").val();
	var estestado = $("#estestado").val();
	var estfecha = $("#estfecha").val();
	var estcalificacion = $("#estcalificacion").val();
	$.ajax( {
	type:"POST",
	url:"http://localhost:8080/WebRestServer//TFG/addEstudiante/"+estudiante,
	contentType:"application/x-www-form-urlencoded; charset=UTF-8",
	dataType:"json",
	data:JSON.stringify( {"nombreAlumno":estnombre,"apellidosAlumno":estapellidos,
	      "temaProyecto": esttema, "listaTutores": esttutores,
	      "estado": estestado, "fechaPresentacion":estfecha,
	      "calificacion": estcalificacion}),
	success:function(data){
	var newAlumno = "<br>&nbsp&nbsp Alumno: "+data.nombreAlumno+" "+ data.apellidosAlumno+
    "<br>&nbsp&nbsp Tema: "+ data.temaProyecto+"<br>&nbsp&nbsp Tutores: "+
    data.listaTutores+"<br>&nbsp&nbsp Estado: "+data.estado+
    "<br>&nbsp&nbsp Fecha de presentacion: "+data.fechaPresentacion+
    "<br>&nbsp&nbsp Calificacion: "+data.calificacion+"<br>";
	$("#Proyecto").html("Date received: "+newAlumno); },
	error:function(res){
	alert("ERROR "+ res.statusText); }
	});
}

function updateEstudiante(){
	var estudiante = $("#estudiante").val();
	var estnombre = $("#estnombre").val();
	var estapellidos = $("#estapellidos").val();
	var esttema = $("#esttema").val();
	var esttutores = $("#esttutores").val();
	var estestado = $("#estestado").val();
	var estfecha = $("#estfecha").val();
	var estcalificacion = $("#estcalificacion").val();
	$.ajax({
	type:"PUT",
	url:"http://localhost:8080/WebRestServer//TFG/addEstudiante/"+estudiante,
	contentType:"application/json",
	dataType:"json",
	data:JSON.stringify( {"nombreAlumno":estnombre,"apellidosAlumno":estapellidos,
	      "temaProyecto": esttema, "listaTutores": esttutores,
	      "estado": estestado, "fechaPresentacion":estfecha,
	      "calificacion": estcalificacion}),
	success: function(data){
	$("#Proyecto").html(data); },
	error:function(res){
	alert("ERROR "+ res.statusText); }
	});
}

function deleteJSON(alumno){
	$.ajax( {
	type:"DELETE",
	url:"http://localhost:8080/WebRestServer//TFG/delete/"
	+alumno,
	contentType:"application/json",
	dataType:"json",
	success:function(data){
	$("#Proyecto").html(data); },
	error:function(res){
	alert("ERROR "+ res.statusText); }
	});
}
