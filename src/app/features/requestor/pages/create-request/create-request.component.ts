import { Component, Input, OnInit } from '@angular/core';
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
  isManagerApproveStatus = false;
  isFinanceApproveStatus = false;
  userRole: string = '';
  status: string = 'Draft'; // default
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
    else {
      this.isDraftStatus = true;
    }
  }

  getRequestById(id: string) {

    this.requestService.getRequestById(id).subscribe({

      next: (data) => {
        this.status=data.status;

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

        if (data.status === 'Draft' || data.status === 'Rejected By Manager') {

          this.isDraftStatus = true;
          if (data.status === 'Rejected By Manager') {

            this.requestForm.patchValue({
              remarks: data.managerRemarks
            });
          }
          this.requestForm.enable();

        }
        else if ((data.status === 'Pending Manager Approval' || data.status === 'Rejected By Finance') && this.userRole == 'manager') {

          this.isManagerApproveStatus = true;
          if (data.status === 'Rejected By Finance') {

            this.requestForm.patchValue({
              remarks: data.financeRemarks
            });
          }
          this.requestForm.enable();
        }
        else if (data.status === 'Pending Finance Review' && this.userRole == 'finance') {

          this.isFinanceApproveStatus = true;

          this.requestForm.enable();

        }
        else {

          this.isDraftStatus = false;

          this.requestForm.disable();
        }
      }
    });
  }
  CancelRequest() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.requestService.cancelRequest(id).subscribe({
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
        this.snackBar.open('Failed to cancel', 'Close', {
          duration: 3000
        });
      }
    });

  }

  approveManager() {
    const id = this.route.snapshot.paramMap.get('id');
    const remarks = this.requestForm.get('remarks')?.value;
    if (!id) {
      return;
    }
    this.requestService.approveManager(id, remarks).subscribe({
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
        this.snackBar.open('Failed to approve', 'Close', {
          duration: 3000
        });
      }
    });

  }

  rejectManager() {
    const id = this.route.snapshot.paramMap.get('id');
    const remarks = this.requestForm.get('remarks')?.value;
    if (!id) {
      return;
    }
    this.requestService.rejectManager(id, remarks).subscribe({
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
        this.snackBar.open('Failed to reject', 'Close', {
          duration: 3000
        });
      }
    });
  }

  approveFinance() {
    const id = this.route.snapshot.paramMap.get('id');
    const remarks = this.requestForm.get('remarks')?.value;
    if (!id) {
      return;
    }
    this.requestService.approveFinance(id, remarks).subscribe({
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
        this.snackBar.open('Failed to approve', 'Close', {
          duration: 3000
        });
      }
    });

  }

  rejectFinance() {
    const id = this.route.snapshot.paramMap.get('id');
    const remarks = this.requestForm.get('remarks')?.value;
    if (!id) {
      return;
    }
    this.requestService.rejectFinance(id, remarks).subscribe({
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
        this.snackBar.open('Failed to reject', 'Close', {
          duration: 3000
        });
      }
    });

  }


  getVisibleRemark(data: any): string {

    switch (data.status) {

      case 'Draft':
        return data.requestorRemarks;

      case 'Pending Manager Approval':
        return data.requestorRemarks;

      case 'Pending Finance Review':
        return data.managerRemarks;

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