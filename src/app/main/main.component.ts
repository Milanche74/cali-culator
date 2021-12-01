import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../loader.service';
import { Training } from '../training';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  //trainingGoals: any[] = [{name: 'reps', state: false}, {name: 'static holds', state: false}, {name: 'street lifting', state: false}];
  tabs: any[] = [];
  currentUrl = this.loader.currentUrl;
  active: boolean = true;
  tabsAsCategories = this.loader.checkIfTabsAreCategories;
  trainingsArray: any[] = []; 
  trainingPlan: Training[] = [];
  index: number = 0;
  currentExcercise: string|null = '';
  tabActive:string = '';
  tabsInitial:string[] = [];

  
  openTab(tab:string): void {
    
    this.active = true;

    if(!this.loader.checkIfTabsAreCategories) {
      this.index = this.tabs.indexOf(tab);
      console.log(this.index)
      this.trainingPlan = this.trainingsArray[this.index].data;    
      this.router.navigate([`main/training-table/${tab}`], {state: {data: this.trainingPlan}});
      console.log(this.trainingPlan);
      this.tabActive = tab;

      if(this.tabs.length > 4) {

        this.tabs = this.tabs.slice(0,3);

      }
      
    }
    

  }


  
  constructor(
    private loader: LoaderService,
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {
    if(this.loader.currentUrl === '/main') {
      this.active = false;
    }
    if(this.tabsAsCategories) {
      console.log(this.tabsAsCategories)
      this.loader.presentCategories()
      .subscribe(categories => this.tabs = categories)
    } else {
      this.loader.getSavedTrainings() 
      .subscribe(training => {
        console.log(training);
        this.trainingsArray = training;
        for(let i = 0; i < training.length; i++) {
          
          this.tabs.push(training[i].data[0].excercise);
        }
        this.tabsInitial = this.tabs;           

      })
    }
  }

  showSavedTrainings() {
    this.active = false;
    this.tabs = this.tabsInitial;
    this.router.navigate(['main']);
    
  }
  

}


