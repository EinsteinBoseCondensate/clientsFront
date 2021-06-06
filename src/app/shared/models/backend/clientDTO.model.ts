import { Country } from "./country.model";
import { Gender } from "./gender.enum";

export interface ClientDTO {
    id: string;
    name: string;
    surname: string;
    gender: number;
    dateOfBirth: string;
    address: string;
    countryId: string;
    postalCode: string;
}
export interface ClientFilterDTO extends ClientDTO{
    from: Date,
    to: Date
}
