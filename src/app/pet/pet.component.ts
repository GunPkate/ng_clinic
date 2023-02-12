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
  constructor(private http:HttpClient, private shareService: ShareService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.http.get(this.shareService.serverPath+"/customerGet").subscribe((res:any)=>{
      this.customers = res
    })
  }

}
