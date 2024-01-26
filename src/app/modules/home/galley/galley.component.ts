import { Component } from '@angular/core';
import { appApiResources } from 'src/app/constants/app.constants';
import { HttpService } from 'src/app/services/http/http.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-galley',
  templateUrl: './galley.component.html',
  styleUrls: ['./galley.component.scss'],
})
export class GalleyComponent {
  galleryData: any = [];
  linkdata: any = [];
  constructor(private http: HttpService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getGallerylist();
  }
  getGallerylist() {
    this.http.get(appApiResources.galleryList).subscribe({
      next: (data: any) => {
        this.galleryData = data.data;
        console.log(this.galleryData);
        this.linkdata = data.link;
        this.linkdata = data.link.filter(
          (entry: { youtube_link: null }) => entry.youtube_link !== null
        );
        this.reverseSerialNumbers();
      },
    });
  }
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  currentPage = 1;
  itemsPerPage = 8;

  reverseSerialNumbers() {
    this.galleryData.forEach(
      (item: { serialNumber: number }, index: number) => {
        item.serialNumber = this.galleryData.length - index;
      }
    );
  }
  modalData: any; 
  openLightbox(data: any) {
    this.modalData = data;
    document.getElementById('lightboxModalButton')?.click();
  }

}
