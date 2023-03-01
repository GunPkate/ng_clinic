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
  pets: any
  pet : any = {
    _id: null,
    customer_id: null ,
    name: null,
    remark: null
  }
  symptom :any = {
    symptom: "input sickness"
  }
  checkUp :any = {}
  medicalSupplies: any

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
    this.loadPet();
  }

  choosePet(pet: Customer){
    this.pet = pet;
    // this.loadPet();
    console.log(pet);
    this.loadMedicalCheckUp()
  }

  loadPet(){
    let path = this.shareService.serverPath+"/petOfCustomer"
    this.http.post(path,this.customer).subscribe((res:any)=>{this.pets = res; console.log(res)})
  }

  saveSymptom(){
    console.log(this.symptom);
    let params = {
      symptom :this.symptom ,
      pet: this.pet
    }
    this.http.post(this.shareService.serverPath+"/symptom",params).subscribe((res:any)=>{console.log(res)})
    this.loadMedicalCheckUp()
    alert("Symptom Saved")
    this.symptom = {}
  }

  loadMedicalCheckUp(){
    let params = {
      pet_id: this.pet._id
    }
    this.http.post(this.shareService.serverPath+"/petCheckUp",params).subscribe((res:any)=>{
      console.log("checkUp",res)
      this.checkUp = res
    })
  }

  removeSymptom(symptom: any){
    if(confirm("Delete symptom")){
      let params = {
        _id: symptom._id
      }
      this.http.post(this.shareService.serverPath+"/deleteSymptom",params).subscribe((res:any)=>{})
      this.loadMedicalCheckUp()
    }
  }

  updateSymtom(symptom: any){
    this.symptom = symptom
    console.log(symptom)
    console.log(this.symptom)
  }

  
  getMedicalSupply(){
    this.http.get(this.shareService.serverPath+"/getSupply").subscribe((res:any)=>{
      this.medicalSupplies = res;
      console.log(res);
    })
  }
}
