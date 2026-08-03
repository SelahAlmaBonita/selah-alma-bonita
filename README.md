# selah-alma-bonita
Mini App oficial de Selah Alma Bonita
/* Efecto de entrada para el logo */
.logo {
  width: 200px;
  max-width: 80%;
  animation: aparecer 2s ease-in-out;
  filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.5));
}

/* Brillo suave */
@keyframes aparecer {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Fondo más elegante */
body {
  background:
    radial-gradient(circle at top, #fff7f2, #fffaf8 45%, #ffffff);
}
h1 {
  color: #b8860b;
  font-size: 38px;
  letter-spacing: 1px;
  animation: aparecer 2s ease-in-out;
}
