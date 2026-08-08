// ======================================================
// SELAH ALMA BONITA PREMIUM
// SCRIPT PRINCIPAL — VERSIÓN LIMPIA Y ESTABLE
// ======================================================

document.addEventListener("DOMContentLoaded", async function () {

// ==================================================
// COMPROBACIÓN Y CARGA DEL PACIENTE
// ==================================================

console.log("SELAH SCRIPT CARGADO");

if (typeof CONFIG === "undefined") {
    console.error("ERROR: No se encontró CONFIG.");
    alert("Error: no se encontró config.js");
    return;
}

console.log("CONFIG cargado correctamente.");

// Paciente de respaldo
let paciente = CONFIG.paciente || {};

// Leer el código personal desde el enlace
const parametros = new URLSearchParams(window.location.search);
const codigoPaciente = parametros.get("p");
const esPaginaGeneral = !codigoPaciente;
    
if (codigoPaciente) {

    try {

        const respuesta = await fetch(
            SUPABASE_URL + "rpc/obtener_paciente",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_KEY
                },
                body: JSON.stringify({
                    p_codigo: codigoPaciente
                })
            }
        );

        if (!respuesta.ok) {
            throw new Error(
                "Supabase respondió con estado " + respuesta.status
            );
        }

        const datos = await respuesta.json();

        if (Array.isArray(datos) && datos.length > 0) {

            paciente = datos[0];

            console.log(
                "Paciente cargado desde Supabase:",
                paciente.nombre
            );

        } else {

            alert(
                "No encontramos los datos correspondientes a este enlace."
            );

            return;
        }

    } catch (error) {

        console.error(
            "Error al cargar paciente desde Supabase:",
            error
        );

        alert(
            "No fue posible cargar la información de tu cita."
        );

        return;
    }
}

    // ==================================================
    // UTILIDADES
    // ==================================================

    function $(id) {
        return document.getElementById(id);
    }

    function abrir(url) {
        if (!url) {
            alert("Este enlace todavía no está configurado.");
            return;
        }

        window.open(url, "_blank");
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
    // SALUDO
    // ==================================================

    function saludoPaciente() {

        let saludo;

        if (paciente.categoria === "niño") {
            saludo = "¡Qué gusto recibirte";
        } else if (paciente.genero === "masculino") {
            saludo = "Bienvenido";
        } else {
            saludo = "Bienvenida";
        }

        if (paciente.tratamiento === "sr") {
            return saludo + " Sr. " + (paciente.nombre || "");
        }

        if (paciente.tratamiento === "sra") {
            return saludo + " Sra. " + (paciente.nombre || "");
        }

        return saludo + " " + (paciente.nombre || "");
    }

    const saludoElemento = document.querySelector(".saludo");
    const tituloBienvenida = document.getElementById("tituloBienvenida");
     
if (tituloBienvenida) {

    if (esPaginaGeneral) {
        tituloBienvenida.textContent = "🌸 Bienvenidos a Selah Alma Bonita";
    } else if (paciente.categoria === "niño") {
        tituloBienvenida.textContent = "🌸 ¡Qué gusto recibirte!";
    } else if (paciente.genero === "masculino") {
        tituloBienvenida.textContent = "🌸 Bienvenido";
    } else {
        tituloBienvenida.textContent = "🌸 Bienvenida";
    }
}
    
    if (saludoElemento) {

    if (esPaginaGeneral) {

        saludoElemento.innerHTML =
            "Un espacio creado para detenerte, respirar, sanar y florecer. 🌸";

    } else {

        let nombreMostrar = paciente.nombre || "";

        if (paciente.tratamiento === "sr") {
            nombreMostrar = "Sr. " + nombreMostrar;
        }

        if (paciente.tratamiento === "sra") {
            nombreMostrar = "Sra. " + nombreMostrar;
        }

        saludoElemento.innerHTML =
            "<strong>" + nombreMostrar + "</strong>" +
            "<br><br>" +
            "Nos llena de alegría recibirte en Selah Alma Bonita. 🌸";
    }
}

    if (esPaginaGeneral) {

    const citaGeneral = document.querySelector(".cita");

    if (citaGeneral) {
        citaGeneral.style.display = "none";
    }

    const btnConfirmar = document.getElementById("btnWhatsApp");
    const btnCalendarioGeneral = document.getElementById("btnCalendario");

    if (btnConfirmar) {
        btnConfirmar.style.display = "none";
    }

    if (btnCalendarioGeneral) {
        btnCalendarioGeneral.style.display = "none";
    }
}

// ==================================================
// DATOS DE LA CITA
// ==================================================

const fechaCita = $("fechaCita");
const horaCita = $("horaCita");
const duracionCita = $("duracionCita");
const citaContenedor = document.querySelector(".cita");

function convertirFechaCita(fechaTexto) {

    if (!fechaTexto) return null;

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

    const matchFecha = String(fechaTexto)
        .trim()
        .toLowerCase()
        .match(/(\d{1,2})\s+de\s+([a-záéíóúñ]+)/);

    if (!matchFecha) return null;

    const dia = Number(matchFecha[1]);
    const mes = meses[matchFecha[2]];

    if (mes === undefined) return null;

    const hoy = new Date();

    return new Date(
        hoy.getFullYear(),
        mes,
        dia,
        23,
        59,
        59
    );
}

const fechaRealCita =
    convertirFechaCita(paciente.fecha || "");

const hoyInicio = new Date();
hoyInicio.setHours(0, 0, 0, 0);

const citaVencida =
    fechaRealCita !== null &&
    fechaRealCita < hoyInicio;

if (
    citaVencida &&
    !esPaginaGeneral &&
    Number(paciente.sesiones || 0) < Number(paciente.objetivo || 0)
) {
    
    if (citaContenedor) {

        citaContenedor.innerHTML = `
            <h3>🌿 Continúa tu proceso</h3>

            <p>
                Recuerda agendar tu próxima cita para continuar
                avanzando en tu bienestar y sanación. 🌸
            </p>

            <button
                type="button"
                id="btnReagendarCita">
                🗓️ Agendar mi próxima cita
            </button>
        `;
    }

    const btnReagendarCita =
        document.getElementById("btnReagendarCita");

    if (btnReagendarCita) {

        btnReagendarCita.onclick = function () {

            const mensaje =
                "Hola Adriana 🌸 Me gustaría agendar mi próxima cita en Selah Alma Bonita.";

            abrir(
                "https://wa.me/" +
                (CONFIG.whatsapp?.telefono || "") +
                "?text=" +
                encodeURIComponent(mensaje)
            );
        };
    }

} else {

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
            "⏱️ Duración: " +
            (paciente.duracion || "");
    }
}

    // ==================================================
    // RECORDATORIO Y PREPARACIÓN PARA LA CITA
    // ==================================================

