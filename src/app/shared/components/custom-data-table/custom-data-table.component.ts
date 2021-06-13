import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataTableColumn } from '../../models/components/custom-data-table/data-table-column.model';

@Component({
  selector: 'app-custom-data-table',
  templateUrl: './custom-data-table.component.html',
  styleUrls: ['./custom-data-table.component.scss']
})
export class CustomDataTableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @Input()
  public columns: DataTableColumn[] = [];
  @Input()
  public data: any[] = [];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  
  public paginatorSizeOptions: number[] = [10, 15, 20, 25, 30, 35, 40, 45, 50];
  public tableHeaders: string[] = [];
  @Input()
  public dateFormat: string = 'MM/dd/yyyy';
  constructor() { } 


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue != changes.data.previousValue) {
      this.setDataSource(changes.data.currentValue);
      
    }
    if (changes.columns && changes.columns.currentValue != changes.columns.previousValue) {
      this.setHeaders();
    }

  }  
  ngOnInit(): void {
    this.setHeaders();
    this.setDataSource(this.data);
  }
  private setHeaders(): void {
    this.tableHeaders = this.columns.map(c => c.prop);
  }
  private setDataSource(data: any[]) {
    this.dataSource = new MatTableDataSource<any>(this.data);
    if (this.paginator) {
      this.paginator.length = this.data.length;
      this.dataSource.paginator = this.paginator;
    }
  }
}
