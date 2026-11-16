/* ============================================================
   GLOBAL.JS - TEMA (.light-mode), FONTE, MENU MOBILE E WHATSAPP
   ============================================================ */

   const WHATSAPP_NUMERO = "5521970662286";
   const WHATSAPP_MSG_PADRAO = "Olá! Vim pelo site da RUAN FILM e gostaria de solicitar um orçamento.";
   
   function gerarLinkWhatsApp(mensagem = WHATSAPP_MSG_PADRAO) {
       return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
   }
   
   // 1. Aplica tema claro e tamanho da fonte salvos imediatamente
   (function aplicarPreferenciasIniciais() {
       if (localStorage.getItem("ruan_theme") === "light") {
           document.body.classList.add("light-mode");
       }
   
       const savedFont = localStorage.getItem("ruan_font_size");
       if (savedFont) {
           const fontRadio = document.getElementById(savedFont);
           if (fontRadio) fontRadio.checked = true;
       }
   })();
   
   document.addEventListener("DOMContentLoaded", () => {
       // 2. Alternância de Tema (Dark / Light via .light-mode)
       const themeButtons = document.querySelectorAll(".theme-button");
       themeButtons.forEach((button) => {
           button.addEventListener("click", (e) => {
               e.preventDefault();
               document.body.classList.toggle("light-mode");
   
               if (document.body.classList.contains("light-mode")) {
                   localStorage.setItem("ruan_theme", "light");
               } else {
                   localStorage.setItem("ruan_theme", "dark");
               }
           });
       });
   
       // 3. Persistência do Tamanho da Fonte
       const fontRadios = document.querySelectorAll('input[name="font-size"]');
       fontRadios.forEach((radio) => {
           radio.addEventListener("change", () => {
               if (radio.checked) {
                   localStorage.setItem("ruan_font_size", radio.id);
               }
           });
       });
   
       // 4. Configura links de WhatsApp do rodapé
       const linksWhatsApp = document.querySelectorAll('a[aria-label="WhatsApp"]');
       linksWhatsApp.forEach((link) => {
           link.href = gerarLinkWhatsApp();
           link.target = "_blank";
           link.rel = "noopener noreferrer";
       });
   
       // 5. Atualiza e torna clicável o telefone da barra superior
       const infoSpans = document.querySelectorAll(".accessibility-info span");
       infoSpans.forEach((span) => {
           if (span.textContent.includes("7066-2286") || span.textContent.includes("XXXX-XXXX")) {
               span.innerHTML = `<a href="${gerarLinkWhatsApp()}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;">
                   <i class="fa-brands fa-whatsapp gold-text"></i> (21) 9 7066-2286
               </a>`;
           }
       });
   
       // 6. Fecha o menu mobile automaticamente ao clicar em qualquer link
       const menuToggle = document.getElementById("menu-toggle");
       if (menuToggle) {
           const linksMenu = document.querySelectorAll(".navbar-menu a");
           linksMenu.forEach((link) => {
               link.addEventListener("click", () => {
                   if (window.innerWidth <= 768) {
                       menuToggle.checked = false;
                   }
               });
           });
   
           window.addEventListener("resize", () => {
               if (window.innerWidth > 768 && menuToggle.checked) {
                   menuToggle.checked = false;
               }
           });
       }
   
       // 7. Cria o botão flutuante do WhatsApp no canto inferior direito
       criarBotaoFlutuanteWhatsApp();
   });
   
   function criarBotaoFlutuanteWhatsApp() {
       if (document.querySelector(".whatsapp-float-btn")) return;
   
       const btnFloat = document.createElement("a");
       btnFloat.href = gerarLinkWhatsApp();
       btnFloat.target = "_blank";
       btnFloat.rel = "noopener noreferrer";
       btnFloat.className = "whatsapp-float-btn";
       btnFloat.setAttribute("aria-label", "Falar no WhatsApp (21) 97066-2286");
       btnFloat.title = "Atendimento via WhatsApp: (21) 97066-2286";
       btnFloat.innerHTML = `<i class="fa-brands fa-whatsapp"></i>`;
   
       document.body.appendChild(btnFloat);
   }

   /* ============================================================
   SISTEMA GLOBAL DE TOASTS
   ============================================================ */
function exibirToast(mensagem, tipo = "warning", titulo = "", duracao = 4000) {
    let container = document.querySelector(".toast-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        container.setAttribute("aria-live", "polite");
        document.body.appendChild(container);
    }

    const config = {
        success: { icone: "fa-circle-check", tituloPadrao: "Sucesso" },
        error: { icone: "fa-circle-xmark", tituloPadrao: "Atenção" },
        warning: { icone: "fa-triangle-exclamation", tituloPadrao: "Aviso" }
    };

    const { icone, tituloPadrao } = config[tipo] || config.warning;

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${tipo}`;
    toast.setAttribute("role", "status");

    toast.innerHTML = `
        <i class="fa-solid ${icone} toast-icon"></i>
        <div class="toast-content">
            <strong class="toast-title">${titulo || tituloPadrao}</strong>
            <span>${mensagem}</span>
        </div>
        <button type="button" class="toast-close" aria-label="Fechar notificação">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="toast-progress" style="animation-duration: ${duracao}ms;"></div>
    `;

    container.appendChild(toast);

    // Dispara a animação de entrada
    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    const fecharToast = () => {
        toast.classList.remove("show");
        toast.classList.add("hide");
        setTimeout(() => toast.remove(), 350);
    };

    toast.querySelector(".toast-close").addEventListener("click", fecharToast);
    setTimeout(fecharToast, duracao);
}