import { Country } from "./country.model";
import { Gender } from "./gender.enum";

export interface ClientDTO {
    id: string;
    name: string;
    surname: string;
    gender: Gender;
    dateOfBirth: string;
    address: string;
    country: string;
    postalCode: string;
}
