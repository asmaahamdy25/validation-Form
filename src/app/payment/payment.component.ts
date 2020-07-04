import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  isGift = false;
  addGify = false;
  shippingMethod = '1';
  giftReceipt = false;
  @Output() changeTab = new EventEmitter<number>();


  constructor() { }

  ngOnInit() {
  }

  changeCurrentTab(index){
    this.changeTab.emit(index)
  }

  resetValue(){
    if(!this.isGift) {
      this.addGify = false;
      this.giftReceipt = false;
    }
  }

  reset(){
    this.isGift = false;
    this.addGify = false;
    this.shippingMethod = '1';
    this.giftReceipt = false;
  }

}
