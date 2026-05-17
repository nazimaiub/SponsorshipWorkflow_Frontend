import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {

  displayedColumns: string[] = [
  'title',
  'status',
  'created',
  'action'
  ];
  @Input() requests: any[] = [];
  @Input() title: string = '';
  dataSource: any[] = [];
  //requests: any[] = [];
  filteredData: any[] = [];

  searchText: string = '';

  userRole: string = '';
   
  constructor(private router: Router,
    private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadData();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userRole = user.role;
  }

  loadData(): void {
    this.requestService.GetAllMyRequests().subscribe({
      next: (res) => {
        this.dataSource = res;
        this.requests=res;
        this.filteredData = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  viewRequest(id: string) {
    console.log("id"+id);
  this.router.navigate(['requestor/view', id]);
}
  applyFilter(): void {
    const text = this.searchText.toLowerCase().trim();

    this.filteredData = this.dataSource.filter(item =>
      item.title?.toLowerCase().includes(text) ||
      item.status?.toLowerCase().includes(text) ||
      item.id?.toString().includes(text)
    );
  }

}
