/* ============================================================
   JS CADASTRO - VALIDAÇÃO EM TEMPO REAL E MÁSCARAS
   ============================================================ */

   document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login-form");
    if (!form) return;

    const campos = {
        nome: document.getElementById("nome"),
        nascimento: document.getElementById("nascimento"),
        sexo: document.getElementById("sexo"),
        nomeMae: document.getElementById("nome_mae"),
        cpf: document.getElementById("cpf"),
        email: document.getElementById("email"), // Suporte opcional caso adicione o campo e-mail
        celular: document.getElementById("celular"),
        telefone: document.getElementById("telefone"),
        cep: document.getElementById("cep"),
        endereco: document.getElementById("endereco"),
        numero: document.getElementById("numero"),
        login: document.getElementById("login"),
        senha: document.getElementById("senha"),
        confirmarSenha: document.getElementById("confirmar_senha"),
        termos: document.getElementById("termos")
    };

    // ============================================================
    // FEEDBACK VISUAL USANDO AS CLASSES DO CADASTRO.CSS
    // ============================================================
    function definirStatusCampo(input, valido, mensagem = "") {
        if (!input) return;
        const formGroup = input.closest(".form-group");
        const small = formGroup ? formGroup.querySelector("small") : null;

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

    // ============================================================
    // REGRAS DE VALIDAÇÃO DE DADOS
    // ============================================================

    // 1. Validação Matemática Real de CPF
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

    // 2. Validação de Nome e Nome Materno (15 a 80 caracteres alfabéticos)
    function validarNome(valor) {
        const limpo = valor.trim();
        return limpo.length >= 15 && limpo.length <= 80 && /^[a-zA-Zà-úÀ-Ú\s]+$/.test(limpo);
    }

    // 3. Validação de Celular (+55)DD-9XXXXXXXX
    function validarCelular(valor) {
        return /^\(\+55\)[1-9]{2}-9[0-9]{8}$/.test(valor);
    }

    // 4. Validação de Telefone Fixo (+55)DD-XXXXXXXX
    function validarTelefoneFixo(valor) {
        return /^\(\+55\)[1-9]{2}-[2-5][0-9]{7}$/.test(valor);
    }

    // 5. Validação de E-mail
    function validarEmail(valor) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim());
    }

    // 6. Validação de Data de Nascimento (16 a 120 anos)
    function validarNascimento(dataISO) {
        if (!dataISO) return false;
        const nasc = new Date(dataISO);
        const hoje = new Date();
        let idade = hoje.getFullYear() - nasc.getFullYear();
        const m = hoje.getMonth() - nasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
        return idade >= 16 && idade <= 120;
    }

    // 7. Validação de Login e Senha (Mínimo 6 e Máximo 12 caracteres alfabéticos)
    function validarLogin(valor) {
        return /^[A-Za-z]{6,12}$/.test(valor);
    }

    function validarSenha(valor) {
        return /^[A-Za-z]{6,12}$/.test(valor);
    }

    // ============================================================
    // MÁSCARAS E VALIDAÇÕES EM TEMPO REAL
    // ============================================================

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

    // Máscara + Validação CPF
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

    // Validação E-mail (caso adicionado ao HTML)
    if (campos.email) {
        campos.email.addEventListener("input", () => {
            const ok = validarEmail(campos.email.value);
            definirStatusCampo(campos.email, ok, ok ? "E-mail válido!" : "Digite um e-mail válido.");
        });
    }

    // Máscara + Validação Celular: (+55)21-999999999
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

    // Máscara + Validação Telefone Fixo: (+55)21-22223333
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

    // Máscara CEP + Consulta ViaCEP
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

    // Login: mínimo 6 e máximo 12 caracteres alfabéticos
    if (campos.login) {
        campos.login.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^A-Za-z]/g, "").slice(0, 12);
            const len = e.target.value.length;
            const ok = validarLogin(e.target.value);

            definirStatusCampo(
                campos.login,
                ok,
                ok
                    ? `Login válido! (${len}/12)`
                    : `Informe de 6 a 12 caracteres alfabéticos (${len}/12).`
            );
        });
    }

    // Senha e Confirmação: mínimo 6 e máximo 12 caracteres alfabéticos
    function checarSenhas() {
        const s1 = campos.senha.value;
        const s2 = campos.confirmarSenha.value;
        const len1 = s1.length;
        const senhaValida = validarSenha(s1);

        definirStatusCampo(
            campos.senha,
            senhaValida,
            senhaValida
                ? `Senha válida! (${len1}/12)`
                : `Informe de 6 a 12 caracteres alfabéticos (${len1}/12).`
        );

        if (s2.length > 0) {}
        
