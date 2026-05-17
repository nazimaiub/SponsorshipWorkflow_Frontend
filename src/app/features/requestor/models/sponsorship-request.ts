export interface SponsorshipRequest {
  requestTitle: string;
  department: string;
  sponsorshipType: string;
  eventName: string;
  eventDate: string;
  requestedAmount: number;
  purpose: string;
  remarks?: string;
  status?: string;
  requestorId?: string;
  requestorEmail?: string;
  managerRemarks?: string;
  financeRemarks?: string;
  createdAt?: string;
  updatedAt?: string;
}