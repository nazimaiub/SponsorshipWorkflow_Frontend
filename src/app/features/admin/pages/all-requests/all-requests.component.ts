import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss']
})
export class AllRequestsComponent implements OnInit {

  displayedColumns: string[] = [
  'id',
  'title',
  'status',
  'created',
  'action'
];
 requests = [
    {
      id: 1,
      title: 'Tech Conference Sponsorship',
      status: 'Pending',
      createdAt: '2026-05-16'
    },
    {
      id: 2,
      title: 'University Event',
      status: 'Approved',
      createdAt: '2026-05-15'
    }
  ];
  dataSource: any[] = [];
  filteredData: any[] = [];

  searchText: string = '';

  userRole: string = '';

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadData();

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userRole = user.role;
  }

  loadData(): void {
    this.requestService.getAllRequests().subscribe({
      next: (res) => {
        this.dataSource = res;
        this.filteredData = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  applyFilter(): void {
    const text = this.searchText.toLowerCase().trim();

    this.filteredData = this.dataSource.filter(item =>
      item.title?.toLowerCase().includes(text) ||
      item.status?.toLowerCase().includes(text) ||
      item.id?.toString().includes(text)
    );
  }

  isAdmin(): boolean {
    return this.userRole === 'Admin';
  }
}