import { Component } from '@angular/core';
import { appApiResources } from 'src/app/constants/app.constants';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-financial-disclosure',
  templateUrl: './financial-disclosure.component.html',
  styleUrls: ['./financial-disclosure.component.scss'],
})
export class FinancialDisclosureComponent {
  financialData: any = [];
  paymentData: any = [];
  expenditureData: any = [];
  beneficiaryData: any = [];
  constructor(private http: HttpService) {}
  ngOnInit() {
    this.getFinancialData();
    this.getpaymentgateway();
    this.getexpenditurelist();
    this.beneficiaryListData();
  }
  getFinancialData() {
    this.http.get(appApiResources.getFinancialData).subscribe({
      next: (data: any) => {
        this.financialData = data.data;
        this.totalItems = this.financialData.length;
        this.pageChanged({
          page: this.currentPage,
          itemsPerPage: this.itemsPerPage,
        });
      },
      error: (error) => {
        this.financialData = [];
      },
    });
  }
  getpaymentgateway() {
    this.http.get(appApiResources.getpaymentgateway).subscribe({
      next: (data: any) => {
        this.paymentData = data.data;
        console.log(this.pagedData);
      },
    });
  }
  getexpenditurelist() {
    this.http.get(appApiResources.getexpenditurelist).subscribe({
      next: (data: any) => {
        this.expenditureData = data.data;
        this.reverseSerialNumbers();
      },
    });
  }

  reverseSerialNumbers() {
    this.expenditureData.forEach(
      (item: { serialNumber: number }, index: number) => {
        item.serialNumber = this.expenditureData.length - index;
      }
    );
  }

  beneficiaryListData() {
    this.http.get(appApiResources.beneficiaryList).subscribe({
      next: (data: any) => {
        this.beneficiaryData = data.data;
        this.totalItems = this.beneficiaryData.length;
        this.pageChanged({
          page: this.currentPage,
          itemsPerPage: this.itemsPerPage,
        });
      },
      error: (error) => {
        this.beneficiaryData = [];
      },
    });
  }
  pagedData: any[] = [];
  currentPage = 1;
  itemsPerPage = 15; // Adjust this to the number of items you want per page
  maxSize = 15; // Maximum number of page links to display
  totalItems = this.financialData.length;

  pageChanged(event: any): void {
    const startIndex = (event.page - 1) * event.itemsPerPage;
    const endIndex = startIndex + event.itemsPerPage;
    this.pagedData = this.financialData.slice(startIndex, endIndex);
  }

  calculateSerialNumber(index: number): number {
    const totalItems = this.financialData.length;
    const serialNumber =
      totalItems - index - (this.currentPage - 1) * this.itemsPerPage;
    return serialNumber;
  }
}
