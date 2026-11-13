// ============================================================
// RUAN FILM - LÓGICA DA CALCULADORA DE ORÇAMENTO
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calc-form');
    const tipoServicoSelect = document.getElementById('tipo-servico');
    const metragemInput = document.getElementById('metragem');
    const resultadoDisplay = document.getElementById('resultado');

    // Tabela de preços base por tipo de serviço (Você pode alterar os valores abaixo conforme sua tabela real)
    const precosBase = {
        automotivo: 350.00,   // Ex: Valor base por aplicação/veículo
        residencial: 120.00,  // Ex: Valor por metro quadrado (m²)
        ppf: 500.00,          // Ex: Valor por metro quadrado (m²)
        envelopamento: 250.00 // Ex: Valor por metro quadrado (m²)
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que a página recarregue ao enviar

        const tipo = tipoServicoSelect.value;
        const quantidade = parseFloat(metragemInput.value);

        // Validação básica
        if (!tipo || isNaN(quantidade) || quantidade <= 0) {
            alert('Por favor, selecione um serviço válido e insira uma quantidade/metragem maior que zero.');
            return;
        }

        // Calcula o valor total com base no preço unitário do serviço escolhido
        const precoUnitario = precosBase[tipo] || 0;
        const total = precoUnitario * quantidade;

        // Formata o número para o padrão de moeda brasileira (R$ 0.000,00)
        const valorFormatado = total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        // Exibe o resultado na tela
        resultadoDisplay.textContent = valorFormatado;
    });
});