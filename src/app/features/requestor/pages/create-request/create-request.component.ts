import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {
  isViewMode = false;
  isDraftStatus = false;
  userRole: string = '';
  constructor(private fb: FormBuilder,
    private requestService: RequestService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  requestForm = this.fb.group({
    id: [null],
    requestTitle: ['', Validators.required],
    department: ['', Validators.required],
    sponsorshipType: ['', Validators.required],
    eventName: ['', Validators.required],
    eventDate: ['', Validators.required],
    requestedAmount: ['', Validators.required],
    purpose: ['', Validators.required],
    remarks: ['']
  });

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    this.userRole = localStorage.getItem('role') || '';
    console.log("role" + this.userRole);

    if (id) {

      this.isViewMode = true;

      this.getRequestById(id);
    }
  }

  getRequestById(id: string) {

    this.requestService.getRequestById(id).subscribe({

      next: (data) => {

        this.requestForm.patchValue({
          id: data.id,
          requestTitle: data.requestTitle,
          department: data.department,
          sponsorshipType: data.sponsorshipType,
          eventName: data.eventName,
          eventDate: data.eventDate?.split('T')[0],
          requestedAmount: data.requestedAmount,
          purpose: data.purpose,
          remarks: this.getVisibleRemark(data)
        });

        // Draft হলে editable

        if (data.status === 'Draft') {

          this.isDraftStatus = true;

          this.requestForm.enable();

        }
        else {

          this.isDraftStatus = false;

          this.requestForm.disable();
        }
      }
    });
  }

  getVisibleRemark(data: any): string {

    switch (data.status) {

      case 'Draft':
        return data.requestorRemarks;

      case 'Pending Manager Approval':
        return data.managerRemarks;

      case 'Pending Finance Review':
        return data.financeRemarks;

      default:
        return '';
    }
  }

  saveDraft() {
    this.requestService.saveDraft(this.requestForm.value).subscribe({
      next: (data) => {
        this.requestForm.patchValue({
          id: data.id
        });
        this.snackBar.open(data.message, 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      },
      error: () => {
        this.snackBar.open('Failed to save draft', 'Close', {
          duration: 3000
        });
      }
    });
  }

  submitRequest() {
    this.requestService.submitRequest(this.requestForm.value).subscribe({
      next: (data) => {
        this.requestForm.patchValue({
          id: data.id
        });
        this.snackBar.open(data.message, 'Close', {
          duration: 3000
        }).afterDismissed().subscribe(() => {
          this.router.navigate(['/requestor']);
        });
      },
      error: () => {
        this.snackBar.open('Failed to submit', 'Close', {
          duration: 3000
        });
      }
    });
  }

}