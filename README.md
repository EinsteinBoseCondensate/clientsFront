# ClientsAndCountriesFetcher

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

## Developer notes

Follow next steps to run this project:

1. Run `npm i` (install (LTS version of) node if you don't already have it installed in your machine).
2. Open file ./node_modules/sweetalert2/src/scss/_core.scss.
3. Search in file for `math.div` and replace it with a simple use of divide operator like:

            // https://stackoverflow.com/a/12335841/1331425
            @function strip-units($number) {
              @return $number / ($number * 0 + 1);
            }
            $icon-zoom: strip-units($swal2-icon-size) / 5;

4. Run `ng serve --open` as it's indicated in Development server section.

## Backend configuration

Open `src/assets/app-settings/app-settings.json` and edit your backend's endpoint.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
