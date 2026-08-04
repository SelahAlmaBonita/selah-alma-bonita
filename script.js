// ======================================================
// SELAH ALMA BONITA PREMIUM
// SCRIPT PRINCIPAL
// ======================================================


// ===============================
// VERIFICAR CONFIGURACIÓN
// ===============================

if (typeof CONFIG === "undefined") {

    console.error("No se encontró config.js");

} else {


    // ===============================
    // DATOS DEL PACIENTE
    // ===============================

    const paciente = CONFIG.paciente;



    // ===============================
    // SALUDO PERSONALIZADO
    // ===============================

    function saludoPaciente(){

        let saludo = "";

        if(paciente.categoria === "niño"){

            saludo = paciente.genero === "masculino"
            ? "¡Qué gusto recibirte"
            : "¡Qué gusto recibirte";

        }else{

            saludo = paciente.genero === "masculino"
            ? "Bienvenido"
            : "Bienvenida";

        }


        if(paciente.tratamiento === "sr"){

            return saludo + " " + "Sr. " + paciente.nombre;

        }

        if(paciente.tratamiento === "sra"){

            return saludo + " " + "Sra. " + paciente.nombre;

        }


        return saludo + " " + paciente.nombre;

    }



    // ===============================
    // MOSTRAR BIENVENIDA
    // ===============================

    const saludo = document.querySelector(".saludo");

    if(saludo){

        saludo.innerHTML =
        saludoPaciente() +
        "<br><br>Nos llena de alegría recibirte en Selah Alma Bonita. 🌸";

    }



    // ===============================
    // DATOS DE CITA
    // ===============================

    const fechaCita =
    document.getElementById("fechaCita");


    const horaCita =
    document.getElementById("horaCita");


    const duracionCita =
    document.getElementById("duracionCita");



    if(fechaCita){

        fechaCita.innerHTML =
        "📅 " + paciente.fecha;

    }


    if(horaCita){

        horaCita.innerHTML =
        "🕙 " + paciente.hora;

    }


    if(duracionCita){

        duracionCita.innerHTML =
        "⏱️ Duración: " + paciente.duracion;

    }



    // ===============================
    // MENSAJES SELAH
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



    const mensajeDiv =
    document.querySelector(".mensaje");



    if(mensajeDiv){

        const dia =
        new Date().getDate();


        mensajeDiv.innerHTML =
        "✨ " +
        mensajes[dia % mensajes.length];

    }



    // ===============================
    // WHATSAPP
    // ===============================


    const btnWhatsApp =
    document.getElementById("btnWhatsApp");



    if(btnWhatsApp){


        btnWhatsApp.onclick = ()=>{


            const texto =

`Hola Adriana 🌸

✨ Confirmo mi asistencia para mi cita en Selah Alma Bonita.

👤 Paciente:
${paciente.nombre}

📅 Fecha:
${paciente.fecha}

🕙 Hora:
${paciente.hora}

🌿 Terapia:
${paciente.terapia}

Gracias por acompañarme en este proceso de bienestar y sanación. 🌸

Nos vemos en mi próxima sesión. ✨`;



            const url =

            "https://wa.me/" +
            CONFIG.whatsapp.telefono +
            "?text=" +
            encodeURIComponent(texto);



            window.open(url,"_blank");


        };


    }




    // ===============================
    // GOOGLE MAPS
    // ===============================


    const btnMapa =
    document.getElementById("btnMapa");



    if(btnMapa){

        btnMapa.onclick = ()=>{

            window.open(
                CONFIG.maps.url,
                "_blank"
            );

        };

    }




    // ===============================
    // MÚSICA
    // ===============================


    const btnMusica =
    document.getElementById("btnMusica");


    const musicaSelah =
    document.getElementById("musicaSelah");



    if(btnMusica && musicaSelah){


        btnMusica.onclick = async()=>{


            try{


                if(musicaSelah.paused){


                    await musicaSelah.play();

                    btnMusica.innerHTML="⏸️";


                }else{


                    musicaSelah.pause();

                    btnMusica.innerHTML="🎵";


                }



            }catch(error){

                console.log(error);

            }


        };


    }


// ===============================
// PAGOS PREMIUM SELAH
// ===============================

const btnPago = document.getElementById("btnPago");
const pagoBox = document.getElementById("pagoBox");


if(btnPago && pagoBox){


    btnPago.onclick = ()=>{


        pagoBox.innerHTML = `

        <div class="pagoTarjeta">

            <h2>🌸 Selah Alma Bonita</h2>

            <h3>${CONFIG.pago.banco}</h3>


            <p class="tituloPago">
            Titular
            </p>

            <strong>
            ${CONFIG.pago.titular}
            </strong>



<div class="datoPago">

<span>🏦 Cuenta</span>

<b>${CONFIG.pago.cuenta}</b>

<button onclick="copiarPago('${CONFIG.pago.cuenta}')">
📋 Copiar
</button>

</div>


<div class="datoPago">

<span>🔐 CLABE</span>

<b>${CONFIG.pago.clabe}</b>

<button onclick="copiarPago('${CONFIG.pago.clabe}')">
📋 Copiar
</button>

</div>



<button id="enviarComprobante">
💬 Enviar comprobante por WhatsApp
</button>



<button id="cerrarPago">
✨ Cerrar
</button>


        </div>

        `;


        pagoBox.classList.remove("oculta");



        document
        .getElementById("cerrarPago")
        .onclick = ()=>{

            pagoBox.classList.add("oculta");

        };



        document
        .getElementById("enviarComprobante")
        .onclick = ()=>{


             const mensaje =

`Hola Adriana 🌸

✨ Gracias por acompañarme en este proceso de bienestar y sanación.

Te comparto mi comprobante de pago correspondiente a mi cita en Selah Alma Bonita:

👤 Paciente:
${paciente.nombre}

📅 Fecha:
${paciente.fecha}

🕙 Hora:
${paciente.hora}

🌿 Terapia:
${paciente.terapia}

Gracias por este espacio de paz, bienestar y sanación que compartes conmigo. 🌸

Con cariño, nos vemos en nuestra próxima sesión. ✨;



            window.open(

            "https://wa.me/" +
            CONFIG.whatsapp.telefono +
            "?text=" +
            encodeURIComponent(mensaje),

            "_blank"

            );


        };


    };


}



// COPIAR DATOS BANCARIOS

window.copiarPago = function(texto){


    navigator.clipboard.writeText(texto);



    const aviso = document.createElement("div");


    aviso.className="avisoCopia";


    aviso.innerHTML="✨ Copiado correctamente";



    document.body.appendChild(aviso);



    setTimeout(()=>{

        aviso.remove();

    },2000);


};
    
}
