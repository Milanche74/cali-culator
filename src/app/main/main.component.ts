import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../loader.service';
import { Training } from '../training';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  //trainingGoals: any[] = [{name: 'reps', state: false}, {name: 'static holds', state: false}, {name: 'street lifting', state: false}];
  tabs: any[] = [];
  currentUrl = this.loader.currentUrl;
  active: boolean = false;
  urlHasLoader:boolean = false;
  trainingsArray: any[] = []; 
  trainingPlan: Training[] = [];
  index: number = 0;
  currentExcercise: string|null = ''; 
  tabActive:string = '';
  tabsInitial:string[] = [];

  
  openTab(tab:string): void {
    
    this.active = true;

    if(this.urlHasLoader) {
      this.index = this.tabs.indexOf(tab);
      
      this.trainingPlan = this.trainingsArray[this.index].data;    
      this.router.navigate([`main/loader/training-table/${tab}`], {state: {data: this.trainingPlan}});
      
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
      
    this.active = false;
    
    if(this.currentUrl === "/main/calculate") {

      this.urlHasLoader = false;
      this.loader.determineIfUrlHasLoader(false);

      // console.log(this.tabsAsCategories)
      this.loader.presentCategories()
      .subscribe(categories => this.tabs = categories)

    } else if(this.currentUrl === "/main/loader") {
      
      this.urlHasLoader = true;
      this.loader.determineIfUrlHasLoader(true);

      this.loader.getSavedTrainings() 
      .subscribe(training => {
       
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
    this.router.navigate(['main/loader']);
    
  }
  
  

}


