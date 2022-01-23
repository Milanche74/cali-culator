# CaliCulator

This application plans ahead training sessions for calisthenics athletes.

## Installation

Apart from the regular Angular related stuff (listed below), one needs to create 'db.json' file in the project root folder in order to instatiate mock DB. The content of said file should be as follows:

```json
{
  "categories": [
    "reps",
    "static holds",
    "street lifting"
  ],
  "endurance-training": [
    {
      "id": 1,
      "restTime": "< 1min",
      "reps": 0,
      "sets": 40,
      "volume": 0
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
      "reps": 0,
      "sets": 10,
      "volume": 0
    }
  ],
  "saved-trainings": [
    {
      "id": 1,
      "data": [
        {
          "id": 1,
          "restTime": "< 1min",
          "reps": 9,
          "sets": 40,
          "volume": 340,
          "excercise": "Dips"
        },
        {
          "id": 2,
          "restTime": "< 1min",
          "reps": 14,
          "sets": 13,
          "volume": 182,
          "excercise": "Dips"
        },
        {
          "id": 3,
          "restTime": "< 2min",
          "reps": 18,
          "sets": 10,
          "volume": 180,
          "excercise": "Dips"
        }
      ]
    },
    {
      "data": [
        {
          "id": 1,
          "restTime": "< 1min",
          "reps": 3,
          "sets": 40,
          "volume": 120,
          "excercise": "Pull-ups"
        },
        {
          "id": 2,
          "restTime": "< 1min",
          "reps": 5,
          "sets": 13,
          "volume": 65,
          "excercise": "Pull-ups"
        },
        {
          "id": 3,
          "restTime": "< 2min",
          "reps": 6,
          "sets": 10,
          "volume": 60,
          "excercise": "Pull-ups"
        }
      ],
      "id": 2
    },
    {
      "data": [
        {
          "id": 1,
          "restTime": "< 1min",
          "reps": 8,
          "sets": 40,
          "volume": 300,
          "excercise": "Squats"
        },
        {
          "id": 2,
          "restTime": "< 1min",
          "reps": 12,
          "sets": 13,
          "volume": 156,
          "excercise": "Squats"
        },
        {
          "id": 3,
          "restTime": "< 2min",
          "reps": 16,
          "sets": 10,
          "volume": 160,
          "excercise": "Squats"
        }
      ],
      "id": 3
    },
    {
      "data": [
        {
          "id": 1,
          "restTime": "< 1min",
          "reps": 10,
          "sets": 40,
          "volume": 400,
          "excercise": "Push-ups"
        },
        {
          "id": 2,
          "restTime": "< 1min",
          "reps": 15,
          "sets": 13,
          "volume": 195,
          "excercise": "Push-ups"
        },
        {
          "id": 3,
          "restTime": "< 2min",
          "reps": 20,
          "sets": 10,
          "volume": 200,
          "excercise": "Push-ups"
        }
      ],
      "id": 4
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

## Future updates

- Improve algorithm for static and strength training;
- Make specific training calculations for form values that are lower then 10 and higher then 50;f
- Make responsive

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
