import { Component, OnInit, Output ,EventEmitter  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  shippingForm: FormGroup;
   @Output() changeTab = new EventEmitter<number>();
     constructor() { }

  ngOnInit() {
    this.shippingForm = new FormGroup ({
      cardNumber: new FormControl('', Validators.required),
      expireDate: new FormControl('', Validators.required),
      cvv: new FormControl('', Validators.required),
    })
  }

  get ship() { return this.shippingForm.controls }

  reset(){
    this.shippingForm.reset()
  }

  changeCurrentTab(index){
    this.changeTab.emit(index)
  }
}
