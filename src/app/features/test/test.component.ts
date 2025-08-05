import { Component, inject, Input } from '@angular/core';
import { AcademicQualificationModel } from '../../shared/models/classes/academicQualification';
import { SignUpModel } from '../../shared/models/classes/SignUp';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';
import { Router, RouterLink } from '@angular/router';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-test',
  imports: [FormsModule, CommonModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  today = new Date().toLocaleDateString();
  chart: any;

  // Dashboard stats
  stats = {
    students: 248,
    instructors: 12,
    upcomingSessions: 21,
    passedTests: 187,
    trainings: 5,
    completedExams: 15
  };

  // Recent bookings table
  recentBookings = [
    { student: 'Alice Brown', instructor: 'John Doe', type: 'Training', date: '2025-04-20', time: '10:00 AM', status: 'Scheduled' },
    { student: 'Mark Smith', instructor: 'Jane Lee', type: 'Seminar', date: '2025-04-19', time: '02:00 PM', status: 'Completed' },
    { student: 'Sara Khan', instructor: 'John Doe', type: 'Examination', date: '2025-04-18', time: '11:30 AM', status: 'Cancelled' },
    { student: 'Daniel Green', instructor: 'Ava Wong', type: 'Training', date: '2025-04-17', time: '03:15 PM', status: 'Scheduled' },
    { student: 'Tom Hardy', instructor: 'Jane Lee', type: 'Seminar', date: '2025-04-16', time: '09:00 AM', status: 'Completed' }
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

