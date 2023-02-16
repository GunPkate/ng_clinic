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
    this.http.post(this.shareService.serverPath+"/petSaveUpdate",this.pet).subscribe((res:any)=>{})
    this.loadPetData()
    this.pet = {
      customer_id: null,
      name: null,
      remark: null
    }
  }

  loadPetData(){
    this.http.get(this.shareService.serverPath+"/petAll").subscribe((res:any)=>{this.pets=res; console.log(this.pets);
    })
  }

  deletePet(pet: any){
    this.pet=pet
    console.log("Delete this",this.pet)
    if(confirm("Delete?")){
      this.http.post(this.shareService.serverPath+"/petDelete",this.pet).subscribe((res:any)=>{})
      this.loadPetData()
    }
  }

  editPet(item: any){
    this.customer = item.customer[0]
    this.pet = item
  }
}
