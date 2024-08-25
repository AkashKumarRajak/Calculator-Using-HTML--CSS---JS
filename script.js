document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const historyList = document.getElementById('history-list');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let secondOperand = '';

    function updateDisplay(value) {
        display.textContent = value;
    }

    function calculate() {
        if (firstOperand && operator && currentInput) {
            const num1 = parseFloat(firstOperand);
            const num2 = parseFloat(currentInput);
            let result;
            switch (operator) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    result = num1 / num2;
                    break;
                default:
                    return;
            }
            const calculation = `${firstOperand} ${operator} ${currentInput} = ${result}`;
            currentInput = result.toString();
            operator = '';
            firstOperand = '';
            updateDisplay(currentInput);
            addToHistory(calculation);
        }
    }

    function addToHistory(calculation) {
        const li = document.createElement('li');
        li.textContent = calculation;
        historyList.appendChild(li);
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            const value = button.textContent;

            if (action === 'clear') {
                currentInput = '';
                operator = '';
                firstOperand = '';
                updateDisplay('0');
            } else if (action === 'equals') {
                calculate();
            } else if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
                if (firstOperand === '') {
                    firstOperand = currentInput;
                    operator = value;
                    currentInput = '';
                } else {
                    calculate();
                    operator = value;
                }
            } else {
                if (currentInput === '0' && value !== '.') {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
                updateDisplay(currentInput);
            }
        });
    });
});
