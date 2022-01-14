import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './form/form.component';
import { MainComponent } from './main/main.component';
import { TrainingTableComponent } from './training-table/training-table.component';


const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'main/loader', component: MainComponent,
     children: [
      {path: 'training-table/:name', component: TrainingTableComponent}
     ]
  },
  {path: 'main/calculate', component: MainComponent,
     children: [
      {path: 'form/:name', component: FormComponent},
      {path: 'training-table/:name', component: TrainingTableComponent}
     ]
  }
  // {path: 'form/:name', component: FormComponent},
  // {path: 'training-table', component: TrainingTableComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
