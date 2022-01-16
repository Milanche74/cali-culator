import { Component, OnInit } from '@angular/core';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { Training, DISCIPLINES } from '../training';
import { CalculatorService } from '../calculator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  goal: string = ''; 
  // this.route.snapshot.paramMap.get('name');
  public trainingPlan: Training[] =  [];
  option: string = '';
  number: number|null = null;
  trainingForm:any = '';
  formInvalid = false;

  

  get formOption() {
    return this.trainingForm.get('formOption');
  }
  get formNumber() {
    return this.trainingForm.get('formNumber')
  }

  ngOnInit(): void {
    this.trainingForm = new FormGroup({
      formOption: new FormControl(this.option, Validators.required),
      formNumber: new FormControl(this.number, [
        Validators.required,
        Validators.min(1),
        Validators.max(100)
      ])
    })
  }
  ngDoCheck() {
    let goal = this.route.snapshot.paramMap.get('name');
    if(goal === 'reps') {
      this.excercises = DISCIPLINES[0].filter(discipline => !discipline.aux);
      this.parameter = 'number of max reps';
    } else if(goal === 'static-holds'){
      this.excercises = DISCIPLINES[1].filter(discipline => !discipline.aux);
      this.parameter = 'max hold time in seconds'
    } else if (goal==='street-lifting') {
      this.excercises = DISCIPLINES[0].filter(discipline => !discipline.aux);
      this.excercises.name = `Weighted ${this.excercises.name}`;
      this.parameter = 'max weight as ORM in KGs'
    } else {
      return
    };
    this.goal = goal;
  }


  
  onSubmit(): any {
    console.warn(this.trainingForm.value);
   
    if(this.trainingForm.invalid) {
      return this.formInvalid = true
    } 

    if(this.goal = 'reps') {
      this.calculator.calculateEnduranceTraining(this.trainingForm.value)
    }

    
    
  }
  getMarkerPosition(goal: string | null): any {
    switch(goal) {
      case 'reps': return '13%';
      case 'static-holds': return '48%';
      case 'street-lifting': return '83%';
    }
  
  }

  
  


}

