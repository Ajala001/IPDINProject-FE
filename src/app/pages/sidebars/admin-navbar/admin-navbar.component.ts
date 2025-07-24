import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
    selector: 'app-admin-navbar',
    imports: [RouterLink, CommonModule],
    templateUrl: './admin-navbar.component.html',
    styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
    @Input() isSidebarOpen = true;

    openSections: { [key: string]: boolean } = {};
  
    toggleCollapse(sectionId: string) {
      this.openSections[sectionId] = !this.openSections[sectionId];
    }
  
    isSectionOpen(sectionId: string): boolean {
      return !!this.openSections[sectionId];
    }

  sidebarSections = [
    {
      id: 'applications-collapse',
      title: 'Applications',
      icon: 'bi bi-file-earmark-text',
      links: [
        { route: '/applications', label: 'Manage Applications', icon: 'bi bi-clipboard' }
      ]
    },
    {
      id: 'courses-collapse',
      title: 'Courses',
      icon: 'bi bi-journal-text',
      links: [
        { route: '/courses/create', label: 'Add New Course', icon: 'bi bi-plus-circle' },
        { route: '/courses', label: 'Manage Courses', icon: 'bi bi-layers' }
      ]
    },
    {
      id: 'payments-collapse',
      title: 'Payments',
      icon: 'bi bi-wallet2',
      links: [
        { route: '/payments', label: 'Manage Payments', icon: 'bi bi-credit-card' }
      ]
    },
    {
      id: 'examinations-collapse',
      title: 'Examinations',
      icon: 'bi bi-pencil-square',
      links: [
        { route: '/examinations/create', label: 'Add New Exam', icon: 'bi bi-plus-circle' },
        { route: '/examinations', label: 'Manage Exams', icon: 'bi bi-clipboard' }
      ]
    },
    {
      id: 'training-collapse',
      title: 'Trainings',
      icon: 'bi bi-easel',
      links: [
        { route: '/trainings/create', label: 'Add New Training', icon: 'bi bi-plus-circle' },
        { route: '/trainings', label: 'Manage Training', icon: 'bi bi-gear' }
      ]
    },
    {
      id: 'results-collapse',
      title: 'Results',
      icon: 'bi bi-bar-chart-line',
      links: [
        { route: '/batchResults/upload', label: 'Upload Results', icon: 'bi bi-cloud-upload' },
        { route: '/batchResults', label: 'Manage Results', icon: 'bi bi-clipboard-check' }
      ]
    },
    {
      id: 'users-collapse',
      title: 'Users',
      icon: 'bi bi-person-lines-fill',
      links: [
        { route: '/users/add-admin', label: 'Add Admin', icon: 'bi bi-person-plus' },
        { route: '/users', label: 'Manage Users', icon: 'bi bi-person-check' }
      ]
    }
  ];
}
