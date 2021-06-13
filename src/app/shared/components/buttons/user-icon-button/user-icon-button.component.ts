import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-icon-button',
  templateUrl: './user-icon-button.component.html',
  styleUrls: ['./user-icon-button.component.scss']
})
export class UserIconButtonComponent implements OnInit {
  @Input()
  public title: string = "Submit";
  @Input()
  public isLoading: boolean = false;
  @Output()
  public click: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  public onSubmit(): void {
    this.click.emit();
  }
}
