import { Component } from '@angular/core';
import { IProduct } from './infrastructure/interfaces/iproduct';
import { CheckOutService } from './infrastructure/services/check-out.service';
import { PricingRulesService } from './infrastructure/services/pricing-rules.service';
import { ProductsService } from './infrastructure/services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  products: IProduct[];
  cart: IProduct[] = [];
  totalPrice: number = 0;

  constructor(private _checkOutService: CheckOutService, 
    private _productsService: ProductsService, 
    private _pricingRulesService: PricingRulesService) 
  {
    this.products = this._productsService.getProducts();
    _checkOutService.newPricingRule(this._pricingRulesService.getPricingRules());
  }

  addItem(item: IProduct) {
    this.cart = this._checkOutService.add(item);
  }

  removeItem(item: IProduct) {
    this.cart = this._checkOutService.remove(item);
  }

  getQuantity(name: string){
    if (!this.cart ) {return 0; }; 
    let item = this.cart.filter(x => x.name == name);
    return item ? item.length:  0;
  }

  customerNameInput(name: string): void {  
    this._checkOutService.setCustomerName(name);
  }

  checkOut() {
    this.totalPrice = this._checkOutService.checkOut();
  }
}
