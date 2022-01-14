import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Training } from './training';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  
  private enduranceTrainingUrl = 'http://localhost:5000/endurance-training';
  private staticHoldsTrainingUrl = 'http://localhost:5000/static-holds-training';
  private streetLiftingTrainingUrl = 'http://localhost:5000/street-lifting-training';
  private savedTrainingsUrl = 'http://localhost:5000/saved-trainings';
  public trainingPlan: Training[] = [];
  public goal:any = '';
  public isSameTraining:boolean = false;
  public indexOfSameTraining: number|null = null;

  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getEnduranceTraining(): Observable<Training[]> {
    return this.http.get<Training[]>(this.enduranceTrainingUrl);
  

  };
  calculateEnduranceTraining(formValue:any) {

    this.getEnduranceTraining()
      .subscribe(training => {
      this.trainingPlan = training; 
        
      

      this.trainingPlan[0].volume = formValue.formNumber * 10;
      this.trainingPlan[0].reps = Math.ceil(this.trainingPlan[0].volume / this.trainingPlan[0].sets);
      this.trainingPlan[1].reps = Math.ceil(this.trainingPlan[0].reps * 1.5);
      this.trainingPlan[1].volume = this.trainingPlan[1].reps * this.trainingPlan[1].sets;
      this.trainingPlan[2].reps = this.trainingPlan[0].reps * 2;
      this.trainingPlan[2].volume = this.trainingPlan[2].reps * this.trainingPlan[2].sets;
  
      for(let i=0; i< this.trainingPlan.length; i++) {
        this.trainingPlan[i].excercise = formValue.formOption;
      }

      this.goal = 'reps';
      
      this.router.navigate(['main/calculate/training-table/new'])
      
      });
      
    // return this.trainingPlan;

  }


  

  facilitateEnduranceTraining(training:Training[]) {
    training[0].volume = training[0].volume - 10;
    training[0].reps = Math.ceil(training[0].volume / training[0].sets);
    training[1].reps = Math.ceil(training[0].reps * 1.5);
    training[1].volume = training[1].reps * training[1].sets;
    training[2].reps = Math.ceil(training[1].reps * 2);

    return training

  };
  aggravateEnduranceTraining(training:Training[]) {
    training[0].volume = training[0].volume + 10;
    training[0].reps = Math.ceil(training[0].volume / training[0].sets);
    training[1].reps = Math.ceil(training[0].reps * 1.5);
    training[1].volume = training[1].reps * training[1].sets;
    training[2].reps = Math.ceil(training[1].reps * 2);

    return training

  }

  progressionEnduranceTraining(training:Training[]) {
    training[0].volume = training[0].volume + 20;
    training[0].reps = Math.ceil(training[0].volume / training[0].sets);
    training[1].reps = Math.ceil(training[0].reps * 1.5);
    training[1].volume = training[1].reps * training[1].sets;
    training[2].reps = Math.ceil(training[1].reps * 2);

    return training;

  }

  saveNewTraining(training:Training[]) {
    return this.http.post(`${this.savedTrainingsUrl}`, {data: training}, this.httpOptions);
  }

  updateTraining(training:Training[], index:number) {
    return this.http.put(`${this.savedTrainingsUrl}/${index}`, {data: training}, this.httpOptions);
  }
  

  // saveTraining(training:Training[]): Observable<any> {   

  //   let getIndexOfSavedTraining = this.checkForSameTraining(training);
  //   console.log(getIndexOfSavedTraining);

  //   if(getIndexOfSavedTraining) {
  //     return this.http.put(`${this.savedTrainingsUrl}/${getIndexOfSavedTraining}`, {data: training}, this.httpOptions);
  //   } else {
  //     return this.http.post(`${this.savedTrainingsUrl}`, {data: training}, this.httpOptions);
  //   }
  // }

  


  
    
         
    
  // }



  loger() {
    console.log(this.trainingPlan)
  }


  constructor(private http: HttpClient,
              private router: Router,
              private loader: LoaderService) { }
}
