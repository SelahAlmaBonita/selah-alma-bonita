const mensajes = [
  "Hoy elegiste regalarte un momento para ti. Gracias por permitirnos acompañarte.",
  "Cada pequeño paso cuenta. Gracias por confiar en Selah Alma Bonita.",
  "Tu bienestar comienza con un momento de amor hacia ti.",
  "Detente, respira, sana y florece.",
  "Que hoy encuentres paz, equilibrio y armonía en tu camino.",
  "Tu alma merece descanso, amor y cuidado.",
  "Cada día es una nueva oportunidad para florecer.",
  "Escucha tu corazón, él también necesita ser atendido.",
  "Regálate la misma paciencia y amor que das a los demás.",
  "La calma también es una forma de sanar.",
  "Hoy puede ser el inicio de una versión más bonita de ti.",
  "Respira profundo. Estás creando un espacio de bienestar para tu alma.",
  "Gracias por permitirnos acompañarte en tu camino de equilibrio.",
  "Tu cuerpo habla, tu alma siente. Escucha ambos con amor.",
  "La sanación comienza cuando eliges cuidarte.",
  "Un momento para ti puede transformar tu día.",
  "Que la paz habite en tu corazón y la luz guíe tu camino.",
  "Florecer no significa ir rápido, significa crecer con amor.",
  "Hoy agradece todo lo que tu cuerpo hace por ti.",
  "Tu bienestar es una inversión en la persona más importante: tú.",
  "Permítete recibir amor, calma y armonía.",
  "Cada respiración es un regalo de vida.",
  "Tu proceso es único y merece respeto.",
  "La tranquilidad que buscas también puede nacer dentro de ti.",
  "Gracias por elegir un espacio de cuidado y amor.",
  "Que cada sesión sea un encuentro contigo misma.",
  "Tu energía merece ser cuidada y renovada.",
  "Hoy recuerda: eres valiosa, eres luz, eres un alma bonita.",
  "Que Dios llene tu camino de paz, amor y sabiduría.",
  "Selah: detente un momento, respira y permite que tu alma florezca."
];

const dia = new Date().getDate();

const mensaje = mensajes[dia % mensajes.length];

document.getElementById("mensajeDia").innerHTML = mensaje;
