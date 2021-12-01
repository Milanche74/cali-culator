import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private loader: LoaderService
  ) { }

  loadTrainings() {
    this.loader.setTabs(false);
  }
  presentCategories() {
    this.loader.setTabs(true);
  }

  ngOnInit(): void {
  }

  

}
