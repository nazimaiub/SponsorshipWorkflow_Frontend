import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {

  constructor(private fb: FormBuilder) {}

  requestForm = this.fb.group({
    requestTitle: ['', Validators.required],
    department: ['', Validators.required],
    sponsorshipType: ['', Validators.required],
    eventName: ['', Validators.required],
    eventDate: ['', Validators.required],
    requestedAmount: ['', Validators.required],
    purpose: ['', Validators.required],
    expectedBusinessBenefit: [''],
    remarks: ['']
  });

  ngOnInit(): void {}

  saveDraft() {
    console.log('Draft Saved', this.requestForm.value);
    // call API later
  }

  submitRequest() {
    if (this.requestForm.invalid) return;

    console.log('Submitted', this.requestForm.value);
    // call API later
  }
}