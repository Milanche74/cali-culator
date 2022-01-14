import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized} from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { faCalculator, faSave } from '@fortawesome/free-solid-svg-icons';
import { MessageServiceService } from './message.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'caliculator';
  introduction = 'Organize your training'; 
  public previousUrl: string = '';
  public currentUrl: string = '';
  faCalculator = faCalculator;
  faSave = faSave; 

  
  constructor(
    private router:Router,
    private loader: LoaderService,
    public message: MessageServiceService) {

    // listen for page reload
    this.router.events
    .pipe(filter((evt:any)=>evt instanceof RoutesRecognized || evt instanceof NavigationEnd ), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
      this.previousUrl = events[0].urlAfterRedirects; 
      this.currentUrl = events[1].urlAfterRedirects; 
      this.loader.getPreviousUrl(this.previousUrl, this.currentUrl);
    })

    // this.router.events
    // .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    // .subscribe(event => {
    //   if(
    //     event.id === 1 &&
    //     event.url === event.urlAfterRedirects
    //   ) {
    //     this.router.navigate(['/'])
    //   }
    // });
   
  }
  
  // emptyMessages() {
  //   console.log('empty')
  //   this.message.emptyMessages();
  // }

  
  // public linkToCalculate():void {
  //   this.loader.setTabs(true);
  //   this.router.navigate(['main']);
  // }

  // public linkToLoad():void {
  //   this.loader.setTabs(false);
  //   this.router.navigate(['main']);
  // }
    



  
}
