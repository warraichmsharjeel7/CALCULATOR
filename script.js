var displayValue = document.getElementById("displayValue");

function appendValue(value) {
  displayValue.value += value;
}

function number(val) {
  appendValue(val);
}

function operator(op) {
  var current = displayValue.value;
  var lastChar = current.slice(-1);

  if (!current && op !== "%") {
    return;
  }

  if (["+", "-", "*", "/", "%"].includes(lastChar)) {
    displayValue.value = current.slice(0, -1) + op;
  } else {
    appendValue(op);
  }
}

function decimalPoint() {
  var current = displayValue.value;
  if (!current || /[+\-*/%]$/.test(current)) {
    appendValue("0.");
    return;
  }

  var tokens = current.split(/[+\-*/%]/);
  var lastToken = tokens[tokens.length - 1];
  if (!lastToken.includes(".")) {
    appendValue(".");
  }
}

function clearBtn() {
  displayValue.value = "";
}

function deleteBtn() {
  displayValue.value = displayValue.value.slice(0, -1);
}

function calculate() {
  var expression = displayValue.value;
  if (!expression) {
    return;
  }

  expression = expression.replace(/%/g, "/100");

  try {
    var result = eval(expression);
    displayValue.value = result;
  } catch (err) {
    displayValue.value = "Error";
    setTimeout(function () {
      displayValue.value = "";
    }, 1000);
  }
}