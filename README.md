# CaliCulator

This application plans ahead training sessions for calistenics athletes.

## Installation

Apart from the regular Angular related stuff (listed below), one needs to create 'db.json' file in the project root folder in order to instatiate mock DB. The content of said file should be as follows:

```json
{
  "endurance-training": [
    {
      "id": 1,
      "restTime": "< 1min",
      "reps": 25,
      "sets": 40,
      "volume": 1000
    },
    {
      "id": 2,
      "restTime": "< 1min",
      "reps": 0,
      "sets": 13,
      "volume": 0
    },
    {
      "id": 3,
      "restTime": "< 2min",
      "reps": 50,
      "sets": 10,
      "volume": 500
    }
  ]
}
```
Json server is run using `npm run server` command.

## Angular stuff

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
