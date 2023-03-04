import { ShareService } from '../sharedservice';
import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medicalsupply',
  templateUrl: './medicalsupply.component.html',
  styleUrls: ['./medicalsupply.component.css']
})
export class MedicalSupplyComponent implements OnInit {

  _id : string | null = null
  id : string | null = null
  name : string | null = null
  remark : string | null = null
  cost_price : number | null = null
  sale_price : number | null = null

  med_supplies :any = [] 
  med_supply = {
    id :null,
    name :null,
    remark :null,
    cost_price :null,
    sale_price :null,
    _id: null
  }

  constructor( private http: HttpClient, private shareService:ShareService ) { }

  ngOnInit(): void {
    this.loadSupply();
  }
  
  saveSupply(){
    let params = {
      id : this.id,
      name : this.name,
      remark : this.remark,
      cost_price : this.cost_price,
      sale_price : this.sale_price,
      _id : this._id
    }
    console.log(params);
    if(confirm("save")){
      let path = ""
      this._id == null? path = "/saveSupply": path = "/updateSupply"
      this.http.post(this.shareService.serverPath+path,params).subscribe((res: any)=>{
        console.log(res)
        alert(path.split("Supply")[0])
        this.med_supply = {
            id :null,
            name :null,
            remark :null,
            cost_price :null,
            sale_price :null,
            _id: null
        }

      })
      this._id  = null
      this.id  = null
      this.name  = null
      this.remark  = null
      this.cost_price  = null
      this.sale_price  = null
      this.loadSupply()
    }
  }

  loadSupply(){
    this.http.get(this.shareService.serverPath+"/getSupply").subscribe((res:any)=>{
      console.log(res);
      this.med_supplies = res;
    })
  }

  deleteSupply(med_supply: any){
    this.med_supply=med_supply
    console.log("Delete this",this.med_supply)
    if(confirm("Delete?")){
      this.http.post(this.shareService.serverPath+"/deleteSupply",this.med_supply).subscribe((res:any)=>{
        alert("Deleted")
        this.loadSupply()
      })
      
    }
  }

  infoSupply(med_supply: any){
    this.id = med_supply.id;
    this.name = med_supply.name;
    this.remark = med_supply.remark;
    this.cost_price = med_supply.cost_price;
    this.sale_price = med_supply.sale_price;
    this._id = med_supply._id;
    console.log(this._id);
    
  }
}
