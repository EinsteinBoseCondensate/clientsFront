import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CountryFeed } from "../models/backend/all.countries.feed";
import { ClientDTO, ClientFilterDTO } from "../models/backend/clientDTO.model";
import { CRUDResult, CRUDResults } from "../models/backend/crud-result.model";
import { ApiService } from "./api.service";

const controllerRoute = "clients/";

@Injectable({
    providedIn: 'root',
})
export class ClientService {

    constructor(
        private apiService: ApiService) { }

    public getClients(filter: ClientFilterDTO): Observable<CRUDResults<ClientDTO>> {
        return this.apiService.post(controllerRoute+'get', filter);
    }
    public editClient(client: ClientDTO): Observable<CRUDResult> {
        return this.apiService.put(controllerRoute, client);
    }
    public removeClient(id: string): Observable<CRUDResult> {
        return this.apiService.delete(controllerRoute+id);
    }
    public createClient(client: ClientDTO): Observable<CRUDResult> {
        return this.apiService.post(controllerRoute, client);
    }
    public getCountries(): Observable<CountryFeed[]> {
        return this.apiService.get(controllerRoute+'countries');
    }
}