import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,
    CommonModule,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  today = new Date().toLocaleDateString();
  chart: any;

  // Dashboard stats
  stats = {
    students: 248,
    instructors: 12,
    upcomingSessions: 21,
    passedTests: 187
  };

  // Recent bookings table
  recentBookings = [
    { student: 'Alice Brown', instructor: 'John Doe', date: '2025-04-20', time: '10:00 AM', status: 'Scheduled' },
    { student: 'Mark Smith', instructor: 'Jane Lee', date: '2025-04-19', time: '02:00 PM', status: 'Completed' },
    { student: 'Sara Khan', instructor: 'John Doe', date: '2025-04-18', time: '11:30 AM', status: 'Cancelled' },
    { student: 'Daniel Green', instructor: 'Ava Wong', date: '2025-04-17', time: '03:15 PM', status: 'Scheduled' },
    { student: 'Tom Hardy', instructor: 'Jane Lee', date: '2025-04-16', time: '09:00 AM', status: 'Completed' }
  ];

  ngOnInit(): void {
    this.createSessionChart();
  }

  createSessionChart(): void {
    const ctx = document.getElementById('sessionChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Driving Sessions',
          data: [35, 42, 38, 55, 60, 48],
          fill: true,
          tension: 0.4,
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
          borderColor: '#007bff',
          pointBackgroundColor: '#007bff',
          pointBorderColor: '#fff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#343a40'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  
}
