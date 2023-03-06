import { ShareService } from './../sharedservice';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  // search = {
  //   from: null,
  //   to: Date.now().toLocaleString()
  // }
  search = { from: "2023-03-01", to: "2023-03-06" }
  reports : any = {}
  totalPrice : number = 0

  constructor(private http:HttpClient, private shareService:ShareService) { }

  ngOnInit(): void {
  }

  showReport(){
    let sum = 0;
    this.http.post(this.shareService.serverPath+"/getReport",this.search).subscribe((res)=>{this.reports = res})
    console.log(this.reports);
    for(let i =0; i < this.reports.length; i++){
      this.reports[i].price? sum += this.reports[i].price : sum += 0;
      console.log(i,this.reports[i].price)
    }
    this.totalPrice = sum
  }

}
