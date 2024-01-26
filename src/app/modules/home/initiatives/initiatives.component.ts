import { Component,  HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-initiatives',
  templateUrl: './initiatives.component.html',
  styleUrls: ['./initiatives.component.scss']
})
export class InitiativesComponent {
  fragment: string | null;

  constructor(private route: ActivatedRoute) {
    this.fragment = null;
  }

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment: string | null) => {
      console.log('Received fragment:', fragment);
      this.fragment = fragment || 'three';
    });
  }
  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }
  gotoTop() {
    window.scroll({ 
      top:700, 
      left: 0, 
      behavior: 'smooth' 
    });
  }


}

