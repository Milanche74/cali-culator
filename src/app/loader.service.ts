import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Training } from './training';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageServiceService } from './message.service';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private savedTrainingsUrl = 'http://localhost:5000/saved-trainings';
  private categoriesUrl = 'http://localhost:5000/categories'
  public trainingPlan: Training[] = [];
  public previousUrl: string = '';
  public currentUrl: string = '';
  public urlHasLoader: boolean = false; 

  public tabs: any[] = [];
  public trainingsArray: any = [];
  public tabsInitial: any = [];

  public active: boolean = false;

  private loadedTrainingSource = new Subject<Training[]>();
  loadedTraining$ = this.loadedTrainingSource.asObservable();


  sendTrainingToTableComp(training: Training[],tab:string|undefined) {

    this.router.navigateByUrl(`main/loader/training-table/${tab}`).then(()=> {
      this.loadedTrainingSource.next(training);
      console.log('sent');
    })
  }

  getSavedTrainings(): Observable<any> {
    return this.http.get<any>(this.savedTrainingsUrl)
    .pipe(
      catchError(this.handleError<any>('getSavedTrainings', []))
    );
  }

  getCategories() {
    return this.http.get<string[]>(this.categoriesUrl)
    .pipe(
      catchError(this.handleError<any>('presentCategories', []))
    );
  }

  getTabs(param: 'categories' | 'savedTrainings', slice: boolean) { 
    this.tabs = [];
    this.tabsInitial = [];

    if(param === 'categories') {
      
      this.getCategories().subscribe(data => this.tabs = data);
      
      } 
    else if(param === 'savedTrainings') {

      
      this.getSavedTrainings().subscribe(training => {
       
        this.trainingsArray = training;
        for(let i = 0; i < training.length; i++) {
          this.tabs.push(training[i].data[0].excercise);
        }      
        this.tabsInitial = this.tabs;
        if(slice) {
          this.sliceTabs();
        }
        if(this.router.url.includes('training-table') && !this.router.url.includes('new')) { //reload-related check
            let urlLastSubdirectory = this.router.url.split('/').pop() ;
            let index = this.tabsInitial.indexOf(urlLastSubdirectory);
    
            this.trainingPlan = this.trainingsArray[index].data;    
            this.sendTrainingToTableComp(this.trainingPlan, urlLastSubdirectory)

        }

      })
    }
  };

  sliceTabs() {
    this.tabs = this.tabs.slice(0,3);
  }

  tabsToInitial() {
    this.tabs = this.tabsInitial;
  }

  // toggleActive() {
  //   this.active = !this.active;
  // }

  setActive(x:boolean) {
    this.active = x;
  }

  getPreviousUrl(prevUrl:string, currUrl:string) {
    this.previousUrl = prevUrl;
    this.currentUrl = currUrl;
  }

  // setTabs(x:boolean) {
  //   if(!x) {
  //     this.checkIfTabsAreCategories = false;
  //   } else {
  //   this.checkIfTabsAreCategories = true;
  //   }
  // }

  determineIfUrlHasLoader(x:boolean) {
    this.urlHasLoader = x;
  }

  navigateOnStart() {
    this.router.navigate(['']);
  }

  
  handleError<T>(operation = 'operation', result?: T) {
    return (error:any) : Observable<T> => {
      console.error(error);
      this.message.saveMessages(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  constructor(
    private http: HttpClient,
    private router:Router,
    private message: MessageServiceService) {}


}
