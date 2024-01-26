import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-our-initiatives',
  templateUrl: './our-initiatives.component.html',
  styleUrls: ['./our-initiatives.component.scss'],
})
export class OURINITIATIVESComponent {
  constructor(public router: Router) {}
 
navigateToTab(tabId: string): void {
  this.router.navigate(['initiatives'], { fragment: tabId });
}
}