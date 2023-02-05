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

  customer: Customer[] = [] 

  constructor(
    private http:HttpClient,
    private  shareService:ShareService
  ) { }

  ngOnInit(): void {
    this.laod()
  }

  save(){
    if(confirm("Save Customer?")){
      let params = {
        code : this.code,
        name : this.name,
        email : this.email,
        tel : this.tel,
        lineId : this.lineId,
        address : this.address
      }
  
      let path = this.shareService.serverPath+"/customerSave"
      this.http.post(path,params).subscribe((res:any)=>{alert("save successful")})
    }
  }

  laod(){
    let path = this.shareService.serverPath+"/customerGet"
    this.http.get(path).subscribe((res:any)=>{
      console.log("customer",res);
      this.customer = res
    })
  }
}
