import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DeliveryService } from 'src/services/delivery.service';
import { Delivery } from 'src/Models/delivery';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  deliveryForm: FormGroup;
  shippingForm: FormGroup;
  emailForm: FormGroup;
  submitted = true;
  sameAddress = true;
  newAccount = 'new';
  passwordPattern = "(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[$@$!%*?&])[A-Za-z $@$!%*?&]{8,}";
  error = false;
  notMatch: boolean = false;
  @Output() activeTabs = new EventEmitter<boolean>();
  @Output() changeTab = new EventEmitter<number>();
  constructor(private delivaryService: DeliveryService) { }

  ngOnInit() {
    this.deliveryForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      addressOne: new FormControl('', Validators.required),
      addressSecond: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required)
    });

    this.shippingForm = new FormGroup({
      firstName2: new FormControl('', Validators.required),
      lastName2: new FormControl('', Validators.required),
      addressOne2: new FormControl('', Validators.required),
      addressSecond2: new FormControl('', Validators.required),
      city2: new FormControl('', Validators.required),
      status2: new FormControl('', Validators.required),
      country2: new FormControl('', Validators.required),
      postalCode2: new FormControl('', Validators.required),

    });
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',
        [Validators.required, Validators.pattern(this.passwordPattern)]),
      confirmPassword: new FormControl('', [Validators.required])

    });

  }

  get f() { return this.deliveryForm.controls }
  get sh() { return this.shippingForm.controls }
  get e() { return this.emailForm.controls }

  onSubmit() {
    let delivery: Delivery = new Delivery();
    if (this.checkFormValid()) {
      delivery.first_name = this.deliveryForm.value.firstName;
      delivery.last_name = this.deliveryForm.value.lastName;
      delivery.postal_code = this.deliveryForm.value.postalCode;
      delivery.state = this.deliveryForm.value.status;
      delivery.is_same_address = this.sameAddress ? 1 : 0;
      delivery.address_1 = this.deliveryForm.value.addressOne;
      delivery.address_2 = this.deliveryForm.value.addressSecond;
      delivery.city = this.deliveryForm.value.city;
      delivery.country = this.deliveryForm.value.country;
      delivery.email = this.emailForm.value.email;
      delivery.is_new_account = this.newAccount === 'new' ? 1 : 0;
      if (delivery.is_same_address === 1) {
        delivery['shipping_address_1'] = this.shippingForm.value.addressOne2;
        delivery['shipping_address_2'] = this.shippingForm.value.addressSecond2;
        delivery['shipping_city'] = this.shippingForm.value.city2;
        delivery['shipping_country'] = this.shippingForm.value.country2
        delivery['shipping_first_name'] = this.shippingForm.value.firstName2;
        delivery['shipping_last_name'] = this.shippingForm.value.lastName2;
        delivery['shipping_postal_code '] = this.shippingForm.value.postalCode2;
        delivery['shipping_state'] = this.shippingForm.value.status2;

      }
      if (delivery.is_new_account === 1) {
        if (this.emailForm.value.password === this.emailForm.value.password_confirmation) {
          delivery['password'] = this.emailForm.value.password;
          delivery['password_confirmation'] = this.emailForm.value.password_confirmation;
        } else {
          this.notMatch = true
        }
      }

      this.delivaryService.addNewDelivery(delivery).subscribe(result => {
        this.activeTabs.emit(false);
        this.changeTab.emit(1)

      })

    } else {
      this.error = true;
    }
  }

  reset() {
    this.deliveryForm.reset();
    this.shippingForm.reset();
    this.emailForm.reset();

  }

  checkFormValid() {
    if (this.sameAddress && this.newAccount === 'old') {
      return this.deliveryForm.valid && this.e.email.valid;
    } else if (this.sameAddress && this.newAccount === 'new') {
      return this.deliveryForm.valid && this.emailForm.valid
    } else if (!this.sameAddress && this.newAccount === 'old') {
      return this.deliveryForm.valid && this.e.email.valid && this.shippingForm.valid;
    } else {
      return this.deliveryForm.valid && this.emailForm.valid && this.shippingForm.valid;
    }

  }

  resetShippingForm() {
    if (this.sameAddress) {
      this.shippingForm.reset()
    }
  }

  resetPassword() {
    if (this.newAccount === 'old') {
      this.e.password.reset();
      this.e.confirmPassword.reset()
    }
  }

}
