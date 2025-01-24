// filepath: /c:/Users/Test/OneDrive/Escritorio/interes/js/script.js
document.getElementById('amount').addEventListener('input', function() {
    let amount = document.getElementById('amount').value;
    amount = amount.replace(/[^0-9,]/g, ''); // Eliminar cualquier carácter no numérico excepto la coma decimal
    if (amount === '') {
        document.getElementById('result').innerHTML = '';
        return;
    }

    amount = amount.replace(',', '.'); // Reemplazar la coma por un punto para el parseo
    amount = parseFloat(amount);
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
                <p>Monto Total a Pagar: $${totalAmount.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                <p>Valor de cada Cuota: $${installmentAmount.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
            </div>
        `;
    }

    document.getElementById('result').innerHTML = resultHTML;
});

document.getElementById('amount').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        let amount = document.getElementById('amount').value;
        amount = amount.replace(/[^0-9,]/g, ''); // Eliminar cualquier carácter no numérico excepto la coma decimal
        amount = amount.replace(',', '.'); // Reemplazar la coma por un punto para el parseo
        if (amount === '') {
            return;
        }

        amount = parseFloat(amount);
        if (isNaN(amount) || amount <= 0) {
            return;
        }

        // Formatear el valor con separadores de miles y decimales
        const formattedAmount = amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        // Agregar el importe al historial
        const historyList = document.getElementById('history-list');
        const listItem = document.createElement('li');
        listItem.textContent = `Monto Original: $${formattedAmount}`;
        historyList.appendChild(listItem);

        // Limpiar el campo de entrada
        document.getElementById('amount').value = '';
    }
});