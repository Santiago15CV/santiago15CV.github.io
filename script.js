// Personaliza estos datos antes de compartir la página.
const WHATSAPP_NUMBER = "924584982"; // Tu número con código de país, solo dígitos. Ej.: 573001234567
const LUGAR = "un lugar bonito"; // Ej.: "un café en el centro"

const contraventana = document.getElementById("contraventana");
const paloma = document.getElementById("paloma");
const carta = document.getElementById("carta");
const ayuda = document.getElementById("ayuda");
const estado = document.getElementById("estado");

document.getElementById("lugarTexto").textContent = LUGAR;

contraventana.addEventListener("click", () => {
    contraventana.classList.add("abierta");
    ayuda.textContent = "Una mensajera trae algo para ti…";

    setTimeout(() => {
        paloma.classList.add("visible");
        ayuda.textContent = "Toca la patita de la paloma";
    }, 650);
});

document.getElementById("pata").addEventListener("click", () => {
    paloma.classList.add("volando");

    setTimeout(() => {
        carta.classList.add("visible");
        ayuda.textContent = "";
        carta.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 420);
});

function enviarRespuesta(acepto) {
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;

    if (acepto && (!fecha || !hora)) {
        estado.textContent = "Elige una fecha y una hora para enviar tu respuesta.";
        estado.classList.add("visible");
        return;
    }

    const fechaBonita = fecha
        ? new Date(`${fecha}T00:00:00`).toLocaleDateString("es-CO", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        })
    : "sin fecha seleccionada";

    const texto = acepto
        ? `¡Sí, acepto la invitación! 💌\nFecha: ${fechaBonita}\nHora: ${hora}\nLugar: ${LUGAR}`
        : "Gracias por invitarme 🌷 Esta vez no puedo aceptar.";

    if (!WHATSAPP_NUMBER) {
        estado.textContent =
        "Falta configurar tu número en WHATSAPP_NUMBER, al inicio del archivo script.js.";
        estado.classList.add("visible");
        return;
    }

    const numero = WHATSAPP_NUMBER.replace(/\D/g, "");
    const enlace = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    estado.textContent =
        "Se abrirá WhatsApp con la respuesta lista. Presiona Enviar para compartirla.";
    estado.classList.add("visible");
    window.open(enlace, "_blank", "noopener,noreferrer");
    }

document.getElementById("aceptar").addEventListener("click", () => {
    enviarRespuesta(true);
});

document.getElementById("rechazar").addEventListener("click", () => {
    enviarRespuesta(false);
});