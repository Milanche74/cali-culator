import { Component, OnInit } from '@angular/core';
import { Training } from '../training';
import { CalculatorService } from '../calculator.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-training-table',
  templateUrl: './training-table.component.html',
  styleUrls: ['./training-table.component.css']
})
export class TrainingTableComponent implements OnInit {

  public trainingPlan: Training[] = [];
  public discipline = '';
  goal: string|null = '';
  active:boolean = false;

  constructor(
    public calculator: CalculatorService,
    public location: Location) { }

  ngOnInit(): void {
    // this.trainingPlan = this.calculator.trainingPlan; 
    this.loger()
    this.trainingPlan = this.calculator.trainingPlan;
    this.discipline = this.calculator.discipline;
    this.goal = this.calculator.goal;
    console.log(this.goal);
  }


  facilitateTraining(training:Training[]) {
    if(this.goal === 'reps') {
      this.trainingPlan= this.calculator.facilitateEnduranceTraining(training);
    }
  }

  aggravateTraining(training:Training[]) {
    if(this.goal === 'reps') {
      this.trainingPlan= this.calculator.aggravateEnduranceTraining(training);
    }
  }

  nextProgression(training:Training[]) {
    if(this.goal === 'reps') {
      this.trainingPlan= this.calculator.progressionEnduranceTraining(training);
    }
    this.active=false;
  }

  clear() {
    this.location.back();
  }

  saveTraining(training:Training[]) {
    this.calculator.saveTraining(training)
    .subscribe(training => {console.log(training); this.active = true});
  }

  loger() {
    this.calculator.loger()
  }


}
