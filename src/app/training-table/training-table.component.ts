import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Training } from '../training';
import { CalculatorService } from '../calculator.service';
import { Location } from '@angular/common';
import { LoaderService } from '../loader.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';



@Component({
  selector: 'app-training-table',
  templateUrl: './training-table.component.html',
  styleUrls: ['./training-table.component.css'] 
})
export class TrainingTableComponent implements OnInit, OnDestroy {

  trainingPlan: Training[] = [];
  trainingsArray: any[] = [];
  public savedTrainings: [Training[]] = [[]];
  goal: string|null = '';
  active:boolean = false;
  currentExcercise: string|null = '';
  index: number = 0;
  // previousUrl: string | null = '';
  // @Input() load: boolean = false;
  subscription: Subscription;
  isPortrait: boolean = false;

  constructor(
    public calculator: CalculatorService,
    public location: Location,
    public loader: LoaderService,
    public route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver)
    {
      this.subscription = loader.loadedTraining$.subscribe(
        training => {
          this.trainingPlan = training;
          console.log('stiglo??')
        }
      )
    }

  ngOnInit(): any {
    
    

    if(this.loader.urlHasLoader) {
      // console.log(history.state.data)
      // this.trainingPlan = history.state.data;
      console.log('prodje table')
      // this.subscription = this.loader.loadedTraining$.subscribe(
      //   training => {
      //     this.trainingPlan = training;
      //     console.log('stiglo??')
      //   }
      // )
      
    } else {
      this.loger()
      this.trainingPlan = this.calculator.trainingPlan;
      this.goal = this.calculator.goal;
      // console.log(this.goal);
    } 
    
    this.breakpointObserver
    .observe(['(min-width: 400px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isPortrait = false;
      } else {
        this.isPortrait = true;
      }
      console.log(state)
    });
  }

  

  // ngDoCheck() {
  //   if(this.loader.urlHasLoader) { 
  //     let excercise = this.route.snapshot.paramMap.get('name');
  //     if( excercise !== this.loader.previousUrl) {
  //     this.trainingPlan = history.state.data;
  //     }
  //   }
  // }

  facilitateTraining(training:Training[]) {
    // if(this.goal === 'reps') {}
      this.trainingPlan= this.calculator.facilitateEnduranceTraining(training);
    
  }

  aggravateTraining(training:Training[]) {
    // if(this.goal === 'reps') {}
      this.trainingPlan  = this.calculator.aggravateEnduranceTraining(training);
    
  }

  nextProgression(training:Training[]) {
    // if(this.goal === 'reps') {}
      this.trainingPlan= this.calculator.progressionEnduranceTraining(training);
    
    this.active = false;
  }

  clear() {
    this.loader.navigateOnStart();
  }

  saveTraining(training:Training[]) {
    
    let indexOfSameTraining:number|null = null; 
    

    this.loader.getSavedTrainings().
       subscribe( trainings => {
        trainings = trainings;
        for(let i = 0; i < trainings.length; i++) {
          console.log(trainings[i].data[0].excercise);
          console.log(training[0].excercise);
          if(trainings[i].data[0].excercise === training[0].excercise ) {
            
            indexOfSameTraining = trainings[i].id;
            
          }
        }
        console.log(indexOfSameTraining)
        
        if(indexOfSameTraining) {
          this.updateTraining(training, indexOfSameTraining);
        } else {
          this.saveNewTraining(training);
        }
        
      })
    
  }

  updateTraining(training:Training[], index:number) {
    this.calculator.updateTraining(training, index).subscribe(training => {console.log(training); this.active = true});
  }

  saveNewTraining(training:Training[]) {
    this.calculator.saveNewTraining(training) 
    .subscribe(training => {console.log(training); this.active = true});
    
  }

  loger() {
    this.calculator.loger()
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
