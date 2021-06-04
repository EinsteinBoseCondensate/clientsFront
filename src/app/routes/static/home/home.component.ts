import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public items: any[] = '............................................................'.split('.');
  
  public input: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  public toggleBool(element: any){
    this.input = !this.input;
    
  }
}
