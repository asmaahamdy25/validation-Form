import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
  export class DeliveryService {
      constructor ( private http: HttpClient){}

    addNewDelivery(obj){
       return this.http.post(`https://developetests.com/api/saveAddress` ,obj);
    }


  }