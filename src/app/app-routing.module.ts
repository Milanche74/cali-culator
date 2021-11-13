import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { EnduranceTrainingComponent } from './endurance-training/endurance-training.component';
import { FormComponent } from './form/form.component';
import { TrainingTableComponent } from './training-table/training-table.component';


const routes: Routes = [
  {path: 'form/:name', component: FormComponent},
  {path: 'training-table', component: TrainingTableComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
