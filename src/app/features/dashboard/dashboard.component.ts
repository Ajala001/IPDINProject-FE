import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,
    CommonModule,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
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


latestStudents = [
  { name: 'Amina Bello', registeredDate: '2025-08-01', status: 'Active' },
  { name: 'John Doe', registeredDate: '2025-08-02', status: 'Pending' },
];

upcomingEvents = [
  { title: 'Driving Seminar', type: 'Seminar', date: '2025-08-10' },
  { title: 'Practical Training', type: 'Training', date: '2025-08-12' }
];

notifications = [
  { message: '2 instructors are yet to confirm availability' },
  { message: 'Seminar slots filling up quickly!' }
];

@ViewChild('sessionChartRef') sessionChartRef!: ElementRef;
  @ViewChild('revenueChartRef') revenueChartRef!: ElementRef;

  ngAfterViewInit(): void {
    this.createCharts();
  }

  createCharts(): void {
    const sessionCtx = this.sessionChartRef.nativeElement.getContext('2d');
    const revenueCtx = this.revenueChartRef.nativeElement.getContext('2d');

    new Chart(sessionCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          label: 'Sessions',
          data: [12, 15, 9, 20],
          borderColor: '#28a745',
          backgroundColor: 'rgba(40, 167, 69, 0.2)',
          fill: true,
          tension: 0.4
        }]
      }
    });

    new Chart(revenueCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          label: 'Revenue (₦)',
          data: [50000, 65000, 40000, 80000],
          backgroundColor: '#28a745'
        }]
      }
    });
  }

}
