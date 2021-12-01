import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized} from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { LoaderService } from './loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'caliculator';
  introduction = 'Organize your training'; 
  public previousUrl: string = '';
  public currentUrl: string = '';

  
  constructor(
    private router:Router,
    private loader: LoaderService) {

    this.router.events
    .pipe(filter((evt:any)=>evt instanceof RoutesRecognized || evt instanceof NavigationEnd ), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
      this.previousUrl = events[0].urlAfterRedirects; 
      this.currentUrl = events[1].urlAfterRedirects; 
      this.loader.getPreviousUrl(this.previousUrl, this.currentUrl);
    })

    this.router.events
    .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    .subscribe(event => {
      if(
        event.id === 1 &&
        event.url === event.urlAfterRedirects
      ) {
        this.router.navigate(['/'])
      }
    })
  }

  

    



  
}
