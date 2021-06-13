import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { CountryFeed } from '../../../shared/models/backend/all.countries.feed';
import { ClientDTO, ClientFilterDTO } from '../../../shared/models/backend/clientDTO.model';
import { CRUDResult, CRUDResults } from '../../../shared/models/backend/crud-result.model';
import { unsubscribeIfValid } from '../../../shared/services/subscriptions.helper';
import { ClientService } from '../../../shared/services/clients.service';
import Swal from 'sweetalert2';
import { SwalFire, SwalFireNoButtons } from 'src/app/shared/services/swal.wrapper';
import { DataTableColumn } from 'src/app/shared/models/components/custom-data-table/data-table-column.model';
import { ColumnType } from 'src/app/shared/models/components/custom-data-table/columns.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public columns: DataTableColumn[] = [
    { prop: 'name', header: 'name', type: ColumnType.Default },
    { prop: 'surname', header: 'surname', type: ColumnType.Default },
    {
      prop: 'gender', header: 'gender', type: ColumnType.ActionsCustom, customCellAction: client => client.gender == 0 ? 'Male' : client.gender == 1 ? 'Female' : client.gender == 2 ? 'Ambiguous' : '-'
    },
    { prop: 'dateOfBirth', header: 'dateOfBirth', type: ColumnType.Date },
    { prop: 'address', header: 'address', type: ColumnType.Default },
    { prop: 'countryId', header: 'country', type: ColumnType.ActionsCustom, customCellAction: client => this.getCountryFromClient(client) },
    { prop: 'postalCode', header: 'postalCode', type: ColumnType.Default },
    { prop: 'actions', header: '', type: ColumnType.Actions, editCellAction: client => this.onClientEdit(client), removeCellAction: client => this.onClientRemove(client.id) }


  ]
  public crudOperation: string = "Create";
  public isCreateOrEditFormLoading: boolean = false;
  public isSearchingFormLoading: boolean = false;
  private crudOperationAndHandler: any = {
    "Create": (dto: ClientDTO) => {
      this.isCreateOrEditFormLoading = true;
      unsubscribeIfValid(this.createSubscription);
      this.createSubscription = this.clientService.createClient(dto)
        .subscribe((result: CRUDResult) => {
          this.isCreateOrEditFormLoading = false;
          if (result.wasOk) {
            this.refreshFilterFormOrSetFromClient();
            SwalFire(
              'User created',
              `User ${dto.name} ${dto.surname} was successfully created`,
              'success')
          } else {
            SwalFire(
              'User was not created',
              `User ${dto.name} ${dto.surname} was not successfully created, try to shorten your fields or check date-of-birth and country mandatory fields, and/or talk to adminstrator`,
              'error'
            )
          }
        },
          error => {
            this.isCreateOrEditFormLoading = false;
            SwalFire(
              'User was not created',
              `There was a communication and/or server error: ${error}`,
              'error'
            )
          });
    },
    "Edit": (dto: ClientDTO) => {
      this.isCreateOrEditFormLoading = true;
      unsubscribeIfValid(this.editSubscription);
      this.editSubscription = this.clientService.editClient(dto)
        .subscribe((result: CRUDResult) => {
          this.isCreateOrEditFormLoading = false;
          if (result.wasOk) {
            this.refreshFilterFormOrSetFromClient();
            this.refreshDataTable([...this.clients.filter(client => client.id != dto.id), dto]);
            this.crudOperation = 'Create';
            SwalFire(
              'User edit',
              `User ${dto.name} ${dto.surname} was successfully edited`,
              'success'
            )
          } else {
            SwalFire(
              'User was not edited',
              `User ${dto.name} ${dto.surname} was not successfully edited, try to shorten your fields and/or talk to adminstrator`,
              'error'
            )
          }

        },
          error => {
            this.isCreateOrEditFormLoading = false;
            SwalFire(
              'User was not created',
              `There was a communication and/or server error: ${error}`,
              'error'
            )
          });
    },
    "Remove": (id: string) => {
      unsubscribeIfValid(this.removeSubscription);
      this.removeSubscription = this.clientService.removeClient(id)
        .subscribe((result: CRUDResult) => {
          if (result.wasOk) {
            this.refreshDataTable(this.clients.filter(client => client.id != id));
            SwalFire(
              'User was removed',
              `User with id: ${id} was successfully removed`,
              'success'
            )
          } else {
            SwalFire(
              'User was not removed',
              `User with id: ${id} was not successfully removed`,
              'error'
            )
          }
        },
          error => {
            SwalFire(
              'Clients couldn\'t be fetched',
              `There was a communication and/or server error: ${error}`,
              'error'
            )
          });
    },
    "Search": (dto: ClientFilterDTO, paged: boolean = false) => {
      this.isSearchingFormLoading = true;
      unsubscribeIfValid(this.getClientsSubscription);
      this.refreshDataTable([]);
      this.getClientsSubscription = this.clientService.getClients(dto)
        .subscribe((result: CRUDResults<ClientDTO>) => {
          this.isSearchingFormLoading = false;
          this.refreshDataTable(paged ? [...this.clients, ...result?.data] : result?.data);
          this.totalClients = result?.count;  
          if (result?.data?.length) {
            SwalFireNoButtons(
              'Clients fetched',
              `Clients successfully fetched`,
              'success',
              1618.0339887
            )
          } else {
            SwalFireNoButtons(
              'No clients fetched',
              `No clients arrived from request`,
              'warning',
              2000
            )
          }
        },
          error => {
            this.isSearchingFormLoading = false;
            SwalFireNoButtons(
              'Clients couldn\'t be fetched',
              `There was a communication and/or server error: ${error}`,
              'error',
              2000
            )
          });
    },
  };
  public countries: CountryFeed[] = [];
  public searchCountries: CountryFeed[] = [];
  public clients: ClientDTO[] = [];
  public getCountriesSubscription: Subscription = new Subscription();
  public getClientsSubscription: Subscription = new Subscription();
  public createSubscription: Subscription = new Subscription();
  public editSubscription: Subscription = new Subscription();
  public removeSubscription: Subscription = new Subscription();
  public filterForm: FormGroup;
  public searchFilterForm: FormGroup;
  private defaultClientDTO: any = {
    'id': 'fakeId',
    'name': "",
    'surname': "",
    'gender': 1000,
    'dateOfBirth': null,
    'address': "",
    'countryId': '',
    'postalCode': ""
  };
  private defaultClientFilterDTO: any = {
    ...this.defaultClientDTO,
    "from": null,
    "to": null,
    "skip": 0,
    "take": 10
  };
  private filterFormKeys = 'id.name.surname.gender.dateOfBirth.address.countryId.postalCode'.split('.');
  public totalClients: number = 0;
  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.filterForm = this.fb.group(this.defaultClientDTO);
    this.searchFilterForm = this.fb.group(this.defaultClientFilterDTO);
  }
  public getCountryFromClient(client: ClientDTO) {
    return this.countries.filter(ct => ct.id == client.countryId).map(ct => ct.code + ' - ' + ct.name)[0]
  }
  ngOnDestroy(): void {
    unsubscribeIfValid(this.getCountriesSubscription);
    unsubscribeIfValid(this.createSubscription);
    unsubscribeIfValid(this.editSubscription);
    unsubscribeIfValid(this.removeSubscription);
    unsubscribeIfValid(this.getClientsSubscription);

  }
  public onSubmit() {
    this.crudOperationAndHandler[this.crudOperation](this.filterForm.value);
  }
  public onClientSearch() {
    this.crudOperationAndHandler['Search'](this.searchFilterForm.value);
  }
  public onClientEdit(client: ClientDTO) {
    this.crudOperation = "Edit";
    this.refreshFilterFormOrSetFromClient(client);
  }
  public onClientRemove(id: string) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'This user will be permanently removed from database!',
      icon: 'warning',
      showCancelButton: true,
      heightAuto: false,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.crudOperationAndHandler['Remove'](id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        SwalFire(
          'Cancelled',
          'User was not removed from database',
          'success'
        )
      }
    })
  }
  public onClientPagedSearch(event : {skip: number, take: number}){
    this.totalClients = 0;
    this.searchFilterForm.value.skip = event.skip;
    this.searchFilterForm.value.take = event.take;
    this.crudOperationAndHandler['Search'](this.searchFilterForm.value, true);
  }
  public onEditAbort() {
    this.crudOperation = 'Create';
    this.refreshFilterFormOrSetFromClient();
  }
  ngOnInit(): void {
    this.tryGetCountries();
  }
  private tryGetCountries() {

    unsubscribeIfValid(this.getCountriesSubscription);
    this.getCountriesSubscription = this.clientService.getCountries()
      .subscribe(countries => {
        if (countries === undefined || !countries.length) {
          SwalFireNoButtons(
            'Initial error',
            'Could not get countries from database, retrying in 15 seconds',
            'error',
            2000
          )
          setTimeout(() => this.tryGetCountries(), 15000);
          return;
        }
        this.countries = countries.sort((x, y) => x.code.charCodeAt(0) * 1000 + x.code.charCodeAt(1) - y.code.charCodeAt(0) * 1000 + y.code.charCodeAt(1));
        this.searchCountries = [{ id: '', name: 'None', code: '**' }, ...this.countries];
      },
        error => {
          SwalFireNoButtons(
            'Initial error',
            `Could not get countries from database \n Error from server: ${error}`,
            'error',
            2000
          );
        });


  }
  private refreshDataTable(clients: ClientDTO[]) {
    this.clients = clients;
  }
  private refreshFilterFormOrSetFromClient(client?: ClientDTO) {
    this.filterFormKeys.map(str => {
      this.filterForm.get(str)?.setValue(client ? (client as any)[str] : this.defaultClientDTO[str]);
    });
  }

}
