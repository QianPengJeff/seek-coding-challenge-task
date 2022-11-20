import { IPricingRule } from './../interfaces/ipricingrule';
import { Injectable, Output } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  pricingRules: IPricingRule[];
  cart: IProduct[] = [];
  customerName: string = "";

  constructor() { }

  //get and assign pricingRule to local variable
  public newPricingRule(pricingRules: IPricingRule[]) {
    this.pricingRules = pricingRules;
  }

  //set Customer Name
  public setCustomerName(name: string) {
    this.customerName = name;
  }

  //add item
  public add(item: IProduct) {
    this.cart.push(item);
    return this.cart;
  }

  //remove item
  public remove(item: IProduct) {
    const index = this.cart.indexOf(item, 0);
      if (index > -1) {
          this.cart.splice(index, 1);
      }
      return this.cart;
  }

  //Calculate fixed price deals price
  private calculateFixedPriceDealsPrice(pricingRule: IPricingRule, cart: IProduct[]) {
    let totalPrice = 0;
    if(pricingRule.fixedPriceDeals.length > 0) {
      pricingRule.fixedPriceDeals.forEach(item => {
        let productName = item.productName.toLowerCase().replace(/\s/g, "");        
        let itemAmount = cart.filter(x => x.name.toLowerCase().replace(/\s/g, "") == productName).length;    
        if(itemAmount > 0){
          totalPrice += item.dsicountedPrice * itemAmount;
        }
      });
    }
    return totalPrice;
  }

  //Calculate special deals price
  private calculateSpecialDealsPrice(pricingRule: IPricingRule, cart: IProduct[]) {
    let totalPrice = 0;
    if(pricingRule.specialDeals.length > 0) {
      pricingRule.specialDeals.forEach(item => {
        let productName = item.productName.toLowerCase().replace(/\s/g, "");        
        let itemAmount = cart.filter(x => x.name.toLowerCase().replace(/\s/g, "") == productName).length;    
        if(itemAmount > 0){
          let itemPrice = cart.find(x => x.name.toLowerCase().replace(/\s/g, "") == productName).price;
          if(itemAmount - 1 == item.paidItems) {
            totalPrice += item.paidItems * itemPrice;
          }else{
            totalPrice += itemAmount * itemPrice;
          }
        }
      });
    }
    return totalPrice;
  }

  //get nonDiscounted items
  private getNonDiscountedItems(pricingRule: IPricingRule, cart: IProduct[]) {
    let nonDiscountedItems: IProduct[] = [];
    let DiscountedItemNames: string[] = [];
      //specialDeals
      if(pricingRule.specialDeals.length > 0) {
        pricingRule.specialDeals.forEach(item => {
          DiscountedItemNames.push(item.productName.toLowerCase().replace(/\s/g, ""));
        });
      }
      //fixedPriceDeals
      if(pricingRule.fixedPriceDeals.length > 0) {
        pricingRule.fixedPriceDeals.forEach(item => {
          DiscountedItemNames.push(item.productName.toLowerCase().replace(/\s/g, ""));
        });
      }

      if(DiscountedItemNames.length > 0){
        nonDiscountedItems = cart.filter(item => !DiscountedItemNames.includes(item.name.toLowerCase().replace(/\s/g, "")));
      }
      return nonDiscountedItems;
  }

  //checkout and return total price
  public checkOut() {
    let pricingRule  = this.pricingRules.find(x => x.customerName === this.customerName);
    let totalPrice = 0;
    if(pricingRule) {
      let nonDiscountedItems: IProduct[] = this.getNonDiscountedItems(pricingRule, this.cart);

      if(pricingRule.specialDeals.length > 0) {
        totalPrice += this.calculateSpecialDealsPrice(pricingRule, this.cart);
      }
      
      if(pricingRule.fixedPriceDeals.length > 0) {
        totalPrice += this.calculateFixedPriceDealsPrice(pricingRule, this.cart);
      }

      if(nonDiscountedItems.length > 0) {
        nonDiscountedItems.forEach(item => {
          totalPrice += item.price;
        })
      }
    } else {
      //for non-privileged customers 
      this.cart.forEach(item => {
        totalPrice += item.price;
      })
    }

    return totalPrice;
  }
}
