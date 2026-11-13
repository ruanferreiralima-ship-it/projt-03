/* ============================================================
   VALIDACAO.JS - CADASTRO E LOGIN
   Login: 6 a 10 caracteres (letras, números e caracteres especiais)
   Senha: 6 a 10 caracteres (apenas letras e números)
   Complemento: Opcional
   ============================================================ */

   document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login-form");
    if (!form) return;

    const isCadastro = Boolean(document.getElementById("nome"));

    const campos = {
        nome: document.getElementById("nome"),
        nascimento: document.getElementById("nascimento"),
        sexo: document.getElementById("sexo"),
        nomeMae: document.getElementById("nome_mae"),
        cpf: document.getElementById("cpf"),
        email: document.getElementById("email"),
        celular: document.getElementById("celular"),
        telefone: document.getElementById("telefone"),
        cep: document.getElementById("cep"),
        endereco: document.getElementById("endereco"),
        numero: document.getElementById("numero"),
        complemento: document.getElementById("complemento"),
        login: document.getElementById("login"),
        senha: document.getElementById("senha"),
        confirmarSenha: document.getElementById("confirmar_senha"),
        termos: document.getElementById("termos")
    };

    function definirStatusCampo(input, valido, mensagem = "") {
        if (!input) return;
        const formGroup = input.closest(".form-group");
        const small = formGroup ? formGroup.querySelector(":scope > small") : null;

        input.classList.remove("is-valid", "is-invalid");
        if (small) {
            small.classList.remove("error-feedback", "success-feedback");
        }

        if (valido === true) {
            input.classList.add("is-valid");
            if (small && mensagem) {
                small.textContent = mensagem;
                small.classList.add("success-feedback");
            }
        } else if (valido === false) {
            input.classList.add("is-invalid");
            if (small && mensagem) {
                small.textContent = mensagem;
                small.classList.add("error-feedback");
            }
        } else if (small) {
            small.textContent = mensagem;
        }
    }

    function validarCPF(cpfStr) {
        const cpf = cpfStr.replace(/\D/g, "");
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
        let resto = 11 - (soma % 11);
        let digito1 = resto >= 10 ? 0 : resto;
        if (digito1 !== parseInt(cpf.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
        resto = 11 - (soma % 11);
        let digito2 = resto >= 10 ? 0 : resto;
        return digito2 === parseInt(cpf.charAt(10));
    }

    function validarNome(valor) {
        const limpo = valor.trim();
        return limpo.length >= 15 && limpo.length <= 80 && /^[a-zA-Zà-úÀ-Ú\s]+$/.test(limpo);
    }

    function validarCelular(valor) {
        return /^\(\+55\)[1-9]{2}-9[0-9]{8}$/.test(valor);
    }

    function validarTelefoneFixo(valor) {
        return /^\(\+55\)[1-9]{2}-[2-5][0-9]{7}$/.test(valor);
    }

    function validarEmail(valor) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim());
    }

    function validarNascimento(dataISO) {
        if (!dataISO) return false;
        const nasc = new Date(dataISO);
        const hoje = new Date();
        let idade = hoje.getFullYear() - nasc.getFullYear();
        const m = hoje.getMonth() - nasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
        return idade >= 16 && idade <= 120;
    }

    function validarLogin(valor) {
        return /^\S{6,10}$/.test(valor);
    }

    function validarSenha(valor) {
        return /^[A-Za-z0-9]{6,10}$/.test(valor);
    }

    if (campos.login) {
        campos.login.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/\s/g, "").slice(0, 10);
            const len = e.target.value.length;
            const ok = validarLogin(e.target.value);

            definirStatusCampo(
                campos.login,
                ok,
                ok
                    ? `Login válido! (${len}/10)`
                    : `Informe de 6 a 10 caracteres (${len}/10).`
            );
        });
    }

    function checarSenhas() {
        const s1 = campos.senha.value;
        const len1 = s1.length;
        const senhaValida = validarSenha(s1);

        definirStatusCampo(
            campos.senha,
            senhaValida,
            senhaValida
                ? `Senha válida! (${len1}/10)`
                : `Informe de 6 a 10 caracteres (apenas letras e números) (${len1}/10).`
        );

        if (campos.confirmarSenha) {
            const s2 = campos.confirmarSenha.value;
            if (s2.length > 0) {
                const coincidem = senhaValida && s1 === s2;
                definirStatusCampo(
                    campos.confirmarSenha,
                    coincidem,
                    coincidem
                        ? "As senhas coincidem!"
                        : (s1 !== s2 ? "As senhas não coincidem!" : "A senha precisa ter entre 6 e 10 letras ou números.")
                );
                return coincidem;
            } else {
                definirStatusCampo(campos.confirmarSenha, null, "");
                return false;
            }
        }

        return senhaValida;
    }

    if (campos.senha) {
        campos.senha.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^A-Za-z0-9]/g, "").slice(0, 10);
            checarSenhas();
        });
    }

    if (campos.confirmarSenha) {
        campos.confirmarSenha.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^A-Za-z0-9]/g, "").slice(0, 10);
            checarSenhas();
        });
    }

    if (!isCadastro) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const loginVal = campos.login.value.trim();
            const senhaVal = campos.senha.value;

            if (!validarLogin(loginVal) || !validarSenha(senhaVal)) {
                alert("Verifique o formato do login (6 a 10 caracteres) e da senha (6 a 10 letras ou números).");
                return;
            }

            const cadastros = JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];
            const usuarioEncontrado = cadastros.find(
                (u) => u.login.toLowerCase() === loginVal.toLowerCase() && u.senha === senhaVal
            );

            if (usuarioEncontrado) {
                localStorage.setItem("usuario_logado", JSON.stringify(usuarioEncontrado));
                alert(`Bem-vindo(a), ${usuarioEncontrado.nome}!`);
                window.location.href = "index.html";
            } else {
                definirStatusCampo(campos.login, false, "Login ou senha incorretos.");
                definirStatusCampo(campos.senha, false, "Verifique suas credenciais.");
                alert("Login ou senha inválidos! Caso ainda não tenha conta, clique em 'Criar conta'.");
            }
        });
        return;
    }

    const filtrarLetras = (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Zà-úÀ-Ú\s]/g, "");
    };

    if (campos.nome) {
        campos.nome.addEventListener("input", (e) => {
            filtrarLetras(e);
            const ok = validarNome(e.target.value);
            definirStatusCampo(
                campos.nome,
                ok,
                ok ? "Nome válido!" : `Mínimo de 15 caracteres alfabéticos (${e.target.value.trim().length}/15).`
            );
        });
    }

    if (campos.nomeMae) {
        campos.nomeMae.addEventListener("input", (e) => {
            filtrarLetras(e);
            const ok = validarNome(e.target.value);
            definirStatusCampo(
                campos.nomeMae,
                ok,
                ok ? "Nome materno válido!" : `Mínimo de 15 caracteres alfabéticos (${e.target.value.trim().length}/15).`
            );
        });
    }

    if (campos.nascimento) {
        campos.nascimento.addEventListener("change", () => {
            const ok = validarNascimento(campos.nascimento.value);
            definirStatusCampo(
                campos.nascimento,
                ok,
                ok ? "Data de nascimento válida." : "Idade mínima de 16 anos."
            );
        });
    }

    if (campos.sexo) {
        campos.sexo.addEventListener("change", () => {
            const ok = campos.sexo.value !== "";
            definirStatusCampo(campos.sexo, ok, ok ? "" : "Selecione uma opção.");
        });
    }

    if (campos.cpf) {
        campos.cpf.addEventListener("input", (e) => {
            let v = e.target.value.replace(/\D/g, "").slice(0, 11);
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            e.target.value = v;

            if (v.length === 14) {
                const ok = validarCPF(v);
                definirStatusCampo(campos.cpf, ok, ok ? "CPF válido!" : "CPF inválido! Verifique os dígitos.");
            } else {
                definirStatusCampo(campos.cpf, false, "Digite os 11 dígitos do CPF.");
            }
        });
    }

    if (campos.email) {
        campos.email.addEventListener("input", () => {
            const ok = validarEmail(campos.email.value);
            definirStatusCampo(campos.email, ok, ok ? "E-mail válido!" : "Digite um e-mail válido.");
        });
    }

    if (campos.celular) {
        campos.celular.addEventListener("input", (e) => {
            let v = e.target.value.replace(/\D/g, "");
            if (v.startsWith("55")) v = v.slice(2);
            v = v.slice(0, 11);

            if (v.length > 2) {
                v = `(+55)${v.slice(0, 2)}-${v.slice(2)}`;
            } else if (v.length > 0) {
                v = `(+55)${v}`;
            }
            e.target.value = v;

            const ok = validarCelular(v);
            definirStatusCampo(
                campos.celular,
                ok,
                ok ? "Celular válido!" : "Formato obrigatório: (+55)21-999999999"
            );
        });
    }

    if (campos.telefone) {
        campos.telefone.addEventListener("input", (e) => {
            let v = e.target.value.replace(/\D/g, "");
            if (v.startsWith("55")) v = v.slice(2);
            v = v.slice(0, 10);

            if (v.length > 2) {
                v = `(+55)${v.slice(0, 2)}-${v.slice(2)}`;
            } else if (v.length > 0) {
                v = `(+55)${v}`;
            }
            e.target.value = v;

            const ok = validarTelefoneFixo(v);
            definirStatusCampo(
                campos.telefone,
                ok,
                ok ? "Telefone fixo válido!" : "Formato obrigatório: (+55)21-22223333"
            );
        });
    }

    if (campos.cep) {
        campos.cep.addEventListener("input", (e) => {
            let v = e.target.value.replace(/\D/g, "").slice(0, 8);
            if (v.length > 5) v = v.replace(/(\d{5})(\d{1,3})/, "$1-$2");
            e.target.value = v;

            const cepLimpo = v.replace(/\D/g, "");
            if (cepLimpo.length === 8) {
                definirStatusCampo(campos.cep, null, "Buscando CEP...");
                fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (!data.erro) {
                            campos.endereco.value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
                            definirStatusCampo(campos.cep, true, "CEP encontrado!");
                            definirStatusCampo(campos.endereco, true, "");
                            if (campos.numero) campos.numero.focus();
                        } else {
                            campos.endereco.value = "";
                            definirStatusCampo(campos.cep, false, "CEP não encontrado.");
                        }
                    })
                    .catch(() => {
                        definirStatusCampo(campos.cep, false, "Erro ao consultar o CEP.");
                    });
            } else {
                definirStatusCampo(campos.cep, false, "Informe os 8 números do CEP.");
            }
        });
    }

    if (campos.numero) {
        campos.numero.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/\D/g, "");
            const ok = e.target.value.length > 0;
            definirStatusCampo(campos.numero, ok, ok ? "" : "Informe o número.");
        });
    }

    if (campos.complemento) {
        campos.complemento.addEventListener("input", () => {
            campos.complemento.classList.remove("is-invalid");
            if (campos.complemento.value.trim().length > 0) {
                campos.complemento.classList.add("is-valid");
            } else {
                campos.complemento.classList.remove("is-valid");
            }
        });
    }

    function formatarDataBR(dataISO) {
        if (!dataISO) return "";
        const [ano, mes, dia] = dataISO.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const validacoes = [
            validarNome(campos.nome.value),
            validarNascimento(campos.nascimento.value),
            campos.sexo.value !== "",
            validarNome(campos.nomeMae.value),
            validarCPF(campos.cpf.value),
            campos.email ? validarEmail(campos.email.value) : true,
            validarCelular(campos.celular.value),
            validarTelefoneFixo(campos.telefone.value),
            campos.cep.value.replace(/\D/g, "").length === 8,
            campos.endereco.value.trim().length > 5,
            campos.numero.value.trim().length > 0,
            validarLogin(campos.login.value),
            checarSenhas(),
            campos.termos.checked
        ];

        if (validacoes.includes(false)) {
            alert("Por favor, corrija os campos destacados em vermelho antes de finalizar o cadastro.");
            const primeiroInvalido = form.querySelector(".is-invalid");
            if (primeiroInvalido) primeiroInvalido.focus();
            return;
        }

        const usuario = {
            nome: campos.nome.value.trim(),
            dataNascimento: formatarDataBR(campos.nascimento.value),
            sexo: campos.sexo.value,
            nomeMaterno: campos.nomeMae.value.trim(),
            cpf: campos.cpf.value.trim(),
            email: campos.email ? campos.email.value.trim() : "",
            celular: campos.celular.value.trim(),
            telefone: campos.telefone.value.trim(),
            cep: campos.cep.value.trim(),
            endereco: campos.endereco.value.trim(),
            numero: campos.numero.value.trim(),
            complemento: campos.complemento ? campos.complemento.value.trim() : "",
            login: campos.login.value.trim(),
            senha: campos.senha.value,
            dataCadastro: new Date().toISOString()
        };

        const cadastrosExistentes = JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];
        const usuarioExiste = cadastrosExistentes.some(
            (user) => user.login.toLowerCase() === usuario.login.toLowerCase() || user.cpf === usuario.cpf
        );

        if (usuarioExiste) {
            definirStatusCampo(campos.cpf, false, "Este CPF ou Login já está cadastrado.");
            alert("Este Login ou CPF já está cadastrado no sistema!");
            return;
        }

        cadastrosExistentes.push(usuario);
        localStorage.setItem("usuarios_cadastrados", JSON.stringify(cadastrosExistentes));

        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
    });
});