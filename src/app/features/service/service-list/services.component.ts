import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../../core/services/dashboard/dashboard.service';
import { dashboardStats } from '../../../shared/models/interfaces/dashboardStats';
import { apiResponse } from '../../../shared/models/interfaces/apiResponse';


@Component({
  selector: 'app-services',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  dashboardService = inject(DashboardService); // Inject your service
  dashboardStats!: dashboardStats; // Replace with your actual stats model
  searchTerm: string = '';
  parsedServices: { name: string; fee: string; applicationFee: string }[] = [];
  displayedServices: { name: string; fee: string; applicationFee: string }[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit() {
    this.getDashboardStats();
  }

  getDashboardStats() {
    this.dashboardService.getDashboardStats().subscribe((response: apiResponse) => {
      if (response.isSuccessful) {
        this.dashboardStats = response.data;
        debugger;
        this.parseServices();
        debugger;
        this.updateDisplayedServices();
      }
    });
  }

  parseServices() {
    this.parsedServices = this.dashboardStats.services
      .split(',')
      .map((row) => {
        const [name, fee, applicationFee] = row.split('|'); 
        console.log(name, fee, applicationFee)
        debugger;
        return {
          name: name.trim(),
          fee: fee.trim(), 
          applicationFee: applicationFee.trim(), 
        };
      });
  }
  
  updateDisplayedServices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const filteredServices = this.parsedServices.filter((service) =>
      service.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.displayedServices = filteredServices.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateDisplayedServices();
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.currentPage = 1; // Reset to the first page on a new search
    this.updateDisplayedServices();
  }
}
