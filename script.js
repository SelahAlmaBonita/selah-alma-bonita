// ===============================
// DATOS DEL PACIENTE
// ===============================

const paciente = {
    nombre: "Sheyla Maery",
    fecha: "Miércoles 05 de agosto",
    hora: "10:00 a. m.",
    duracion: "60 minutos"
};


// ===============================
// MOSTRAR DATOS DEL PACIENTE
// ===============================

document.getElementById("nombrePaciente").textContent = paciente.nombre;
document.getElementById("fechaCita").textContent = paciente.fecha;
document.getElementById("horaCita").textContent = paciente.hora;
document.getElementById("duracionCita").textContent = paciente.duracion;



// ===============================
// MENSAJE DEL DÍA
// ===============================

const mensajes = [
    "Hoy elegiste regalarte un momento para ti. Gracias por permitirnos acompañarte.",
    "Cada pequeño paso cuenta. Gracias por confiar en Selah Alma Bonita.",
    "Tu bienestar también merece un espacio en tu agenda.",
    "Respira profundo. Hoy es un buen día para cuidar de ti.",
    "Que esta sesión sea un momento de paz para tu cuerpo y tu mente."
];


const mensajeAleatorio =
mensajes[Math.floor(Math.random()*mensajes.length)];


const mensajeDiv = document.querySelector(".mensaje");


if(mensajeDiv){
    mensajeDiv.innerHTML = "✨ " + mensajeAleatorio;
}



// ===============================
// WHATSAPP CONFIRMAR ASISTENCIA
// ===============================

const btnWhatsApp =
document.getElementById("btnWhatsApp");


if(btnWhatsApp){

btnWhatsApp.onclick = () => {


const texto =
`Hola Adriana 🌸

Soy ${paciente.nombre}.

Confirmo mi asistencia para mi cita del ${paciente.fecha} a las ${paciente.hora}.

Gracias 💗`;


window.open(
`https://wa.me/5216642198335?text=${encodeURIComponent(texto)}`,
"_blank"
);


};

}



// ===============================
// GOOGLE MAPS
// ===============================

const btnMapa =
document.getElementById("btnMapa");


if(btnMapa){

btnMapa.onclick = () => {

window.open(
"https://maps.app.goo.gl/nvW6SGQAr4T17DMW7?g_st=ic",
"_blank"
);

};

}



// ===============================
// FORMAS DE PAGO
// ===============================

const btnPago =
document.getElementById("btnPago");

const pagoBox =
document.getElementById("pagoBox");


if(btnPago){

btnPago.onclick = () => {

pagoBox.classList.remove("oculta");

};

}



// CERRAR PAGOS

const cerrarPago =
document.getElementById("cerrarPago");


if(cerrarPago){

cerrarPago.onclick = () => {

pagoBox.classList.add("oculta");

};

}



// ===============================
// COPIAR CLABE
// ===============================

const copiarClabe =
document.getElementById("copiarClabe");


if(copiarClabe){

copiarClabe.onclick = () => {


const clabe =
document.getElementById("clabe").innerText;


navigator.clipboard.writeText(clabe);


alert("CLABE copiada correctamente 🌸");

};

}



// ===============================
// COPIAR CUENTA BANORTE
// ===============================

const copiarCuenta =
document.getElementById("copiarCuenta");


if(copiarCuenta){

copiarCuenta.onclick = () => {


const cuenta =
document.getElementById("cuenta").innerText;


navigator.clipboard.writeText(cuenta);


alert("Cuenta Banorte copiada correctamente 🌸");

};

}



// ===============================
// ENVIAR COMPROBANTE
// ===============================

const enviarComprobante =
document.getElementById("enviarComprobante");


if(enviarComprobante){

enviarComprobante.onclick = () => {


const texto =
`Hola Adriana 🌸

Te envío mi comprobante de pago.

Paciente:
${paciente.nombre}`;


window.open(
`https://wa.me/5216642198335?text=${encodeURIComponent(texto)}`,
"_blank"
);


};

}



// ===============================
// RESEÑA
// ===============================

const btnResena =
document.getElementById("btnResena");


if(btnResena){

btnResena.onclick = () => {


const texto =
"Hola Adriana 🌸 Me gustaría compartir mi experiencia con Selah Alma Bonita.";


window.open(
`https://wa.me/5216642198335?text=${encodeURIComponent(texto)}`,
"_blank"
);


};

}



// ===============================
// CALENDARIO
// ===============================

const btnCalendario =
document.getElementById("btnCalendario");


if(btnCalendario){

btnCalendario.onclick = () => {


alert(
`📅 Tu cita está reservada:

${paciente.fecha}

${paciente.hora}

Duración:
${paciente.duracion}`
);


};

}
