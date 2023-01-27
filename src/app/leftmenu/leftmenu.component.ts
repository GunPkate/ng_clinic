import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  dashboard(): void {
    this.router.navigate(['']);
  }

  clinic(): void {
    this.router.navigate(['clinic']);
  }

  customer(): void {
    this.router.navigate(['customer']);
  }

  pet(): void {
    this.router.navigate(['pet']);
  }

  treatment(): void {
    this.router.navigate(['treatment']);
  }

  checkup(): void {
    this.router.navigate(['checkup']);
  }

  report(): void {
    this.router.navigate(['report'])
  }

}
