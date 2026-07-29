let currentOperand = 1;
    const op1Input = document.getElementById('operand1');
    const operatorInput = document.getElementById('operator');
    const op2Input = document.getElementById('operand2');
    const resultDisplay = document.getElementById('result');
    const errorMsg = document.getElementById('error-msg');

    function handleInput(val) {
        errorMsg.textContent = ''; 

        if (/[0-9\.]/.test(val)) {
            let target = currentOperand === 1 ? op1Input : op2Input;
            
            if (val === '.' && target.value.includes('.')) return; 
            
            target.value += val;
        } 

        else if (['+', '-', '*', '/', '%'].includes(val)) {
            let target = currentOperand === 1 ? op1Input : op2Input;

            if (val === '-' && target.value === '') {
                target.value = '-';
                return;
            }

            if (op1Input.value === '' || op1Input.value === '-') return; 

            if (currentOperand === 2 && op2Input.value === '') {
                operatorInput.value = val;
                return;
            }

            operatorInput.value = val;
            currentOperand = 2;
        } 

        else if (val === '=' || val === 'Enter') {
            calculate();
        } 

        else if (val === 'Backspace') {
            if (currentOperand === 2) {
                if (op2Input.value !== '') {
                    op2Input.value = op2Input.value.slice(0, -1);
                } else {
                
                    operatorInput.value = '';
                    currentOperand = 1;
                }
            } else {
                op1Input.value = op1Input.value.slice(0, -1);
            }
        } 

        else if (val === 'AC') {
            clearAll();
        }
    }

    function calculate() {
        errorMsg.textContent = '';
        
        if (op1Input.value === '' || operatorInput.value === '' || op2Input.value === '') return;

        const num1 = parseFloat(op1Input.value);
        const num2 = parseFloat(op2Input.value);
        const op = operatorInput.value;

        if (isNaN(num1) || isNaN(num2)) {
            errorMsg.textContent = 'Invalid numbers.';
            return;
        }

        if (!['+', '-', '*', '/', '%'].includes(op)) {
            errorMsg.textContent = 'Invalid operator.';
            return;
        }

        if (op === '/' && num2 === 0) {
            errorMsg.textContent = 'Cannot divide by zero.';
            return;
        }

        let result = 0;
        switch(op) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/': result = num1 / num2; break;
            case '%': result = num1 % num2; break;
        }

        result = Math.round(result * 100000000) / 100000000;
        
        resultDisplay.textContent = result;
        
        op1Input.value = '';
        operatorInput.value = '';
        op2Input.value = '';
        currentOperand = 1;
    }

    function clearAll() {
        op1Input.value = '';
        operatorInput.value = '';
        op2Input.value = '';
        resultDisplay.textContent = '0';
        errorMsg.textContent = '';
        currentOperand = 1;
    }

    window.addEventListener('keydown', (e) => {
        let key = e.key;
        
        if (key === 'Enter') key = '=';
        if (key === 'Escape' || key.toLowerCase() === 'c') key = 'AC';
        if (key === 'Delete') key = 'Backspace';
        
        if (key.toLowerCase() === 'x') key = '*'; 

        const validKeys = ['0','1','2','3','4','5','6','7','8','9','.', '+','-','*','/','%','=','Backspace','AC'];
        
        if (validKeys.includes(key)) {
            e.preventDefault(); 
            handleInput(key);
        }
    });

    document.querySelector('.keypad').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn')) {
            let val = e.target.dataset.val;
            if (val === '×') val = '*';
            
            handleInput(val);
        }
    });