import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'caliculator';
  introduction = 'Organize your training'; 

  // trainingGoals: string[] = ['reps', 'static holds', 'street lifting'];
  trainingGoals: any[] = [{name: 'reps', state: false}, {name: 'static holds', state: false}, {name: 'street lifting', state: false}];

  active: boolean = false;

  presentParams(goal:any):void {
    //make sure inactive goal's states are false
    for(let i = 0; i < this.trainingGoals.length; i++) {
      this.trainingGoals[i].state = false;
    }
    //change clicked goal state
    goal.state = true; 

    //change navbar state
    this.active = true;

    

  }

  
}
