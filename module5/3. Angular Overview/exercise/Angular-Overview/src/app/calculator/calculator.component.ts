import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  public firstOperand = 0;
  public secondOperand = 0;
  public operator = '+';
  public result;


  constructor() {
  }

  ngOnInit(): void {
  }

  calculate() {
    switch (this.operator) {
      case '+':
        this.result = this.firstOperand + this.secondOperand;
        break;
      case '-':
        this.result = this.firstOperand + this.secondOperand;
        break;
      case '*':
        this.result = this.firstOperand * this.secondOperand;
        break;
      case '/':
        if (this.secondOperand === 0) {
          this.result = 'Can not be divided by zero';
        } else {
          this.result = this.firstOperand / this.secondOperand;
        }
        break;

    }
  }
}
