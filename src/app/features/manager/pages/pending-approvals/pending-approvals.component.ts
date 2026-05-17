import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-pending-approvals',
  templateUrl: './pending-approvals.component.html',
  styleUrls: ['./pending-approvals.component.scss']
})
export class PendingApprovalsComponent implements OnInit {
  pendingRequests: any[] = [];

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {

    this.requestService
      .GetAllMyRequests()
      .subscribe(res => {

        this.pendingRequests = res;
      });
  }

}
