// ===============================
// DATOS DEL PACIENTE
// ===============================

const paciente = {
  nombre: "Sheyla Maery",
  fecha: "Miércoles 05 de agosto",
  hora: "10:00 a. m."
};

// ===============================
// MENSAJES DEL DÍA
// ===============================

const mensajes = [

"Hoy elegiste regalarte un momento para ti. Gracias por permitirnos acompañarte.",

"Cada pequeño paso cuenta. Gracias por confiar en Selah Alma Bonita.",

"Tu bienestar también merece un espacio en tu agenda.",

"Respira profundo. Hoy es un buen día para cuidar de ti.",

"Que esta sesión sea un momento de paz para tu cuerpo y tu mente."

];

// Escoge un mensaje al azar
const mensaje =
mensajes[Math.floor(Math.random() * mensajes.length)];

// Actualiza el mensaje
const mensajeDiv = document.querySelector(".mensaje");

if (mensajeDiv) {
  mensajeDiv.innerHTML = "✨ " + mensaje;
}
