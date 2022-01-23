import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { LoaderService } from '../loader.service';
import { Training } from '../training';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [LoaderService]
})
export class MainComponent implements OnInit{

  //trainingGoals: any[] = [{name: 'reps', state: false}, {name: 'static holds', state: false}, {name: 'street lifting', state: false}];
  tabs: any[] = this.loader.tabs;
  height: string = `${this.loader.tabs.length * 10}vh`;
  urlHasLoader:boolean = false;
  trainingsArray: any[] = this.loader.trainingsArray; 
  trainingPlan: Training[] = [];
  index: number = 0;
  currentExcercise: string|null = ''; 
  tabActive:string = '';
  tabsInitial:string[] = [];

  ngOnInit(): void {

     
    if(this.router.url.includes('form') || this.router.url.includes('training-table')) { //reload-related check
      this.loader.active = true;
    } 
    
    
    if(this.route.snapshot.routeConfig?.path === "main/calculate") {
      

      this.urlHasLoader = false;
      this.loader.determineIfUrlHasLoader(false);

      // console.log(this.tabsAsCategories)
      this.loader.getTabs('categories', false)

    } else if(this.route.snapshot.routeConfig?.path === 'main/loader') {
      let currentUrl = this.router.url
      this.urlHasLoader = true;
      
      this.loader.determineIfUrlHasLoader(true);

      if(currentUrl.includes('training-table')) {   //reload-related check
        this.loader.getTabs('savedTrainings', true);
      } else {
        this.loader.getTabs('savedTrainings', false);
      }

    }

   


    
    // use this on init to check if url has :name url parameter
    // then see if you need to send a TrainingPlan to TrainingTableComponent
  }



  openTab(tab:string): void {
    
    this.loader.active = true;
    
    this.tabActive = tab;

    if(this.urlHasLoader) {
      this.index = this.loader.tabs.indexOf(tab);
      
      
      this.trainingPlan = this.loader.trainingsArray[this.index].data; 
      console.log(this.trainingPlan)   
      // this.router.navigate([`main/loader/training-table/${tab}`], {state: {data: this.trainingPlan}});

      this.loader.sendTrainingToTableComp(this.trainingPlan, tab)
      
      this.router.navigate([`main/loader/training-table/${tab}`]);
      
      

      if(this.loader.tabs.length > 4) {

        this.loader.sliceTabs();

      } 
    } else {
      let urlName = tab.replace(' ','-');
      console.log(urlName)
      this.router.navigate([`main/calculate/form/${urlName}`])

    } 
  }
   
  constructor(
    public loader: LoaderService,
    public route: ActivatedRoute,
    private router: Router ) { }


  

  showSavedTrainings() {
    this.loader.active = false;

    this.loader.tabsToInitial();
    this.router.navigate(['main/loader']);
    
  }
  
  

}


