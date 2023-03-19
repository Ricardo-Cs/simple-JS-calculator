const numberButtons = document.querySelectorAll("[data-number]"); //Utiliza os colchetes para selecionar os operadores do HTML dentro da tag
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equal]");
const delButton = document.querySelector("[data-delete]");
const allclearButton = document.querySelector("[data-all-clear]");
const prevOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");

class Calculator {
  constructor(prevOperandText, currentOperandText) {
    this.prevOperandText = prevOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }
  formatDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  //Função do botão delete(tira o último número do display)
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  //Função que faz o calculo
  calculate() {
    let result;
    const _prevOperandFloat = parseFloat(this.prevOperand);
    const _currentOperandFloat = parseFloat(this.currentOperand);
    if (isNaN(_prevOperandFloat) || isNaN(_currentOperandFloat)) return;

    switch (this.operation) {
      case "+":
        result = _prevOperandFloat + _currentOperandFloat;
        break;
      case "-":
        result = _prevOperandFloat - _currentOperandFloat;
        break;
      case "*":
        result = _prevOperandFloat * _currentOperandFloat;
        break;
      case "÷":
        result = _prevOperandFloat / _currentOperandFloat;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.prevOperand = "";
  }

  //função para a operação digitada(tudo que está no current vai para o previous)
  chooseOperation(operation) {
    if (this.currentOperand == "") return;
    if (this.prevOperand != "") {
      this.calculate();
    }
    this.operation = operation;
    this.prevOperand = this.currentOperand;
    this.currentOperand = "";
  }
  //função para o número digitado(com verificação para não haver mais de um ponto)
  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return;
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  //Função para limpar o display
  clear() {
    this.prevOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }
  //atualizar o display
  updateDisplay() {
    this.prevOperandText.innerText = `${this.formatDisplayNumber(
      this.prevOperand
    )} ${this.operation || ""}`;
    this.currentOperandText.innerText = this.formatDisplayNumber(
      this.currentOperand
    );
  }
}

const calculator = new Calculator(prevOperandText, currentOperandText);

//Chamando todas as funções
for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}

allclearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

delButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
