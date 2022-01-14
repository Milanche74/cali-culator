import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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


  getSavedTrainings(): Observable<any> {
    return this.http.get<any>(this.savedTrainingsUrl)
    .pipe(
      catchError(this.handleError<any>('getSavedTrainings', []))
    );
  }

  presentCategories() {
    return this.http.get<string[]>(this.categoriesUrl)
    .pipe(
      catchError(this.handleError<any>('presentCategories', []))
    );
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
