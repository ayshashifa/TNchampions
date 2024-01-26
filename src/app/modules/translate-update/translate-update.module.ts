import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateUpdateComponent } from './translate-update/translate-update.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'update',
    component: TranslateUpdateComponent,
  }
]

@NgModule({
  declarations: [
    TranslateUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TranslateUpdateModule { }
