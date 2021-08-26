import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateMessageService {

  constructor() {
  }

  getMessage() {
    return {
      productCode: [
        {'type': 'required', msg: 'Not empty'},
        {'type': 'pattern', msg: 'Code customer must format SP-XXXX'}
      ],
      category: [
        {'type': 'required', msg: 'Not empty'}
      ],
      productName: [
        {'type': 'required', msg: 'Not empty'}
      ],
      priceProduct: [
        {'type': 'required', msg: 'Not empty'}
      ],
      producerProduct: [
        {'type': 'required', msg: 'Not empty'}
      ],
      quantityProduct: [
        {'type': 'required', msg: 'Not empty'},
        {'type': 'pattern', msg: 'Input must format number'},
        {'type': 'min', msg: 'Input must great 0'},
      ],
      importDateProduct: [
        {'type': 'required', msg: 'Not empty'},
       // {'type': 'pattern', msg: 'Date must format date dd/MM/yyyy'},
      ],
      exportDateProduct: [
        {'type': 'required', msg: 'Not empty'},
        //{'type': 'pattern', msg: 'Date must format date dd/MM/yyy'},
       {'type': 'validDate', msg: 'End date must great start date'},
      ],

    }
  }
}
