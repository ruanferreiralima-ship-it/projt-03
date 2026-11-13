/* ============================================================
   JS CONTATO - VALIDAÇÃO E REDIRECIONAMENTO WHATSAPP
   ============================================================ */

   document.addEventListener("DOMContentLoaded", () => {
    const formContato = document.querySelector(".contact-form-box form");
    const inputNome = document.getElementById("nome");
    const inputTelefone = document.getElementById("telefone_contato");
    const inputMensagem = document.getElementById("mensagem");

    // Torna o card do WhatsApp clicável
    const cardsContato = document.querySelectorAll(".contact-card-box");
    cardsContato.forEach((card) => {
        const titulo = card.querySelector("h4");
        if (titulo && titulo.textContent.trim().toLowerCase() === "whatsapp") {
            card.style.cursor = "pointer";
            card.addEventListener("click", () => {
                window.open("https://wa.me/5521970662286", "_blank", "noopener,noreferrer");
            });
        }
    });

    if (!formContato) return;

    function mostrarErro(input, msg) {
        limparErro(input);
        input.style.borderColor = "#ff4d4d";
        const small = document.createElement("small");
        small.className = "erro-contato";
        small.style.color = "#ff4d4d";
        small.style.fontSize = "0.72rem";
        small.style.marginTop = "4px";
        small.style.fontWeight = "600";
        small.textContent = msg;
        input.parentElement.appendChild(small);
    }

    function limparErro(input) {
        input.style.borderColor = "";
        const err = input.parentElement.querySelector(".erro-contato");
        if (err) err.remove();
    }

    if (inputNome) {
        inputNome.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Zà-úÀ-Ú\s]/g, "");
            limparErro(inputNome);
        });
    }

    // Máscara de telefone: (21) 97066-2286
    if (inputTelefone) {
        inputTelefone.addEventListener("input", (e) => {
            let v = e.target.value.replace(/\D/g, "").slice(0, 11);
            if (v.length > 6) {
                v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
            } else if (v.length > 2) {
                v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
            } else if (v.length > 0) {
                v = `(${v}`;
            }
            e.target.value = v;
            limparErro(inputTelefone);
        });
    }

    if (inputMensagem) {
        inputMensagem.addEventListener("input", () => limparErro(inputMensagem));
    }

    formContato.addEventListener("submit", (e) => {
        e.preventDefault();
        let valido = true;

        const nomeVal = inputNome.value.trim();
        const telNumeros = inputTelefone.value.replace(/\D/g, "");
        const msgVal = inputMensagem.value.trim();

        if (nomeVal.length < 3) {
            mostrarErro(inputNome, "Digite seu nome completo.");
            valido = false;
        }

        if (telNumeros.length < 10 || telNumeros.length > 11) {
            mostrarErro(inputTelefone, "Informe um telefone/WhatsApp válido com DDD.");
            valido = false;
        }

        if (msgVal.length < 10) {
            mostrarErro(inputMensagem, "Escreva uma mensagem com pelo menos 10 caracteres.");
            valido = false;
        }

        if (!valido) return;

        const texto =
            `Olá, RUAN FILM! Meu nome é *${nomeVal}*.\n` +
            `Telefone: ${inputTelefone.value}\n\n` +
            `*Mensagem:* ${msgVal}`;

        window.open(`https://wa.me/5521970662286?text=${encodeURIComponent(texto)}`, "_blank", "noopener,noreferrer");
        formContato.reset();
    });
});