let currentInput  = '';
let previousInput = ''; 
let operator      = null;
let justEvaluated = false;

const resultEl     = document.getElementById('result');
const expressionEl = document.getElementById('expression');

function updateDisplay(value, expr = '') {
  resultEl.textContent     = value || '0';
  expressionEl.textContent = expr;
}

function popResult() {
  resultEl.classList.remove('pop');
  void resultEl.offsetWidth;
  resultEl.classList.add('pop');
}

function formatNumber(num) {
  if (!isFinite(num)) return 'Error';

  if (Math.abs(num) > 1e12 || (Math.abs(num) < 1e-6 && num !== 0)) {
    return parseFloat(num.toPrecision(8)).toExponential();
  }
  
  return parseFloat(num.toPrecision(10)).toString();
}

function calculate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? 'Error' : a / b;
    case '%': return a % b;
    default:  return b;
  }
}

function handleNumber(digit) {
  if (justEvaluated) {
    currentInput  = digit;
    previousInput = '';
    operator      = null;
    justEvaluated = false;
  } else {
    if (currentInput === '0' && digit !== '.') {
      currentInput = digit;
    } else {
      if (currentInput.length >= 12) return;
      currentInput += digit;
    }
  }
  updateDisplay(currentInput, buildExpression());
}

function handleDot() {
  if (justEvaluated) {
    currentInput  = '0.';
    previousInput = '';
    operator      = null;
    justEvaluated = false;
    updateDisplay(currentInput, '');
    return;
  }
  if (currentInput.includes('.')) return;
  if (currentInput === '') currentInput = '0';
  currentInput += '.';
  updateDisplay(currentInput, buildExpression());
}

function handleOperator(op) {
  if (currentInput === '' && previousInput === '') return;

  if (operator && currentInput !== '') {
    const result = calculate(previousInput, currentInput, operator);
    if (result === 'Error') { handleError(); return; }
    previousInput = formatNumber(result);
    currentInput  = '';
  } else if (currentInput !== '') {
    previousInput = currentInput;
    currentInput  = '';
  }

  operator      = op;
  justEvaluated = false;
  updateDisplay(previousInput, buildExpression());
}

function handleEqual() {
  if (operator === null || currentInput === '') return;

  const expr     = buildExpression(true);
  const result   = calculate(previousInput, currentInput, operator);

  if (result === 'Error') { handleError(); return; }

  const formatted = formatNumber(result);
  updateDisplay(formatted, expr + ' =');
  popResult();

   currentInput  = formatted;
  previousInput = '';
  operator      = null;
  justEvaluated = true;
}

function handleClear() {
  currentInput  = '';
  previousInput = '';
  operator      = null;
  justEvaluated = false;
  updateDisplay('0', '');
}

function handleDelete() {
  if (justEvaluated) { handleClear(); return; }
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput || '0', buildExpression());
}

function handleError() {
  updateDisplay('Error', '');
  popResult();
  currentInput  = '';
  previousInput = '';
  operator      = null;
  justEvaluated = false;
}

function buildExpression(includeRight = false) {
  if (!previousInput && !operator) return '';
  let expr = previousInput || '';
  if (operator) {
    expr += ` ${operator}`;
    if (includeRight && currentInput) expr += ` ${currentInput}`;
    else if (currentInput)            expr += ` ${currentInput}`;
  }
  return expr;
}

document.querySelector('.btn-grid').addEventListener('click', (e) => {
  const btn = e.target.closest('.btn');
  if (!btn) return;

  const action = btn.dataset.action;
  const value  = btn.dataset.value;

  switch (action) {
    case 'num':    handleNumber(value); break;
    case 'dot':    handleDot();         break;
    case 'op':     handleOperator(value); break;
    case 'equal':  handleEqual();       break;
    case 'clear':  handleClear();       break;
    case 'delete': handleDelete();      break;
  }

  btn.classList.add('pressed');
  setTimeout(() => btn.classList.remove('pressed'), 150);
});

document.addEventListener('keydown', (e) => {
  const key = e.key;

  let selector = null;

  if (key >= '0' && key <= '9') {
    handleNumber(key);
    selector = `[data-action="num"][data-value="${key}"]`;

  } else if (key === '.') {
    handleDot();
    selector = `[data-action="dot"]`;

  } else if (key === '+') {
    handleOperator('+');
    selector = `[data-value="+"]`;

  } else if (key === '-') {
    handleOperator('-');
    selector = `[data-value="-"]`;

  } else if (key === '*') {
    handleOperator('×');
    selector = `[data-value="×"]`;

  } else if (key === '/') {
    e.preventDefault();
    handleOperator('÷');
    selector = `[data-value="÷"]`;

  } else if (key === '%') {
    handleOperator('%');
    selector = `[data-value="%"]`;

  } else if (key === 'Enter' || key === '=') {
    handleEqual();
    selector = `[data-action="equal"]`;

  } else if (key === 'Escape' || key === 'c' || key === 'C') {
    handleClear();
    selector = `[data-action="clear"]`;

  } else if (key === 'Backspace') {
    handleDelete();
    selector = `[data-action="delete"]`;
  }

  if (selector) {
    const btn = document.querySelector(selector);
    if (btn) {
      btn.classList.add('pressed');
      setTimeout(() => btn.classList.remove('pressed'), 150);
    }
  }
});

updateDisplay('0', '');