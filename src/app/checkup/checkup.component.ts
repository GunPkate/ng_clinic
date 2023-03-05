import { ShareService } from './../sharedservice';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../interface/customer';
declare function closeModal(): any;

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
  checkUps :any = {}
  medicalSupplies: any
  prescription:any = {
    // prescription: null,
    _id: null,
    qty: null,
    remark: null,
    medicalSupply_id: null,
    symptom_id: null
  } 

  _id: string | undefined | null = null
  checkUpHistories: any

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
    let params = {
      symptom :this.symptom.symptom ,
      pet: this.pet
    }
    console.log("save Params",params);
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
      this.checkUps = res
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

  
  getMedicalSupply(symptom: any){
    this.prescription.symptom_id = symptom._id
    this.http.get(this.shareService.serverPath+"/getSupply").subscribe((res:any)=>{
      this.medicalSupplies = res;
      console.log(res);
    })
  }

  getPrescription(item: any){
    // this.prescription.prescription= item.
    this.prescription.medicalSupply_id = item._id
    // this.prescription.qty = item.qty
    // this.prescription.remark= item.remark
    console.log("get prescription",this.prescription)
    console.log("get item",item)
  }

  savePrescription(){
    if(confirm("save prescription")){
    let params = {
      medicalSupply_id: this.prescription.medicalSupply_id,
      qty: this.prescription.qty,
      remark: this.prescription.remark,
      symptom_id: this.prescription.symptom_id
    }
    this.http.post(this.shareService.serverPath+"/savePrescription",params).subscribe((res:any)=>{console.log(res)})
    // alert("Symptom Saved")
    closeModal()
    }
  }

  getHistory(checkUp: any){
    console.log(checkUp);
    this.http.post(this.shareService.serverPath+"/getHistory",checkUp).subscribe((res: any)=>{console.log("get medical History",this.checkUpHistories = res);})
  }

  removeHistory(checkUp: any){
    if(confirm("delete?")){ 
      this.http.post(this.shareService.serverPath+"/deleteHistory",checkUp).subscribe((res: any)=>{})
      this.getHistory(checkUp);
    }
  }

  editData(item: any){
    this.prescription = item
  }
}
