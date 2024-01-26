import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  imageUrl='./assets/logo/sdat.png';
  constructor (){
    if(localStorage.getItem('lang') && localStorage.getItem('lang')=='tamil'){
      this.imageUrl='./assets/logo/sdat-tn.png'
    }
  }
}
