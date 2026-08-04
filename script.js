// ===============================
// DATOS DE LA CITA
// ===============================

const cita = {
    nombre: "",
    fecha: "08 de agosto",
    hora: "5:00 p. m.",
    duracion: "60 minutos"
};


// ===============================
// MOSTRAR DATOS DE CITA
// ===============================

const fechaCita = document.getElementById("fechaCita");
const horaCita = document.getElementById("horaCita");
const duracionCita = document.getElementById("duracionCita");

if(fechaCita){
    fechaCita.innerHTML = "📅 " + cita.fecha;
}

if(horaCita){
    horaCita.innerHTML = "🕙 " + cita.hora;
}

if(duracionCita){
    duracionCita.innerHTML = "⏱️ Duración: " + cita.duracion;
}


// ===============================
// MENSAJES SELAH (30 DÍAS)
// ===============================

const mensajes = [
"Hoy elegiste regalarte un momento para ti. 🌸",
"Respira profundo, tu bienestar también merece espacio.",
"Cada pequeño paso hacia ti es una forma de amor.",
"Tu cuerpo merece cuidado, escucha y descanso.",
"Hoy es un buen día para florecer.",
"Permítete recibir bienestar y calma.",
"Tu proceso merece paciencia y amor.",
"Regálate un momento de conexión contigo.",
"Tu bienestar comienza con una decisión.",
"Que hoy encuentres paz en cada respiración.",
"Cuida tu cuerpo, honra tu camino.",
"Cada sesión es una oportunidad de reconectar.",
"Tu bienestar es una prioridad.",
"Confía en tu proceso.",
"Respira, suelta y permite sanar.",
"Hoy eliges cuidarte.",
"Tu cuerpo tiene sabiduría.",
"Un momento para ti puede transformar tu día.",
"La calma también es medicina.",
"Escucharte es un acto de amor.",
"Pequeños cambios crean grandes resultados.",
"Tu bienestar florece paso a paso.",
"Gracias por confiar en Selah Alma Bonita.",
"Que esta sesión sea un espacio de paz.",
"Hoy mereces sentirte bien.",
"Tu energía merece cuidado.",
"Cada día es una nueva oportunidad.",
"Con amor y paciencia todo proceso florece.",
"Regálate calma, presencia y bienestar.",
"Que Selah sea un momento para ti."
];

const mensajeDiv = document.querySelector(".mensaje");

if(mensajeDiv){

    const dia = new Date().getDate();

    mensajeDiv.innerHTML =
    "✨ " + mensajes[dia % mensajes.length];

}
// ===============================
// BOTÓN WHATSAPP
// ===============================

const btnWhatsApp = document.getElementById("btnWhatsApp");

if(btnWhatsApp){

    btnWhatsApp.onclick = () => {

        const texto =
`Hola Adriana 🌸

Confirmo mi asistencia para mi cita.

Fecha: ${cita.fecha}
Hora: ${cita.hora}

Gracias.`;

        const url =
        "https://wa.me/5216642198335?text=" +
        encodeURIComponent(texto);

        window.open(url,"_blank");

    };

}


// ===============================
// GOOGLE MAPS
// ===============================

const btnMapa = document.getElementById("btnMapa");

if(btnMapa){

    btnMapa.onclick = () => {

        window.open(
        "https://maps.app.goo.gl/nvW6SGQAr4T17DMW7",
        "_blank"
        );

    };

}


// ===============================
// FORMAS DE PAGO
// ===============================

const btnPago = document.getElementById("btnPago");

if(btnPago){

    btnPago.onclick = () => {

        alert(
`🌸 SELAH ALMA BONITA

Banco:
Banorte

Titular:
Adriana Itzel Guzmán Alarcón

Cuenta:
1220403183

CLABE:
072028012204031831

Después de realizar tu pago puedes enviar tu comprobante por WhatsApp. 💗`
        );

    };

}


// ===============================
// COPIAR DATOS
// ===============================

function copiarTexto(texto){

    navigator.clipboard.writeText(texto);

    alert("✨ Copiado correctamente");

}
// ===============================
// CALENDARIO
// ===============================

const btnCalendario = document.getElementById("btnCalendario");

if(btnCalendario){

    btnCalendario.onclick = () => {

        alert(
`📅 Próximamente podrás agregar tu cita al calendario.

Fecha:
${cita.fecha}

Hora:
${cita.hora}

Duración:
${cita.duracion}`
        );

    };

}


// ===============================
// RESEÑA
// ===============================

const btnResena = document.getElementById("btnResena");

if(btnResena){

    btnResena.onclick = () => {

        window.open(
        "https://wa.me/5216642198335?text=Hola%20Adriana.%20Quiero%20compartir%20mi%20experiencia.",
        "_blank"
        );

    };

}


// ===============================
// MÚSICA
// ===============================

const btnMusica = document.getElementById("btnMusica");
const musicaSelah = document.getElementById("musicaSelah");

if(btnMusica && musicaSelah){

    btnMusica.onclick = async () => {

        try{

            if(musicaSelah.paused){

                await musicaSelah.play();

                btnMusica.innerHTML = "⏸️";

            }else{

                musicaSelah.pause();

                btnMusica.innerHTML = "🎵";

            }

        }catch(error){

            console.log("No fue posible reproducir el audio.", error);

        }

    };

}
