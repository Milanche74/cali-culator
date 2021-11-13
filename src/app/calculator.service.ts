import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Training } from './training';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  
  private enduranceTrainingUrl = 'http://localhost:5000/endurance-training';
  private staticHoldsTrainingUrl = 'http://localhost:5000/static-holds-training';
  private streetLiftingTrainingUrl = 'http://localhost:5000/street-lifting-training';
  public trainingPlan: Training[] = [];
  public discipline = '';
  public goal:any = '';
  
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
        
      console.log(this.trainingPlan) 

      this.trainingPlan[0].volume = formValue.maxNumber * 10;
      this.trainingPlan[0].reps = Math.ceil(this.trainingPlan[0].volume / this.trainingPlan[0].sets);
      this.trainingPlan[1].reps = Math.ceil(this.trainingPlan[0].reps * 1.5);
      this.trainingPlan[1].volume = this.trainingPlan[1].reps * this.trainingPlan[1].sets;
      this.trainingPlan[2].reps = this.trainingPlan[0].reps * 2;
      this.trainingPlan[2].volume = this.trainingPlan[2].reps * this.trainingPlan[2].sets;
  
      this.discipline = formValue.option;

      this.goal = 'reps';
      
      this.router.navigate(['training-table'])
      
      });
    return this.trainingPlan;

  }


  updateEnduranceTraining(training: Training[]): Observable<any> {
    return this.http.put(this.enduranceTrainingUrl, training, this.httpOptions)
  };

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

    return training

  }
  saveTraining(training:Training[]) {
    return this.http.post(this.enduranceTrainingUrl, training, this.httpOptions);
    
    
  }



  loger() {
    console.log(this.trainingPlan)
  }


  constructor(private http: HttpClient,
              private router: Router) { }
}
