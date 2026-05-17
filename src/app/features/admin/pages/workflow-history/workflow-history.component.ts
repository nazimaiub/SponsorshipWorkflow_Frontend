import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-workflow-history',
  templateUrl: './workflow-history.component.html',
  styleUrls: ['./workflow-history.component.scss']
})
export class WorkflowHistoryComponent implements OnInit {

  histories: any[] = [];

  displayedColumns: string[] = [
    'requestId',
    'actionBy',
    'oldStatus',
    'newStatus',
    'remarks',
    'actionDate'
  ];

  constructor(private service: RequestService) {}

  ngOnInit() {
    this.loadHistories();
  }

  loadHistories() {
    this.service.GetAllHistories().subscribe(res => {
      this.histories = res;
    });
  }
}