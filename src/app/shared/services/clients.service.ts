import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClientDTO } from "../models/backend/clientDTO.model";
import { CRUDResult } from "../models/backend/crud-result.model";
import { ApiService } from "./api.service";

const controllerRoute = "api/Clients";

@Injectable({
    providedIn: 'root',
})
export class ClientService {

    constructor(
        private apiService: ApiService) { }

    public getClients(): Observable<ClientDTO> {
        return this.apiService.get(controllerRoute);
    }
    public editClient(client: ClientDTO): Observable<CRUDResult> {
        return this.apiService.get(controllerRoute + "edit");
    }
    public removeClient(client: ClientDTO): Observable<CRUDResult> {
        return this.apiService.get(controllerRoute + "remove");
    }
    public createClient(client: ClientDTO): Observable<CRUDResult> {
        return this.apiService.get(controllerRoute + "create");
    }
}