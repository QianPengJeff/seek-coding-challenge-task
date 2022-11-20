import { Injectable,EventEmitter,Output } from '@angular/core';
import Products from '../../../assets/products.json';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor() { }

  getProducts() {
    return Products;
  }
}
