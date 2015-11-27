function getAll(){
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "http://localhost:8080/WebRestServer//TFG/all",
		success: function(data){
		var myStudient="Proyectos Almacenados:";
		for (var i=0; i<data.length; i++) {
	      myStudient += "<br>&nbsp&nbsp Alumno: "+data[i].nombreAlumno+" "+ data[i].apellidosAlumno+
	      "<br>&nbsp&nbsp Tema: "+ data[i].temaProyecto+"<br>&nbsp&nbsp Tutores: "+
	      data[i].listaTutores+"<br>&nbsp&nbsp Estado: "+data[i].estado+
	      "<br>&nbsp&nbsp Fecha de presentacion: "+data[i].fechaPresentacion+
	      "<br>&nbsp&nbsp Calificacion: "+data[i].calificacion+"<br>";
	    }
		$("#Proyecto").html(myStudient);},
		error:function(res){
		alert("ERROR "+ res.statusText); }
	});
}

function getEstudiante(myId){
	var myUrl =
	"http://localhost:8080/WebRestServer//TFG/estudiante/"
	+ myId;
	$.ajax({
	type: "GET",
	url: myUrl,
	success: function(data){
	$("#Proyecto").html(data); },
	error:function(res){
	alert("ERROR "+ res.statusText); }
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
