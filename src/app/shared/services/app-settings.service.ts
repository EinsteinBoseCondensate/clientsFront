import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../models/app-settings/app-settings.model';
import { CountryFeed } from '../models/backend/all.countries.feed';
@Injectable()
export class AppSettingsService {

    static settings: AppSettings;
    constructor(private http: HttpClient) { }

    public load() {
        const jsonFile = 'assets/app-settings/app-settings.json';
        const promise = this.http.get(jsonFile).toPromise();

        promise.then(
            (response: any) => AppSettingsService.settings = <AppSettings>response,
            error => console.error('Config was not binded: ', error)
        );

        return promise;
    }
}