if (
    !esPaginaGeneral &&
    fechaRealCita &&
    !citaVencida
) {

    const hoyRecordatorio = new Date();
    hoyRecordatorio.setHours(0, 0, 0, 0);

    const fechaRecordatorio = new Date(fechaRealCita);
    fechaRecordatorio.setHours(0, 0, 0, 0);

    const diferenciaDias = Math.round(
        (fechaRecordatorio - hoyRecordatorio) /
        (1000 * 60 * 60 * 24)
    );

    let mensajeRecordatorio = "";

    if (diferenciaDias === 0) {
        mensajeRecordatorio =
            "🌸 ¡Hoy es tu cita! Te esperamos con mucho cariño.";
    } else if (diferenciaDias === 1) {
        mensajeRecordatorio =
            "✨ ¡Mañana es tu cita! Nos dará mucho gusto recibirte.";
    } else if (diferenciaDias === 2) {
        mensajeRecordatorio =
            "🌸 Faltan 2 días para tu cita.";
    } else if (diferenciaDias === 3) {
        mensajeRecordatorio =
            "🌸 Faltan 3 días para tu cita.";
    }

    if (mensajeRecordatorio) {

        const recordatorioBox = document.createElement("div");
        recordatorioBox.className = "tarjeta";

        recordatorioBox.innerHTML =
            "<h3>🗓️ Tu cita se acerca</h3>" +
            "<p>" + mensajeRecordatorio + "</p>";

        if (citaContenedor) {
            citaContenedor.insertAdjacentElement(
                "afterend",
                recordatorioBox
            );
        }
    }

    // ==============================================
    // PREPARACIÓN PARA LA SESIÓN
    // ==============================================

    const preparacionBox = document.createElement("div");
    preparacionBox.className = "tarjeta";

    let textoPreparacion =
        "<h3>🌿 Prepárate para tu sesión</h3>" +
        "<p>💧 Mantente bien hidratado/a.</p>" +
        "<p>👗 Usa ropa cómoda.</p>" +
        "<p>🍃 Procura comer ligero antes de tu cita.</p>";

    // Pantuflas a partir de la segunda sesión
    if ((Number(paciente.sesiones) || 0) >= 1) {

        textoPreparacion +=
            "<p>🩷 <strong>Recuerda traer tus pantuflas Selah.</strong></p>";
    }

    textoPreparacion +=
        "<p>✨ Regálate unos minutos para llegar con calma.</p>";

    preparacionBox.innerHTML = textoPreparacion;

    if (citaContenedor) {
        citaContenedor.insertAdjacentElement(
            "afterend",
            preparacionBox
        );
    }
}
    
    // ==================================================
    // PROGRESO INTELIGENTE
    // ==================================================

