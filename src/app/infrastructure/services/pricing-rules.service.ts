import { Injectable } from '@angular/core';
import PricingRules from '../../../assets/pricingRules.json';

@Injectable({
  providedIn: 'root'
})
export class PricingRulesService {

  constructor() { }

  getPricingRules() {
    return PricingRules;
  }
}
