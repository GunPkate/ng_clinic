import { ShareService } from './../sharedservice';
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
  _id: string | undefined

  constructor(
    private http:HttpClient,
    private shareService:ShareService
  ) { }

  ngOnInit(): void {
    this.loadInfo()
  }

  save(){
    try {
      var params = {
        name: this.name,
        tel: this.tel,
        tax: this.tax,
        address: this.address,
        _id: this._id
      }
  
      let path = ""
      this._id ? path=this.shareService.serverPath+'/clinicUpdate':path=this.shareService.serverPath+'/clinicSave'
      this.http.post(path,params).subscribe((res:any)=>{console.log(res.data); alert(path)})
    }
    catch (error: any) {
      alert(error)
    }
  }


  loadInfo(){
    this.http.get(this.shareService.serverPath+'/getInfo').subscribe((res:any)=>
    {
      this.name = res.name,
      this.tel  = res.tel,
      this.tax  = res.tax,
      this.address = res.address
      this._id = res._id
      console.log("here",res)
      console.log("here",this.name,res.name)
    })
  }
}
