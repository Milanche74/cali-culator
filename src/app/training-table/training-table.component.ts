import { Component, OnInit, Input } from '@angular/core';
import { Training } from '../training';
import { CalculatorService } from '../calculator.service';
import { Location } from '@angular/common';
import { LoaderService } from '../loader.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-training-table',
  templateUrl: './training-table.component.html',
  styleUrls: ['./training-table.component.css']
})
export class TrainingTableComponent implements OnInit {

  trainingPlan: Training[] = [];
  trainingsArray: any[] = [];
  public savedTrainings: [Training[]] = [[]];
  goal: string|null = '';
  active:boolean = false;
  currentExcercise: string|null = '';
  index: number = 0;
  // previousUrl: string | null = '';
  // @Input() load: boolean = false;

  constructor(
    public calculator: CalculatorService,
    public location: Location,
    public loader: LoaderService,
    public route:ActivatedRoute) { }

  ngOnInit(): any {

    if(!this.loader.checkIfTabsAreCategories) {
      console.log(history.state.data)
      this.trainingPlan = history.state.data;
     
      
    } else {
      this.loger()
      this.trainingPlan = this.calculator.trainingPlan;
      this.goal = this.calculator.goal;
      console.log(this.goal);
    }  
  }

  ngDoCheck() {
    if(!this.loader.checkIfTabsAreCategories) { 
      let excercise = this.route.snapshot.paramMap.get('name');
      if( excercise !== this.loader.previousUrl) {
      this.trainingPlan = history.state.data;
      }
    }
  }

  facilitateTraining(training:Training[]) {
    // if(this.goal === 'reps') {}
      this.trainingPlan= this.calculator.facilitateEnduranceTraining(training);
    
  }

  aggravateTraining(training:Training[]) {
    // if(this.goal === 'reps') {}
      this.trainingPlan= this.calculator.aggravateEnduranceTraining(training);
    
  }

  nextProgression(training:Training[]) {
    // if(this.goal === 'reps') {}
      this.trainingPlan= this.calculator.progressionEnduranceTraining(training);
    
    this.active=false;
  }

  clear() {
    this.loader.navigateOnStart();
  }

  saveTraining(training:Training[]) {
    this.calculator.saveTraining(training)
    .subscribe(training => {console.log(training); this.active = true});
  }

  loger() {
    this.calculator.loger()
  }


}
