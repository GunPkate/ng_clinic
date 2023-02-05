import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {

  name: string = "gp003"
  tel: string | undefined 
  tax: string | undefined 
  address: string | undefined 

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.loadInfo()
  }

  save(){
    var params = {
      name: this.name,
      tel: this.tel,
      tax: this.tax,
      address: this.address
    }
    
    this.http.post('http://localhost:3000/clinicSave',params).subscribe((res:any)=>{console.log(res.data);
    })
  }

  loadInfo(){
    this.http.get('http://localhost:3000/getInfo').subscribe((res:any)=>
    {
      this.name = res.name,
      this.tel  = res.tel,
      this.tax  = res.tax,
      this.address = res.address
      console.log("here",res)
      console.log("here",this.name,res.name)
    })
  }
}
