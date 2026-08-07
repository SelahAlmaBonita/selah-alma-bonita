// ====================================================== // SELAH ALMA BONITA PREMIUM // SCRIPT PRINCIPAL — VERSIÓN LIMPIA Y CONSOLIDADA // ======================================================

document.addEventListener("DOMContentLoaded", () => {

   alert("SELAH: el script sí está funcionando");
   
// ==================================================
// VERIFICAR CONFIGURACIÓN
// ==================================================

if (typeof CONFIG === "undefined") {
   console.error("No se encontró config.js");
   return;
}

const paciente = CONFIG.paciente || {};

// ==================================================
// UTILIDADES
// ==================================================

const $ = (id) => document.getElementById(id);

function abrir(url) {
   if (url) {
       window.open(url, "_blank");
   }
}

function mostrar(id) {
   const elemento = $(id);
   if (elemento) {
       elemento.classList.remove("oculta");
   }
}

function ocultar(id) {
   const elemento = $(id);
   if (elemento) {
       elemento.classList.add("oculta");
   }
}

// ==================================================
// SALUDO PERSONALIZADO
// ==================================================

function saludoPaciente() {

   let saludo = "";

   if (paciente.categoria === "niño") {

       saludo = "¡Qué gusto recibirte";

   } else {

       saludo = paciente.genero === "masculino"
           ? "Bienvenido"
           : "Bienvenida";
   }

   if (paciente.tratamiento === "sr") {
       return `${saludo} Sr. ${paciente.nombre}`;
   }

   if (paciente.tratamiento === "sra") {
       return `${saludo} Sra. ${paciente.nombre}`;
   }

   return `${saludo} ${paciente.nombre || ""}`;
}

const saludo = document.querySelector(".saludo");

if (saludo) {

   saludo.innerHTML =
       saludoPaciente() +
       "<br><br>Nos llena de alegría recibirte en Selah Alma Bonita. 🌸";
}

// ==================================================
// DATOS DE LA CITA
// ==================================================

const fechaCita = $("fechaCita");
const horaCita = $("horaCita");
const duracionCita = $("duracionCita");

if (fechaCita) {
   fechaCita.textContent =
       "📅 " + (paciente.fecha || "");
}

if (horaCita) {
   horaCita.textContent =
       "🕙 " + (paciente.hora || "");
}

if (duracionCita) {
   duracionCita.textContent =
       "⏱️ Duración: " + (paciente.duracion || "");
}

// ==================================================
// PROGRESO DE SESIONES
// ==================================================

const barraProgreso = $("barraProgreso");
const textoProgreso = $("textoProgreso");

if (barraProgreso && textoProgreso) {

   const sesiones = Number(paciente.sesiones) || 0;
   const objetivo = Number(paciente.objetivo) || 1;

   const porcentaje =
       Math.min(
           100,
           Math.max(0, (sesiones / objetivo) * 100)
       );

   barraProgreso.style.width = porcentaje + "%";

   textoProgreso.textContent =
       `${sesiones} de ${objetivo} sesiones completadas 🌸`;
}

// ==================================================
// MENSAJES SELAH
// ==================================================

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

if (mensajeDiv) {

   const dia = new Date().getDate();

   mensajeDiv.textContent =
       "✨ " +
       mensajes[dia % mensajes.length];
}

// ==================================================
// CUMPLEAÑOS
// ==================================================

const cumpleBox = $("cumpleBox");
const cumpleConfig = CONFIG.cumpleanos || {};

if (cumpleBox) {

   ocultar("cumpleBox");

   if (
       cumpleConfig.activo === true &&
       paciente.cumpleanos
   ) {

       const hoy = new Date();

       const partes = String(
           paciente.cumpleanos
       )
       .trim()
       .split(/[-/]/)
       .map(Number);

       if (partes.length >= 2) {

           const mes = partes[0];
           const dia = partes[1];

           const esCumple =
               hoy.getMonth() + 1 === mes &&
               hoy.getDate() === dia;

           if (esCumple) {

               cumpleBox.innerHTML = `

                   <div class="tarjetaPremium">

                       <h2>
                           🎂 ¡Feliz cumpleaños,
                           ${paciente.nombre}! 🌸
                       </h2>

                       <p>
                           ${cumpleConfig.mensaje || ""}
                       </p>

                   </div>

               `;

               mostrar("cumpleBox");
           }
       }
   }
}

// ==================================================
// PROMOCIONES
// ==================================================

const promoBox = $("promoBox");
const promo = CONFIG.promocion || {};

if (promoBox) {

   ocultar("promoBox");

   if (promo.activa === true) {

       promoBox.innerHTML = `

           <div class="tarjetaPremium">

               <h2>
                   ✨ ${promo.titulo || "Promoción especial"}
               </h2>

               <p>
                   ${promo.descripcion || ""}
               </p>

           </div>

       `;

       mostrar("promoBox");
   }
}

// ==================================================
// WHATSAPP — CONFIRMAR ASISTENCIA
// ==================================================

const btnWhatsApp = $("btnWhatsApp");

if (btnWhatsApp) {

   btnWhatsApp.onclick = () => {

       const texto = `Hola Adriana 🌸
Queda confirmada mi asistencia a la siguiente cita en Selah Alma Bonita.

👤 Paciente: ${paciente.nombre || ““}

📅 Fecha: ${paciente.fecha || ““}

🕙 Hora: ${paciente.hora || ““}

🌿 Terapia: ${paciente.terapia || ““}

Gracias por acompañarme en este proceso de bienestar y sanación. 🌸

Nos vemos muy pronto. ✨`;

       abrir(
           "https://wa.me/" +
           (CONFIG.whatsapp?.telefono || "") +
           "?text=" +
           encodeURIComponent(texto)
       );
   };
}

// ==================================================
// GOOGLE MAPS
// ==================================================

const btnMapa = $("btnMapa");

if (btnMapa) {

   btnMapa.onclick = () => {

       abrir(
           CONFIG.maps?.url
       );
   };
}

// ==================================================
// MÚSICA
// ==================================================

const btnMusica = $("btnMusica");
const musicaSelah = $("musicaSelah");

if (btnMusica && musicaSelah) {

   btnMusica.onclick = async () => {

       try {

           if (musicaSelah.paused) {

               await musicaSelah.play();

               btnMusica.textContent = "⏸️";

           } else {

               musicaSelah.pause();

               btnMusica.textContent = "🎵";
           }

       } catch (error) {

           console.error(
               "No fue posible reproducir la música:",
               error
           );
       }
   };
}

// ==================================================
// PAGOS PREMIUM
// ==================================================

const btnPago = $("btnPago");
const pagoBox = $("pagoBox");

if (btnPago && pagoBox) {

   btnPago.onclick = () => {

       const pago = CONFIG.pago || {};

       pagoBox.innerHTML = `

           <div class="pagoTarjeta">

               <h2>
                   🌸 Selah Alma Bonita
               </h2>

               <h3>
                   ${pago.banco || ""}
               </h3>

               <div class="datoPago">

                   <span>
                       Titular
                   </span>

                   <b>
                       ${pago.titular || ""}
                   </b>

               </div>

               <div class="datoPago">

                   <span>
                       🏦 Cuenta
                   </span>

                   <b>
                       ${pago.cuenta || ""}
                   </b>

                   <button
                       type="button"
                       id="copiarCuenta">
                       📋 Copiar cuenta
                   </button>

               </div>

               <div class="datoPago">

                   <span>
                       🔐 CLABE
                   </span>

                   <b>
                       ${pago.clabe || ""}
                   </b>

                   <button
                       type="button"
                       id="copiarClabe">
                       📋 Copiar CLABE
                   </button>

               </div>

               <button
                   id="enviarComprobante"
                   type="button">

                   📲 Compartir comprobante
                   por WhatsApp

               </button>

               <button
                   id="cerrarPago"
                   type="button">

                   ✕ Cerrar

               </button>

           </div>
       `;

       mostrar("pagoBox");

       const copiarCuenta = $("copiarCuenta");
       const copiarClabe = $("copiarClabe");
       const cerrarPago = $("cerrarPago");
       const enviarComprobante = $("enviarComprobante");

       if (copiarCuenta) {

           copiarCuenta.onclick = () => {

               copiarPago(
                   pago.cuenta || ""
               );
           };
       }

       if (copiarClabe) {

           copiarClabe.onclick = () => {

               copiarPago(
                   pago.clabe || ""
               );
           };
       }

       if (cerrarPago) {

           cerrarPago.onclick = () => {

               ocultar("pagoBox");
           };
       }

       if (enviarComprobante) {

           enviarComprobante.onclick = () => {

               const mensaje = `Hola Adriana 🌸
Te comparto mi comprobante de pago correspondiente a mi cita en Selah Alma Bonita.

👤 Paciente: ${paciente.nombre || ““}

📅 Fecha: ${paciente.fecha || ““}

🕙 Hora: ${paciente.hora || ““}

🌿 Terapia: ${paciente.terapia || ““}

Gracias por acompañarme en este proceso de bienestar y sanación. 🌸✨`;

               abrir(
                   "https://wa.me/" +
                   (CONFIG.whatsapp?.telefono || "") +
                   "?text=" +
                   encodeURIComponent(mensaje)
               );
           };
       }
   };
}

// ==================================================
// COPIAR DATOS BANCARIOS
// ==================================================

window.copiarPago = async function(texto) {

   try {

       await navigator.clipboard.writeText(
           texto
       );

       const aviso =
           document.createElement("div");

       aviso.className =
           "avisoCopia";

       aviso.textContent =
           "✨ Copiado correctamente";

       document.body.appendChild(aviso);

       setTimeout(
           () => aviso.remove(),
           2000
       );

   } catch (error) {

       alert(
           "No fue posible copiar automáticamente."
       );
   }
};

// ==================================================
// RESEÑA GOOGLE
// ==================================================

const btnResena = $("btnResena");

if (btnResena) {

   btnResena.onclick = () => {

       if (
           CONFIG.experiencia?.compartirGoogle &&
           CONFIG.google?.url
       ) {

           abrir(
               CONFIG.google.url
           );

       } else if (
           CONFIG.experiencia?.compartirInstagram &&
           CONFIG.instagram?.url
       ) {

           abrir(
               CONFIG.instagram.url
           );

       } else {

           alert(
               "Próximamente podrás compartir tu experiencia."
           );
       }
   };
}

// ==================================================
// INSTAGRAM
// ==================================================

const btnInstagram = $("btnInstagram");

if (btnInstagram) {

   btnInstagram.onclick = () => {

       if (CONFIG.instagram?.url) {

           abrir(
               CONFIG.instagram.url
           );

       } else {

           alert(
               "Instagram próximamente."
           );
       }
   };
}

// ==================================================
// HISTORIA SELAH PREMIUM
// ==================================================

const btnHistoria = $("btnHistoria");
const historiaBox = $("historiaBox");

if (
   btnHistoria &&
   historiaBox
) {

   btnHistoria.onclick = () => {

       historiaBox.innerHTML = `

           <div class="historiaContenedor">

               <h2>
                   📸 Mi momento Selah
               </h2>

               <textarea
                   id="textoHistoria"
                   class="historiaTexto"
                   placeholder="Escribe aquí cómo fue tu experiencia..."
               ></textarea>

               <input
                   id="fotoHistoria"
                   type="file"
                   accept="image/*"
                   style="width:100%;margin-top:15px;"
               >

               <div
                   id="vistaHistoria"
                   class="historiaTarjeta">

                   <p>
                       Tu experiencia aparecerá aquí. 🌸
                   </p>

                   <strong>
                       ✨ Selah Alma Bonita
                   </strong>

                   <br>

                   Detente, respira, sana y florece

               </div>

               <button
                   id="compartirHistoria"
                   type="button">

                   📲 Compartir mi historia

               </button>

               <button
                   id="cerrarHistoria"
                   type="button">

                   ✕ Cerrar

               </button>

           </div>
       `;

       mostrar("historiaBox");

       const textoHistoria =
           $("textoHistoria");

       const fotoHistoria =
           $("fotoHistoria");

       const vistaHistoria =
           $("vistaHistoria");

       function actualizarHistoria() {

           const texto =
               textoHistoria?.value?.trim() ||
               "Mi momento de bienestar en Selah Alma Bonita. 🌸";

           const imagen =
               vistaHistoria.dataset.imagen || "";

           vistaHistoria.innerHTML = `

               ${
                   imagen
                   ?
                   `<img
                       src="${imagen}"
                       alt="Experiencia Selah"
                       style="
                           width:100%;
                           border-radius:20px;
                           margin-bottom:15px;
                       "
                   >`
                   :
                   ""
               }

               <p>
                   "${texto
                       .replace(/</g, "&lt;")
                       .replace(/>/g, "&gt;")
                   }"
               </p>

               <br>

               ✨ Selah Alma Bonita

               <br>

               Detente, respira, sana y florece

               <br><br>

               #SelahAlmaBonita
           `;
       }

       if (textoHistoria) {

           textoHistoria.oninput =
               actualizarHistoria;
       }

       if (fotoHistoria) {

           fotoHistoria.onchange = () => {

               const archivo =
                   fotoHistoria.files?.[0];

               if (!archivo) return;

               const lector =
                   new FileReader();

               lector.onload = (evento) => {

                   vistaHistoria.dataset.imagen =
                       evento.target.result;

                   actualizarHistoria();
               };

               lector.readAsDataURL(
                   archivo
               );
           };
       }

       const cerrarHistoria =
           $("cerrarHistoria");

       if (cerrarHistoria) {

           cerrarHistoria.onclick =
               () => ocultar("historiaBox");
       }

       const compartirHistoria =
           $("compartirHistoria");

       if (compartirHistoria) {

           compartirHistoria.onclick =
               async () => {

                   if (
                       typeof html2canvas ===
                       "undefined"
                   ) {

                       alert(
                           "No se pudo cargar el creador de historias."
                       );

                       return;
                   }

                   try {

                       const canvas =
                           await html2canvas(
                               vistaHistoria
                           );

                       canvas.toBlob(
                           async (blob) => {

                               if (!blob) return;

                               const archivo =
                                   new File(
                                       [blob],
                                       "SelahAlmaBonita.png",
                                       {
                                           type:
                                               "image/png"
                                       }
                                   );

                               if (
                                   navigator.canShare &&
                                   navigator.canShare({
                                       files: [archivo]
                                   })
                               ) {

                                   await navigator.share({

                                       title:
                                           "Selah Alma Bonita",

                                       text:
                                           "Mi experiencia en Selah Alma Bonita 🌸 #SelahAlmaBonita",

                                       files:
                                           [archivo]
                                   });

                               } else {

                                   alert(
                                       "Tu dispositivo no permite compartir imágenes automáticamente."
                                   );
                               }

                           },
                           "image/png"
                       );

                   } catch (error) {

                       console.error(
                           error
                       );

                       alert(
                           "No fue posible crear la historia."
                       );
                   }
               };
       }
   };
}

// ==================================================
// LLAMAR
// ==================================================

const btnLlamar = $("btnLlamar");

if (btnLlamar) {

   btnLlamar.onclick = () => {

       const numero =
           CONFIG.telefono?.numero ||
           CONFIG.consultorio?.telefono ||
           "";

       if (numero) {

           window.location.href =
               numero.startsWith("tel:")
               ? numero
               : "tel:" + numero;
       }
   };
}

// ==================================================
// SOLICITAR CITA
// ==================================================

const btnSolicitar =
   $("btnSolicitar");

if (btnSolicitar) {

   btnSolicitar.onclick = () => {

       const mensaje =
           "Hola Adriana 🌸 Me gustaría agendar una cita en Selah Alma Bonita.";

       abrir(
           "https://wa.me/" +
           (CONFIG.whatsapp?.telefono || "") +
           "?text=" +
           encodeURIComponent(mensaje)
       );
   };
}

// ==================================================
// CALENDARIO GOOGLE
// ==================================================

const btnCalendario =
   $("btnCalendario");

if (btnCalendario) {

   btnCalendario.onclick = () => {

       const titulo =
           CONFIG.agenda?.titulo ||
           "Cita en Selah Alma Bonita";

       const fechaTexto =
           paciente.fecha || "";

       const horaTexto =
           paciente.hora || "";

       const duracionTexto =
           paciente.duracion ||
           "60 minutos";

       const meses = {

           enero: 0,
           febrero: 1,
           marzo: 2,
           abril: 3,
           mayo: 4,
           junio: 5,
           julio: 6,
           agosto: 7,
           septiembre: 8,
           octubre: 9,
           noviembre: 10,
           diciembre: 11
       };

       const matchFecha =
           fechaTexto
               .toLowerCase()
               .match(
                   /(\d{1,2})\s+de\s+([a-záéíóú]+)/
               );

       const matchHora =
           horaTexto
               .toLowerCase()
               .match(
                   /(\d{1,2})(?::(\d{2}))?\s*(a\.?\s*m\.?|p\.?\s*m\.?)/
               );

       if (
           !matchFecha ||
           !matchHora
       ) {

           alert(
               "No se pudo interpretar la fecha y hora de la cita."
           );

           return;
       }

       const dia =
           Number(matchFecha[1]);

       const mes =
           meses[matchFecha[2]];

       let hora =
           Number(matchHora[1]);

       const minutos =
           Number(matchHora[2] || 0);

       const indicador =
           matchHora[3]
               .replace(/\s/g, "")
               .replace(/\./g, "");

       const esPM =
           indicador === "pm";

       if (
           esPM &&
           hora < 12
       ) {
           hora += 12;
       }

       if (
           !esPM &&
           hora === 12
       ) {
           hora = 0;
       }

       const ahora =
           new Date();

       let anio =
           ahora.getFullYear();

       let inicio =
           new Date(
               anio,
               mes,
               dia,
               hora,
               minutos
           );

       if (
           inicio < ahora
       ) {

           inicio =
               new Date(
                   anio + 1,
                   mes,
                   dia,
                   hora,
                   minutos
               );
       }

       const duracionMatch =
           duracionTexto.match(/\d+/);

       const duracionMin =
           Number(
               duracionMatch?.[0] || 60
           );

       const fin =
           new Date(
               inicio.getTime() +
               duracionMin * 60000
           );

       function formatoCalendario(fecha) {

           return fecha
               .toISOString()
               .replace(/[-:]/g, "")
               .replace(/\.\d{3}/, "");
       }

       const url =
           "https://calendar.google.com/calendar/render?action=TEMPLATE" +

           "&text=" +
           encodeURIComponent(titulo) +

           "&dates=" +
           formatoCalendario(inicio) +
           "/" +
           formatoCalendario(fin) +

           "&location=" +
           encodeURIComponent(
               CONFIG.agenda?.direccionEvento ||
               CONFIG.consultorio?.direccion ||
               ""
           ) +

           "&details=" +
           encodeURIComponent(
               "Paciente: " +
               (paciente.nombre || "") +
               "\nTerapia: " +
               (paciente.terapia || "")
           );

       abrir(url);
   };
}

// ==================================================
// FINAL
// ==================================================

console.log(
   "Selah Alma Bonita Premium cargada correctamente 🌸"
);
});

console.log("SELAH SCRIPT CARGADO");
