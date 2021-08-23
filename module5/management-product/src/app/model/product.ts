import {Category} from "./category";

export class Product {
  id: number;
  productCode: string;
  productName: string;
  priceProduct: string;
  importDateProduct: string;
  exportDateProduct: string;
  quantityProduct:number;
  producerProduct:string;
  status: string;
  category: Category;
}
