import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized} from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { faCalculator, faSave } from '@fortawesome/free-solid-svg-icons';
import { MessageServiceService } from './message.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'caliculator';
  introduction = 'Organize your training'; 
  public previousUrl: string = '';
  public currentUrl: string = '';
  faCalculator = faCalculator;
  faSave = faSave; 

  
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private loader: LoaderService,
    public message: MessageServiceService)
     {

    // listen for page reload
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
        let currentUrlWhenReloaded = this.router.url  
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
         
          if(currentUrlWhenReloaded.includes('training-table') || currentUrlWhenReloaded.includes('form')) {
            this.loader.setActive(true);
            this.loader.active = true;
          } 

          this.router.navigate([currentUrlWhenReloaded])
          
          if(currentUrlWhenReloaded.includes('calculate/training-table')) { //avoid empty tabs tableComp showing empty on reload for new training calc
            this.router.navigate(['main/calculate'])
            console.log('aaaa')
          }
        });
      
      }
    });
   
  }


  ngOnInit(): void {
    
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
