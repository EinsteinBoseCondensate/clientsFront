import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataTableColumn } from '../../models/components/custom-data-table/data-table-column.model';

@Component({
  selector: 'app-custom-data-table-server-paged',
  templateUrl: './custom-data-table-server-paged.component.html',
  styleUrls: ['./custom-data-table-server-paged.component.scss']
})
export class CustomDataTableServerPagedComponent implements OnInit, AfterViewInit {
  @Input()
  public pageSize = 10;
  public pageIndex = 0;
  @Input()
  public length = 0;
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
  @Output()
  public pageChanged: EventEmitter<{ skip: number, take: number }> = new EventEmitter<{ skip: number, take: number }>();
  @Input()
  public isLoading: boolean = false;
  constructor() { }
  ngAfterViewInit(): void {    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue != changes.data.previousValue) {
      this.setDataSource(changes.data.currentValue);
    }
    if (changes.columns && changes.columns.currentValue != changes.columns.previousValue) {
      this.setHeaders();
    }
    if (changes.length && changes.length.currentValue != changes.legth.previousValue) {
      this.paginator.length
      this.dataSource.paginator = this.paginator;
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
    this.dataSource.data = this.data;
  }
  public getServerData(event?: PageEvent) {
    this.dataSource.paginator = null;
    this.pageIndex = event?.pageIndex ?? this.pageIndex;
    this.pageSize = event?.pageSize ?? this.pageSize;
    event ? this.pageChanged.emit({ skip: event.pageIndex, take: event.pageSize }) : undefined;
  }

}
