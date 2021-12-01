import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Training } from './training';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private savedTrainingsUrl = 'http://localhost:5000/saved-trainings';
  private categoriesUrl = 'http://localhost:5000/categories'
  public trainingPlan: Training[] = [];
  public previousUrl: string = '';
  public currentUrl: string = '';
  public checkIfTabsAreCategories: boolean = false;


  getSavedTrainings(): Observable<any> {
    return this.http.get<any>(this.savedTrainingsUrl);
  }

  presentCategories() {
    return this.http.get<string[]>(this.categoriesUrl);
  }

  getPreviousUrl(prevUrl:string, currUrl:string) {
    this.previousUrl = prevUrl;
    this.currentUrl = currUrl;
  }

  setTabs(x:boolean) {
    if(!x) {
      this.checkIfTabsAreCategories = false;
    } else {
    this.checkIfTabsAreCategories = true;
    }
  }

  navigateOnStart() {
    this.router.navigate(['']);
  }



  constructor(
    private http: HttpClient,
    private router:Router) {}


}