const barraProgreso = $("barraProgreso");
const textoProgreso = $("textoProgreso");

if (barraProgreso && textoProgreso && !esPaginaGeneral) {

    const sesiones = Number(paciente.sesiones) || 0;
    const objetivo = Number(paciente.objetivo) || 1;

    const porcentaje = Math.min(
        100,
        Math.max(0, (sesiones / objetivo) * 100)
    );

    barraProgreso.style.width = porcentaje + "%";

    let mensajeProgreso = "";

    if (sesiones === 0) {

        mensajeProgreso =
            "🌱 Tu proceso comienza aquí.";

    } else if (sesiones >= objetivo) {

        mensajeProgreso =
            "✨ ¡Has completado tu proceso inicial! Gracias por permitirnos acompañarte en este camino. 🌸";

    } else if (porcentaje >= 80) {

        mensajeProgreso =
            "🌷 Estás muy cerca de completar tu proceso.";

    } else if (porcentaje >= 50) {

        mensajeProgreso =
            "🌿 Ya recorriste más de la mitad de tu camino.";

    } else {

        mensajeProgreso =
            "🌸 Cada sesión es un paso más en tu proceso.";
    }

    textoProgreso.innerHTML =
        "<strong>" +
        sesiones +
        " de " +
        objetivo +
        " sesiones completadas</strong>" +
        "<br><br>" +
        mensajeProgreso;
}
    // ==================================================
    // MENSAJE DEL DÍA
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
            "✨ " + mensajes[dia % mensajes.length];
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

        const partes = String(
            paciente.cumpleanos
        )
            .trim()
            .split(/[-/]/)
            .map(Number);

        if (partes.length >= 2) {

            const dia = partes[0];
            const mes = partes[1];

            const hoy = new Date();

            const anioActual = hoy.getFullYear();

const esBisiesto =
    (anioActual % 4 === 0 && anioActual % 100 !== 0) ||
    (anioActual % 400 === 0);

let esCumple =
    hoy.getMonth() + 1 === mes &&
    hoy.getDate() === dia;

// Caso especial: personas nacidas el 29 de febrero.
// En años no bisiestos se felicitan el 28 de febrero.
if (
    dia === 29 &&
    mes === 2 &&
    !esBisiesto
) {
    esCumple =
        hoy.getMonth() + 1 === 2 &&
        hoy.getDate() === 28;
}

            if (esCumple) {

                const primerNombre =
                    (paciente.nombre || "")
                        .trim()
                        .split(/\s+/)[0];

                cumpleBox.innerHTML =
                    '<div class="tarjetaPremium">' +
                    "<h2>🎂 ¡Feliz cumpleaños, " +
                    primerNombre +
                    "! 🌸</h2>" +
                    "<p>" +
                    (cumpleConfig.mensaje || "") +
                    "</p>" +
                    "</div>";

                mostrar("cumpleBox");
            }
        }
    }
}

    // ==================================================
    // PROMOCIÓN
    // ==================================================

    const promoBox = $("promoBox");
    const promo = CONFIG.promocion || {};

    if (promoBox) {

        ocultar("promoBox");

        if (promo.activa === true) {

            promoBox.innerHTML =
                '<div class="tarjetaPremium">' +
                "<h2>✨ " +
                (promo.titulo || "Promoción especial") +
                "</h2>" +
                "<p>" +
                (promo.descripcion || "") +
                "</p>" +
                "</div>";

            mostrar("promoBox");
        }
    }

    // ==================================================
    // WHATSAPP — CONFIRMAR ASISTENCIA
    // ==================================================

    const btnWhatsApp = $("btnWhatsApp");

    if (btnWhatsApp) {

        btnWhatsApp.onclick = function () {

            const texto =
                "Hola Adriana 🌸\n\n" +
                "Queda confirmada mi asistencia a la siguiente cita en Selah Alma Bonita.\n\n" +
                "👤 Paciente: " +
                (paciente.nombre || "") +
                "\n\n" +
                "📅 Fecha: " +
                (paciente.fecha || "") +
                "\n\n" +
                "🕙 Hora: " +
                (paciente.hora || "") +
                "\n\n" +
                "🌿 Terapia: " +
                (paciente.terapia || "") +
                "\n\n" +
                "Gracias por acompañarme en este proceso de bienestar y sanación. 🌸\n\n" +
                "Nos vemos muy pronto. ✨";

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

        btnMapa.onclick = function () {
            abrir(CONFIG.maps?.url);
        };
    }

    // ==================================================
    // MÚSICA
    // ==================================================

    const btnMusica = $("btnMusica");
    const musicaSelah = $("musicaSelah");

    if (btnMusica && musicaSelah) {

        btnMusica.onclick = async function () {

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
                    "No se pudo reproducir la música:",
                    error
                );

                alert(
                    "La música no pudo reproducirse. Revisa que musica-selah.mp3 esté en el proyecto."
                );
            }
        };
    }

    // ==================================================
    // PAGOS
    // ==================================================

    const btnPago = $("btnPago");
    const pagoBox = $("pagoBox");

    if (btnPago && pagoBox) {

        btnPago.onclick = function () {

            const pago = CONFIG.pago || {};

            pagoBox.innerHTML =
                '<div class="pagoTarjeta">' +

                "<h2>🌸 Selah Alma Bonita</h2>" +

                "<h3>" +
                (pago.banco || "") +
                "</h3>" +

                '<div class="datoPago">' +
                "<span>Titular</span>" +
                "<b>" +
                (pago.titular || "") +
                "</b>" +
                "</div>" +

                '<div class="datoPago">' +
                "<span>🏦 Cuenta</span>" +
                "<b>" +
                (pago.cuenta || "") +
                "</b>" +
                '<button id="copiarCuenta" type="button">' +
                "📋 Copiar cuenta" +
                "</button>" +
                "</div>" +

                '<div class="datoPago">' +
                "<span>🔐 CLABE</span>" +
                "<b>" +
                (pago.clabe || "") +
                "</b>" +
                '<button id="copiarClabe" type="button">' +
                "📋 Copiar CLABE" +
                "</button>" +
                "</div>" +

                '<button id="enviarComprobante" type="button">' +
                "📲 Compartir comprobante por WhatsApp" +
                "</button>" +

                '<button id="cerrarPago" type="button">' +
                "✕ Cerrar" +
                "</button>" +

                "</div>";

            mostrar("pagoBox");

            const copiarCuenta = $("copiarCuenta");
            const copiarClabe = $("copiarClabe");
            const cerrarPago = $("cerrarPago");
            const enviarComprobante = $("enviarComprobante");

            if (copiarCuenta) {
                copiarCuenta.onclick = function () {
                    copiarPago(pago.cuenta || "");
                };
            }

            if (copiarClabe) {
                copiarClabe.onclick = function () {
                    copiarPago(pago.clabe || "");
                };
            }

            if (cerrarPago) {
                cerrarPago.onclick = function () {
                    ocultar("pagoBox");
                };
            }

            if (enviarComprobante) {

                enviarComprobante.onclick = function () {

                    const mensaje =
                        "Hola Adriana 🌸\n\n" +
                        "Te comparto mi comprobante de pago correspondiente a mi cita en Selah Alma Bonita.\n\n" +
                        "👤 Paciente: " +
                        (paciente.nombre || "") +
                        "\n\n" +
                        "📅 Fecha: " +
                        (paciente.fecha || "") +
                        "\n\n" +
                        "🕙 Hora: " +
                        (paciente.hora || "") +
                        "\n\n" +
                        "🌿 Terapia: " +
                        (paciente.terapia || "") +
                        "\n\n" +
                        "Gracias por acompañarme en este proceso de bienestar y sanación. 🌸✨";

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

    window.copiarPago = async function (texto) {

        try {

            await navigator.clipboard.writeText(texto);

            const aviso = document.createElement("div");

            aviso.className = "avisoCopia";
            aviso.textContent = "✨ Copiado correctamente";

            document.body.appendChild(aviso);

            setTimeout(function () {
                aviso.remove();
            }, 2000);

        } catch (error) {

            alert(
                "No fue posible copiar automáticamente."
            );
        }
    };

    // ==================================================
    // RESEÑA
    // ==================================================

    const btnResena = $("btnResena");

    if (btnResena) {

        btnResena.onclick = function () {

            if (
                CONFIG.experiencia?.compartirGoogle &&
                CONFIG.google?.url
            ) {

                abrir(CONFIG.google.url);

            } else if (
                CONFIG.experiencia?.compartirInstagram &&
                CONFIG.instagram?.url
            ) {

                abrir(CONFIG.instagram.url);

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

        btnInstagram.onclick = function () {

            if (CONFIG.instagram?.url) {

                abrir(CONFIG.instagram.url);

            } else {

                alert("Instagram próximamente.");
            }
        };
    }

    // ==================================================
    // LLAMAR
    // ==================================================

    const btnLlamar = $("btnLlamar");

    if (btnLlamar) {

        btnLlamar.onclick = function () {

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

    const btnSolicitar = $("btnSolicitar");

    if (btnSolicitar) {

        btnSolicitar.onclick = function () {

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
    // CALENDARIO
    // ==================================================

    const btnCalendario = $("btnCalendario");

    if (btnCalendario) {

        btnCalendario.onclick = function () {

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

            if (!matchFecha || !matchHora) {

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

            if (esPM && hora < 12) {
                hora += 12;
            }

            if (!esPM && hora === 12) {
                hora = 0;
            }

            const ahora = new Date();

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

            if (inicio < ahora) {

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
// HISTORIA SELAH PREMIUM
// ==================================================

const btnHistoria = $("btnHistoria");
const historiaBox = $("historiaBox");

if (btnHistoria && historiaBox) {

    btnHistoria.onclick = () => {

        historiaBox.innerHTML = `
            <div class="historiaContenedor">

                <h2>📸 Mi momento Selah</h2>

                <p>
                    Comparte un recuerdo de tu experiencia
                    en Selah Alma Bonita. 🌸
                </p>

                <textarea
                    id="textoHistoria"
                    class="historiaTexto"
                    placeholder="Escribe aquí cómo fue tu experiencia..."
                ></textarea>

                <label
                    for="fotoHistoria"
                    class="botonFoto">
                    📷 Elegir una foto
                </label>

                <input
                    id="fotoHistoria"
                    type="file"
                    accept="image/*"
                    style="display:none;"
                >

                <div
                    id="vistaHistoria"
                    class="historiaTarjeta">

                    <p>
                        Mi momento de bienestar
                        en Selah Alma Bonita. 🌸
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

        const textoHistoria = $("textoHistoria");
        const fotoHistoria = $("fotoHistoria");
        const vistaHistoria = $("vistaHistoria");
        const compartirHistoria = $("compartirHistoria");
        const cerrarHistoria = $("cerrarHistoria");

        // ==========================================
        // ACTUALIZAR HISTORIA
        // ==========================================

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
                    `
                    <img
                        src="${imagen}"
                        alt="Mi experiencia en Selah Alma Bonita"
                        style="
                            width:100%;
                            border-radius:20px;
                            margin-bottom:15px;
                            display:block;
                        "
                    >
                    `
                    :
                    ""
                }

                <p>
                    "${texto
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                    }"
                </p>

                <div style="
                    margin-top:15px;
                    font-weight:600;
                ">
                    ✨ Selah Alma Bonita
                </div>

                <div style="
                    margin-top:5px;
                    font-size:14px;
                ">
                    Detente, respira, sana y florece
                </div>

                <div style="
                    margin-top:10px;
                    font-size:13px;
                ">
                    #SelahAlmaBonita
                </div>
            `;
        }

        // ==========================================
        // TEXTO
        // ==========================================

        if (textoHistoria) {

            textoHistoria.addEventListener(
                "input",
                actualizarHistoria
            );
        }

        // ==========================================
        // FOTO
        // ==========================================

        if (fotoHistoria) {

            fotoHistoria.addEventListener(
                "change",
                () => {

                    const archivo =
                        fotoHistoria.files?.[0];

                    if (!archivo) return;

                    if (!archivo.type.startsWith("image/")) {

                        alert(
                            "Por favor selecciona una imagen."
                        );

                        return;
                    }

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
                }
            );
        }

        // ==========================================
        // CERRAR
        // ==========================================

        if (cerrarHistoria) {

            cerrarHistoria.onclick = () => {

                ocultar("historiaBox");
            };
        }

        // ==========================================
        // COMPARTIR
        // ==========================================

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

                        compartirHistoria.disabled = true;

                        compartirHistoria.textContent =
                            "✨ Preparando mi historia...";

                        const canvas =
                            await html2canvas(
                                vistaHistoria,
                                {
                                    backgroundColor:
                                        "#fffafc",

                                    scale:
                                        Math.min(
                                            window.devicePixelRatio || 1,
                                            2
                                        ),

                                    useCORS: true
                                }
                            );

                        canvas.toBlob(
                            async (blob) => {

                                if (!blob) {

                                    compartirHistoria.disabled = false;

                                    compartirHistoria.textContent =
                                        "📲 Compartir mi historia";

                                    alert(
                                        "No fue posible crear la imagen."
                                    );

                                    return;
                                }

                                const archivo =
                                    new File(
                                        [blob],
                                        "Mi-Momento-Selah.png",
                                        {
                                            type:
                                                "image/png"
                                        }
                                    );

                                // ==================================
                                // COMPARTIR NATIVAMENTE
                                // En iPhone/iPad abre el menú de
                                // compartir y permite elegir
                                // Instagram, WhatsApp, etc.
                                // ==================================

                                if (
                                    navigator.share &&
                                    navigator.canShare &&
                                    navigator.canShare({
                                        files: [archivo]
                                    })
                                ) {

                                    try {

                                        await navigator.share({

                                            title:
                                                "Mi momento Selah",

                                            text:
                                                "Mi experiencia en Selah Alma Bonita 🌸✨ #SelahAlmaBonita",

                                            files:
                                                [archivo]
                                        });

                                    } catch (error) {

                                        // El usuario simplemente
                                        // cerró el menú de compartir.
                                        console.log(
                                            "Compartir cancelado:",
                                            error
                                        );
                                    }

                                } else {

                                    // ==================================
                                    // RESPALDO PARA DISPOSITIVOS
                                    // SIN COMPARTIR NATIVO
                                    // ==================================

                                    const url =
                                        URL.createObjectURL(
                                            blob
                                        );

                                    const ventana =
                                        window.open(
                                            url,
                                            "_blank"
                                        );

                                    if (!ventana) {

                                        alert(
                                            "Tu dispositivo no permite abrir la imagen para compartirla."
                                        );

                                    } else {

                                        alert(
                                            "La imagen está lista. Puedes mantenerla presionada para guardarla y compartirla en Instagram o WhatsApp."
                                        );
                                    }

                                    setTimeout(
                                        () => {
                                            URL.revokeObjectURL(
                                                url
                                            );
                                        },
                                        60000
                                    );
                                }

                                compartirHistoria.disabled =
                                    false;

                                compartirHistoria.textContent =
                                    "📲 Compartir mi historia";

                            },
                            "image/png"
                        );

                    } catch (error) {

                        console.error(
                            "Error creando historia:",
                            error
                        );

                        compartirHistoria.disabled =
                            false;

                        compartirHistoria.textContent =
                            "📲 Compartir mi historia";

                        alert(
                            "No fue posible crear la historia. Intenta nuevamente."
                        );
                    }
                };
        }

        // Mostrar inicialmente
        actualizarHistoria();
    };
}

    // ==================================================
    // FINAL
    // ==================================================

    console.log(
        "Selah Alma Bonita Premium cargada correctamente 🌸"
    );

});
