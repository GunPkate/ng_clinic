import { ShareService } from './../sharedservice';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../interface/customer';

@Component({
  selector: 'app-checkup',
  templateUrl: './checkup.component.html',
  styleUrls: ['./checkup.component.css']
})
export class CheckupComponent implements OnInit {

  customers: any
  customer : any = {
    name: null,
    code: null,
    _id: null
  }
  _id: string | undefined | null = null

  constructor(private shareService:ShareService, private http:HttpClient) { }

  ngOnInit(): void {
    this.loadCustomer()
  }

  loadCustomer(){
    let path = this.shareService.serverPath+"/customerGet"
    this.http.get(path).subscribe((res:any)=>{
      console.log("customer",res);
      this.customers = res
    })
    this._id = null;
    console.log(this.customers); 
  }

  chooseCustomer(customer: Customer){
    this.customer = customer;
  }

}
