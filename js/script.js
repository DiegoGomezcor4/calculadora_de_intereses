document.getElementById('amount').addEventListener('input', function() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('result').innerHTML = '';
        return;
    }

    const fees = {
        1: 6,
        2: 12.5,
        3: 18.5,
        6: 31
    };

    let resultHTML = '';

    for (const [installments, feePercentage] of Object.entries(fees)) {
        const totalAmount = amount + (amount * feePercentage / 100);
        const installmentAmount = totalAmount / installments;
        resultHTML += `
            <div class="card">
                <p>${installments} Cuota(s) (${feePercentage}%):</p>
                <p>Monto Total a Pagar: $${totalAmount.toFixed(2)}</p>
                <p>Valor de cada Cuota: $${installmentAmount.toFixed(2)}</p>
            </div>
        `;
    }

    document.getElementById('result').innerHTML = resultHTML;
});