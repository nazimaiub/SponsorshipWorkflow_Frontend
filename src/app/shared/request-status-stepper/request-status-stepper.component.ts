import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-request-status-stepper',
  templateUrl: './request-status-stepper.component.html',
  styleUrls: ['./request-status-stepper.component.scss']
})
export class RequestStatusStepperComponent implements OnChanges {

  @Input() status: string = '';

  steps = [
    'Draft',
    'Pending Manager Approval',
    'Pending Finance Review',
    'Approved'
  ];

  currentIndex = 0;

  ngOnChanges(): void {
    this.currentIndex = this.getStepIndex(this.status);
  }

  private getStepIndex(status: string): number {

    switch (status) {

      case 'Draft':
        return 0;

      case 'Pending Manager Approval':
        return 1;

      case 'Pending Finance Review':
        return 2;

      case 'Approved':
        return 3;

      // ❌ ANY REJECT → STOP AT PREVIOUS STAGE
      case 'Rejected By Manager':
        return 0; // Draft stage only

      case 'Rejected By Finance':
        return 1; // Manager stage only

      default:
        return 0;
    }
  }

  isCompleted(index: number): boolean {
    return index < this.currentIndex;
  }

  isActive(index: number): boolean {
    return index === this.currentIndex;
  }

  isDisabled(index: number): boolean {
    return index > this.currentIndex;
  }
}