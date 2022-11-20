import { Component } from '@angular/core';
import { IProduct } from './infrastructure/interfaces/iproduct';
import { PricingRulesService } from './infrastructure/services/pricing-rules.service';
import { ProductsService } from './infrastructure/services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'seek-coding-challenge-task';
  products: IProduct[];
  cart: IProduct[] = [];
  totalPrice: number = 0;

  constructor( private _productsService: ProductsService, 
    private _pricingRulesService: PricingRulesService) 
  {
    this.products = this._productsService.getProducts();
    console.log(this._pricingRulesService.getPricingRules());
  }

  addItem(item: IProduct) {
    this.cart.push(item);
    console.log("added");
  }

  removeItem(item: IProduct) {
    const index = this.cart.indexOf(item, 0);
      if (index > -1) {
          this.cart.splice(index, 1);
      }
    console.log("removed");
  }

  getQuantity(name: string){
    if (!this.cart ) {return 0; }; 
    let item = this.cart.filter(x => x.name == name);
    return item ? item.length:  0;
  }

  customerNameInput(name: string): void {  
    console.log("name")
  }

  checkOut() {
    console.log("checkout");
  }
}
