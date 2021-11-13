// import { Component, OnInit } from '@angular/core';
// import { faCalculator } from '@fortawesome/free-solid-svg-icons';
// import { Training, DISCIPLINES } from '../training';
// import { CalculatorService } from '../calculator.service';

// @Component({
//   selector: 'app-endurance-training',
//   templateUrl: './endurance-training.component.html',
//   styleUrls: ['./endurance-training.component.css']
// })
// export class EnduranceTrainingComponent implements OnInit {

//   faCalculator = faCalculator;
  
//   excercises = DISCIPLINES[0].filter(discipline => !discipline.aux);


          
//   public EnduranceTraining: Training[] =  [];
  

//   ngOnInit(): void {
//     this.getEnduranceTraining();
//   }

//   getEnduranceTraining() {
//     this.calculator.getEnduranceTraining()
//       .subscribe(training => this.EnduranceTraining = training);
//   }

//   calculateEnduranceTraining(maxReps: any, EnduranceTraining: Training[]) {
//     this.calculator.calculateEnduranceTraining(maxReps, EnduranceTraining)

//   }

//   constructor(private calculator: CalculatorService) { 

//   }

  


// }
