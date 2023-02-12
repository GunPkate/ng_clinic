import { Customer } from './../interface/customer';
import { ShareService } from './../sharedservice';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  code:   String| undefined = "x00"
  name:   String| undefined = "xxx"
  email:  String| undefined = "@mail.com"
  tel:    String| undefined = "0832221111"
  lineId: String| undefined  
  address: String| undefined ="BKK"
  _id: string | undefined | null = null

  customer: Customer[] = [] 

  constructor(
    private http:HttpClient,
    private  shareService:ShareService
  ) { }

  ngOnInit(): void {
    this.laod()
  }

  save(){
    if(confirm("Register Customer?")){
      let params = {
        code : this.code,
        name : this.name,
        email : this.email,
        tel : this.tel,
        lineId : this.lineId,
        address : this.address,
        _id: this._id
      }
  
      let path = ""
      let pathSave = this.shareService.serverPath+"/customerSave"
      let pathUpdate = this.shareService.serverPath+"/customerUpdate"
      this._id == null?path = pathSave: path = pathUpdate
      this.http.post(path,params).subscribe((res:any)=>{alert(path)})
      this.laod()
    }
  }

  laod(){
    let path = this.shareService.serverPath+"/customerGet"
    this.http.get(path).subscribe((res:any)=>{
      console.log("customer",res);
      this.customer = res
    })
    this._id = null;
  }

  customerDelete(cusItem: Customer){
    if(confirm(`delete ${cusItem.code} ${cusItem.name} ${cusItem}?`)){
      let path = this.shareService.serverPath+"/customerDelete"
      this.http.post(path,cusItem).subscribe((res:any)=>{
        console.log("customer",res);
      })
    }
    this.laod()
  }

  getCustomerInfo(item: Customer){
    this.code   = item.code
    this.name   = item.name
    this.email  = item.email
    this.tel    = item.tel
    this.lineId   = item.lineId
    this.address    = item.address
    this._id = item._id;
  }
}
