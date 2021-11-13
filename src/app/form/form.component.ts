import { Component, OnInit } from '@angular/core';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { Training, DISCIPLINES } from '../training';
import { CalculatorService } from '../calculator.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  constructor(
    private calculator: CalculatorService,
    private route: ActivatedRoute) { 

  }

  parameter = '';
  faCalculator = faCalculator;
  excercises: any = [];
  goal: any = ''; 
  // this.route.snapshot.paramMap.get('name');
  public trainingPlan: Training[] =  [];



  ngOnInit(): void {
    
  }
  ngDoCheck() {
    let goal = this.route.snapshot.paramMap.get('name');
    if(goal === 'reps') {
      this.excercises = DISCIPLINES[0].filter(discipline => !discipline.aux);
      this.parameter = 'number of max reps';
    } else if(goal === 'static holds'){
      this.excercises = [];
      this.parameter = 'max hold time'
    } else if (goal==='street lifting') {
      this.excercises = [];
      this.parameter = 'max weight as ORM'
    } else {
      return
    };
    this.goal = goal;
  }


  
  calculateTraining(formValue: any) {

    if(this.goal = 'reps') {
      this.calculator.calculateEnduranceTraining(formValue)
    }

    
    
  }
  
  
  
  //     this.excercises = DISCIPLINES[0].filter(discipline => discipline.aux);
  
  
      // getEnduranceTraining() {
      //   this.calculator.getEnduranceTraining()
      //     .subscribe(training => this.EnduranceTraining = training);
      // }

      // calculateEnduranceTraining(maxReps: any, EnduranceTraining: Training[]) {
      //   this.calculator.calculateEnduranceTraining(maxReps, EnduranceTraining)

      // }

  
  


}

