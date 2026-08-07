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
// PROGRESO DE SESIONES
// ===============================

const barraProgreso =
document.getElementById("barraProgreso");

const textoProgreso =
document.getElementById("textoProgreso");

if(barraProgreso && textoProgreso){

    const porcentaje =
    (paciente.sesiones / paciente.objetivo) * 100;

    barraProgreso.style.width =
    porcentaje + "%";

    textoProgreso.innerHTML =
    paciente.sesiones +
    " de " +
    paciente.objetivo +
    " sesiones completadas 🌸";

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

Queda confirmada mi asistencia a la siguiente cita en Selah Alma Bonita.

👤 Paciente:
${paciente.nombre}

📅 Fecha:
${paciente.fecha}

🕙 Hora:
${paciente.hora}

🌿 Terapia:
${paciente.terapia}

Gracias por acompañarme en este proceso de bienestar y sanación. 🌸

Nos vemos muy pronto. ✨`;



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

Te comparto mi comprobante de pago correspondiente a mi cita en Selah Alma Bonita.

👤 Paciente:
${paciente.nombre}

📅 Fecha:
${paciente.fecha}

🕙 Hora:
${paciente.hora}

🌿 Terapia:
${paciente.terapia}

Gracias por regalarme este espacio de paz, bienestar y sanación. 🌸

Con cariño, nos vemos en nuestra próxima sesión. ✨`;



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

// ===============================
// GOOGLE RESEÑAS
// ===============================

const btnResena = document.getElementById("btnResena");

if(btnResena){

    btnResena.onclick = ()=>{

        if(CONFIG.experiencia.compartirGoogle && CONFIG.google.url){

            window.open(CONFIG.google.url,"_blank");

            return;

        }

        if(CONFIG.experiencia.compartirInstagram && CONFIG.instagram.url){

            window.open(CONFIG.instagram.url,"_blank");

            return;

        }

        alert("Próximamente podrás compartir tu experiencia.");
    };

}

// ===============================
// INSTAGRAM
// ===============================

const btnInstagram = document.getElementById("btnInstagram");

if(btnInstagram){

    btnInstagram.onclick = ()=>{

        if(CONFIG.instagram.url){

            window.open(CONFIG.instagram.url,"_blank");

        }else{

            alert("Instagram próximamente.");

        }

    };

}


// ===============================
// HISTORIA SELAH PREMIUM
// ===============================

const btnHistoria = document.getElementById("btnHistoria");
const historiaBox = document.getElementById("historiaBox");


if(btnHistoria && historiaBox){

btnHistoria.onclick = ()=>{


historiaBox.innerHTML = `

<div class="historiaContenedor">


<img 
src="logo.png"
class="historiaLogo">


<h2>
🌸 Crea tu historia Selah
</h2>


<p>
Comparte lo que floreció en ti después de tu experiencia.
</p>


<textarea 
id="textoHistoria"
class="historiaTexto"
placeholder="Hoy me regalé un momento para mí...">
</textarea>

<br>

<label class="historiaBoton">
📷 Elegir mi foto

<input 
type="file"
id="fotoHistoria"
accept="image/*"
style="display:none;">
</label>

<br>

<div 
id="vistaHistoria"
class="historiaTarjeta">

${CONFIG.historia.mensaje}

<br><br>

✨ Selah Alma Bonita

<br>

Detente, respira, sana y florece

</div>



<button 
id="compartirHistoria"
class="historiaBoton">

📸 Crear mi historia

</button>



<button 
id="cerrarHistoria"
class="historiaBoton historiaCerrra">

Cerrar

</button>


</div>

`;


historiaBox.classList.remove("oculta");



const textoHistoria =
document.getElementById("textoHistoria");

const fotoHistoria =
document.getElementById("fotoHistoria");


let imagenHistoria = "";


if(fotoHistoria){

    fotoHistoria.onchange = ()=>{

        const archivo = fotoHistoria.files[0];

        if(archivo){

            const lector = new FileReader();

            lector.onload = function(e){

                imagenHistoria = e.target.result;

                vistaHistoria.innerHTML = `

                <img src="${imagenHistoria}" 
                style="width:100%;border-radius:20px;margin-bottom:15px;">

                "${textoHistoria.value}"

                <br><br>

                ✨ Selah Alma Bonita

                <br>

                Detente, respira, sana y florece

                <br><br>

                #SelahAlmaBonita

                `;

            };

            lector.readAsDataURL(archivo);

        }

    };

}
    
const vistaHistoria =
document.getElementById("vistaHistoria");



textoHistoria.oninput = ()=>{

vistaHistoria.innerHTML = `

"${textoHistoria.value}"

<br><br>

✨ Selah Alma Bonita

<br>

Detente, respira, sana y florece

`;

};



document.getElementById("cerrarHistoria").onclick = ()=>{

historiaBox.classList.add("oculta");

};



document.getElementById("compartirHistoria").onclick = ()=>{


html2canvas(vistaHistoria).then(async(canvas)=>{

    canvas.toBlob(async(blob)=>{

        const archivo = new File(
            [blob],
            "SelahAlmaBonita.png",
            {type:"image/png"}
        );

        if(
            navigator.canShare &&
            navigator.canShare({files:[archivo]})
        ){

            await navigator.share({

                title:"Selah Alma Bonita",

                text:"Mi experiencia en Selah Alma Bonita 🌸 #SelahAlmaBonita",

                files:[archivo]

            });

        }else{

            alert("Tu dispositivo no permite compartir imágenes automáticamente.");

        }

    });

});


};


};


}


// ===============================
// LLAMAR
// ===============================

const btnLlamar = document.getElementById("btnLlamar");

if(btnLlamar){

    btnLlamar.onclick = ()=>{

        window.location.href =
        "tel:+526642198335";

    };

}



// ===============================
// SOLICITAR CITA
// ===============================

const btnSolicitar =
document.getElementById("btnSolicitar");

if(btnSolicitar){

    btnSolicitar.onclick = ()=>{

        const mensaje =
        "Hola Adriana 🌸 Me gustaría agendar una cita en Selah Alma Bonita.";

        window.open(

        "https://wa.me/" +
        CONFIG.whatsapp.telefono +
        "?text=" +
        encodeURIComponent(mensaje),

        "_blank"

        );

    };

}



// ===============================
// CALENDARIO
// ===============================

// ===============================
// CALENDARIO PREMIUM
// ===============================

const btnCalendario = document.getElementById("btnCalendario");

if(btnCalendario){

    btnCalendario.onclick = ()=>{

        const inicio = new Date("2026-08-08T17:00:00");

        const fin = new Date(
            inicio.getTime() + 60 * 60000
        );

        function formato(fecha){

            return fecha
                .toISOString()
                .replace(/[-:]/g,"")
                .split(".")[0] + "Z";

        }

        const url =
        "https://calendar.google.com/calendar/render?action=TEMPLATE" +
        "&text=" + encodeURIComponent(CONFIG.agenda.titulo) +
        "&dates=" + formato(inicio) + "/" + formato(fin) +
        "&location=" + encodeURIComponent(CONFIG.agenda.direccionEvento) +
        "&details=" + encodeURIComponent(
            "Paciente: " + paciente.nombre +
            "\nTerapia: " + paciente.terapia
        );

        window.open(url,"_blank");

    };

}

}
