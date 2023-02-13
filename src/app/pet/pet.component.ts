import { ShareService } from './../sharedservice';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {

  customers: any
  customer : any = {
    name: null,
    code: null,
    _id: null
  }
  pets: any
  pet:  any = {
    customer_id: null,
    name: null,
    remark: null
  }

  constructor(private http:HttpClient, private shareService: ShareService) { }

  ngOnInit(): void {
    this.loadData()
    this.loadPetData()
  }

  loadData(){
    this.http.get(this.shareService.serverPath+"/customerGet").subscribe((res:any)=>{
      this.customers = res;
    })
  }
  chooseCustomer(customer: any){
    this.customer = customer;
    console.log(customer)
  }
  save(){
    this.pet.customer_id = this.customer._id
    console.log(this.pet)
    this.http.post(this.shareService.serverPath+"/petSave",this.pet).subscribe((res:any)=>{})
    this.loadPetData()
  }

  loadPetData(){
    this.http.get(this.shareService.serverPath+"/petAll").subscribe((res:any)=>{this.pets=res; console.log(this.pets);
    })
  }
}
