/* ============================================================
   GLOBAL.JS - TEMA (.light-mode), FONTE, MENU MOBILE, WHATSAPP,
   SESSÃO DO USUÁRIO NO TOPO E TABELA DE PREÇOS PARA LOGADOS
   ============================================================ */

   const WHATSAPP_NUMERO = "5521970662286";
   const WHATSAPP_MSG_PADRAO = "Olá! Vim pelo site da RUAN FILM e gostaria de solicitar um orçamento.";
   
   function gerarLinkWhatsApp(mensagem = WHATSAPP_MSG_PADRAO) {
       return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
   }
   
   // ============================================================
   // TABELA DE PREÇOS EXCLUSIVA PARA USUÁRIOS LOGADOS
   // (Altere os valores abaixo conforme sua tabela real)
   // ============================================================
   const TABELA_PRECOS_SERVICOS = {
       // Página: insulfilm.html -> Para Veículos[cite: 20]
       "automotivo|película fumê / tingida": { valor: "R$ 250,00", detalhe: "a partir de (veículo completo)" },
       "automotivo|película carbono": { valor: "R$ 420,00", detalhe: "a partir de (veículo completo)" },
       "automotivo|película nano cerâmica": { valor: "R$ 750,00", detalhe: "a partir de (veículo completo)" },
       "automotivo|película metalizada": { valor: "R$ 480,00", detalhe: "a partir de (veículo completo)" },
       "automotivo|película de segurança": { valor: "R$ 550,00", detalhe: "a partir de (veículo completo)" },
   
       // Página: insulfilm.html -> Para Residências[cite: 20]
       "residencial|película controle solar": { valor: "R$ 110,00 / m²", detalhe: "instalado" },
       "residencial|película espelhada / refletiva": { valor: "R$ 125,00 / m²", detalhe: "instalado" },
       "residencial|película nano cerâmica": { valor: "R$ 240,00 / m²", detalhe: "instalado" },
       "residencial|película jateada / decorativa": { valor: "R$ 95,00 / m²", detalhe: "instalado" },
       "residencial|película de segurança": { valor: "R$ 160,00 / m²", detalhe: "instalado" },
       "residencial|película blackout / whiteout": { valor: "R$ 115,00 / m²", detalhe: "instalado" },
   
       // Página: insulfilm.html -> Painéis de Segurança e Comercial[cite: 20]
       "seguranca|películas para segurança": { valor: "R$ 160,00 / m²", detalhe: "a partir de (instalado)" },
       "comercial|insulfilm comercial": { valor: "R$ 100,00 / m²", detalhe: "a partir de (projetos corporativos)" },
   
       // Página: outros-servicos.html -> PPF e Envelopamento[cite: 14]
       "ppf|ppf frontal (parcial)": { valor: "R$ 2.800,00", detalhe: "a partir de (para-choque + capô)" },
       "ppf|ppf full (carroceria total)": { valor: "R$ 8.500,00", detalhe: "a partir de (blindagem total)" },
       "ppf|ppf matte (efeito fosco)": { valor: "R$ 9.200,00", detalhe: "a partir de (acabamento fosco)" },
       "envelopamento|envelopamento de cor (personalização)": { valor: "R$ 3.500,00", detalhe: "a partir de (veículo completo)" },
       "envelopamento|envelopamento de detalhes (teto e retrovisores)": { valor: "R$ 450,00", detalhe: "a partir de (teto Black Piano)" }
   };
   
   // 1. Aplica tema claro e tamanho da fonte salvos imediatamente[cite: 17]
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
       // 2. Alternância de Tema (Dark / Light via .light-mode)[cite: 17]
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
   
       // 3. Persistência do Tamanho da Fonte[cite: 17]
       const fontRadios = document.querySelectorAll('input[name="font-size"]');
       fontRadios.forEach((radio) => {
           radio.addEventListener("change", () => {
               if (radio.checked) {
                   localStorage.setItem("ruan_font_size", radio.id);
               }
           });
       });
   
       // 4. Configura links de WhatsApp do rodapé[cite: 17]
       const linksWhatsApp = document.querySelectorAll('a[aria-label="WhatsApp"]');
       linksWhatsApp.forEach((link) => {
           link.href = gerarLinkWhatsApp();
           link.target = "_blank";
           link.rel = "noopener noreferrer";
       });
   
       // 5. Atualiza e torna clicável o telefone da barra superior[cite: 17]
       const infoSpans = document.querySelectorAll(".accessibility-info span");
       infoSpans.forEach((span) => {
           if (span.textContent.includes("7066-2286") || span.textContent.includes("XXXX-XXXX")) {
               span.innerHTML = `<a href="${gerarLinkWhatsApp()}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;">
                   <i class="fa-brands fa-whatsapp gold-text"></i> (21) 9 7066-2286
               </a>`;
           }
       });
   
       // 6. Fecha o menu mobile automaticamente ao clicar em qualquer link[cite: 17]
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
   
       // 7. Renderiza o Usuário Logado no canto superior direito de todas as telas
       atualizarUsuarioLogadoHeader();
   
       // 8. Renderiza os preços dos serviços caso o usuário esteja logado
       renderizarPrecosServicos();
   
       // 9. Cria o botão flutuante do WhatsApp no canto inferior direito[cite: 17]
       criarBotaoFlutuanteWhatsApp();
   });
   
   /* ============================================================
      GERENCIAMENTO DE SESSÃO NO TOPO DIREITO (TODAS AS TELAS)
      ============================================================ */
   function obterUsuarioLogado() {
       try {
           const raw = localStorage.getItem("usuario_logado") || localStorage.getItem("ruan_usuario_logado");
           return raw ? JSON.parse(raw) : null;
       } catch (e) {
           return null;
       }
   }
   
   function realizarLogout() {
       localStorage.removeItem("usuario_logado");
       localStorage.removeItem("ruan_usuario_logado");
   
       exibirToast("Você saiu da sua conta com segurança.", "warning", "Sessão encerrada", 2200);
   
       setTimeout(() => {
           window.location.href = "index.html";
       }, 1000);
   }
   
   function atualizarUsuarioLogadoHeader() {
       const usuario = obterUsuarioLogado();
       const navbarActions = document.querySelector(".navbar-actions");
       const accessControls = document.querySelector(".accessibility-controls");
   
       if (!usuario) return;
   
       const identificador = usuario.login
           ? usuario.login
           : (usuario.nome ? usuario.nome.trim().split(" ")[0] : "Usuário");
   
       const nomeCompleto = usuario.nome || identificador;
   
       if (navbarActions) {
           navbarActions.innerHTML = `
               <div class="user-session-badge" title="Logado como ${nomeCompleto}">
                   <span class="user-session-info">
                       <i class="fa-solid fa-circle-user"></i>
                       <span>Olá, <strong>${identificador}</strong></span>
                   </span>
                   <button type="button" class="btn-logout" id="btn-logout-user" aria-label="Sair da conta">
                       <i class="fa-solid fa-right-from-bracket"></i>
                       <span>Sair</span>
                   </button>
               </div>
           `;
       } else if (accessControls && !document.getElementById("top-user-session")) {
           const topBadge = document.createElement("div");
           topBadge.id = "top-user-session";
           topBadge.className = "user-session-badge user-session-compact";
           topBadge.title = `Logado como ${nomeCompleto}`;
           topBadge.innerHTML = `
               <span class="user-session-info">
                   <i class="fa-solid fa-circle-user"></i>
                   <span><strong>${identificador}</strong></span>
               </span>
               <button type="button" class="btn-logout" id="btn-logout-user" aria-label="Sair da conta">
                   <i class="fa-solid fa-right-from-bracket"></i>
                   <span>Sair</span>
               </button>
           `;
           accessControls.appendChild(topBadge);
       }
   
       const btnLogout = document.getElementById("btn-logout-user");
       if (btnLogout) {
           btnLogout.addEventListener("click", realizarLogout);
       }
   }
   
   /* ============================================================
      EXIBIÇÃO DE PREÇOS NOS SERVIÇOS (SOMENTE USUÁRIOS LOGADOS)
      ============================================================ */
   function renderizarPrecosServicos() {
       const filmCards = document.querySelectorAll(".film-card");
       const safetyPanels = document.querySelectorAll(".safety-panel");
   
       // Só executa nas páginas que possuem cards/painéis de serviços (insulfilm.html e outros-servicos.html)[cite: 14, 20]
       if (filmCards.length === 0 && safetyPanels.length === 0) return;
   
       const usuario = obterUsuarioLogado();
   
       // 1. Cards principais (.film-card)[cite: 14, 20]
       filmCards.forEach((card) => {
           const secao = card.closest("section[id]");
           const secaoId = secao ? secao.id.toLowerCase() : "";
           const tituloEl = card.querySelector(".film-card-head h3");
           const headEl = card.querySelector(".film-card-head");
   
           if (!tituloEl || !headEl) return;
   
           const tituloTexto = tituloEl.textContent.trim();
           const chave = `${secaoId}|${tituloTexto.toLowerCase()}`;
           const infoPreco = TABELA_PRECOS_SERVICOS[chave];
   
           if (!infoPreco) return;
   
           // Cria container à direita no cabeçalho do produto para agrupar Tag + Preço
           let rightBox = headEl.querySelector(".film-head-right");
           if (!rightBox) {
               rightBox = document.createElement("div");
               rightBox.className = "film-head-right";
               const tagExistente = headEl.querySelector(".film-tag");
               if (tagExistente) {
                   rightBox.appendChild(tagExistente);
               }
               headEl.appendChild(rightBox);
           }
   
           if (usuario) {
               const msgOrcamento = `Olá, RUAN FILM! Sou cliente cadastrado (${usuario.login || usuario.nome}) e tenho interesse em: *${tituloTexto}* (${infoPreco.valor}).`;
               const priceBadge = document.createElement("a");
               priceBadge.href = gerarLinkWhatsApp(msgOrcamento);
               priceBadge.target = "_blank";
               priceBadge.rel = "noopener noreferrer";
               priceBadge.className = "service-price-badge";
               priceBadge.title = "Clique para solicitar este serviço no WhatsApp";
               priceBadge.innerHTML = `
                   <span class="price-main"><i class="fa-solid fa-tag"></i> ${infoPreco.valor}</span>
                   <span class="price-sub">${infoPreco.detalhe}</span>
               `;
               rightBox.appendChild(priceBadge);
           } else {
               const lockBadge = document.createElement("a");
               lockBadge.href = "login.html";
               lockBadge.className = "service-price-locked";
               lockBadge.title = "Faça login para visualizar os valores";
               lockBadge.innerHTML = `<i class="fa-solid fa-lock"></i> Faça login para ver o preço`;
               rightBox.appendChild(lockBadge);
           }
       });
   
       // 2. Painéis especiais de Segurança e Comercial (.safety-panel na página insulfilm.html)[cite: 20]
       safetyPanels.forEach((panel) => {
           const secaoId = panel.id ? panel.id.toLowerCase() : "";
           const tituloEl = panel.querySelector("h2");
           if (!tituloEl) return;
   
           const tituloTexto = tituloEl.textContent.trim();
           const chave = `${secaoId}|${tituloTexto.toLowerCase()}`;
           const infoPreco = TABELA_PRECOS_SERVICOS[chave];
   
           if (!infoPreco) return;
   
           // Envolve o h2 num flex header para alinhar o preço ao lado direito do título
           const headerRow = document.createElement("div");
           headerRow.className = "safety-panel-head";
           tituloEl.parentNode.insertBefore(headerRow, tituloEl);
           headerRow.appendChild(tituloEl);
   
           if (usuario) {
               const msgOrcamento = `Olá, RUAN FILM! Sou cliente cadastrado (${usuario.login || usuario.nome}) e tenho interesse em: *${tituloTexto}* (${infoPreco.valor}).`;
               const priceBadge = document.createElement("a");
               priceBadge.href = gerarLinkWhatsApp(msgOrcamento);
               priceBadge.target = "_blank";
               priceBadge.rel = "noopener noreferrer";
               priceBadge.className = "service-price-badge";
               priceBadge.innerHTML = `
                   <span class="price-main"><i class="fa-solid fa-tag"></i> ${infoPreco.valor}</span>
                   <span class="price-sub">${infoPreco.detalhe}</span>
               `;
               headerRow.appendChild(priceBadge);
           } else {
               const lockBadge = document.createElement("a");
               lockBadge.href = "login.html";
               lockBadge.className = "service-price-locked";
               lockBadge.innerHTML = `<i class="fa-solid fa-lock"></i> Faça login para ver o preço`;
               headerRow.appendChild(lockBadge);
           }
       });
   }
   
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
      SISTEMA GLOBAL DE TOASTS[cite: 17]
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