
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
  public pageSettings = { pageSize: 10, pageIndex: 0 };
  @Output()
  public pageSettingsChanged: EventEmitter<{ skip: number, take: number }> = new EventEmitter<{ skip: number, take: number }>();

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
    this.pageSettings.pageIndex = event?.pageIndex ?? this.pageSettings.pageIndex;
    this.pageSettings.pageSize = event?.pageSize ?? this.pageSettings.pageSize;
    event ? this.pageSettingsChanged.emit({ skip: event.pageIndex, take: event.pageSize }) : undefined;
  }

}
