import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SponsorshipRequest } from '../features/requestor/models/sponsorship-request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = 'https://sponsorshipworkflow-backend.onrender.com/api/requests';

  constructor(private http: HttpClient) { }

  getAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  // SAVE AS DRAFT
  saveDraft(data: SponsorshipRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/draft`, data);
  }

  // SUBMIT REQUEST
  submitRequest(data: SponsorshipRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit`, data);
  }
  // GET MY REQUESTS
  GetAllMyRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/my-requests`);
  }

  getRequestById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/request-by-id/${id}`);
  }
  cancelRequest(id: string) {
    return this.http.get<any>(`${this.baseUrl}/cancelByRequestor/${id}`);
  }
  approveManager(id: string, remarks: string) {
    return this.http.get<any>(
      `${this.baseUrl}/approveByManager/${id}?remarks=${encodeURIComponent(remarks)}`
    );
  }

  rejectManager(id: string, remarks: string) {
    return this.http.get<any>(
      `${this.baseUrl}/rejectedByManager/${id}?remarks=${encodeURIComponent(remarks)}`
    );
  }
  approveFinance(id: string, remarks: string) {
    return this.http.get<any>(
      `${this.baseUrl}/approveByFinance/${id}?remarks=${encodeURIComponent(remarks)}`
    );
  }
  rejectFinance(id: string, remarks: string) {
    return this.http.get<any>(
      `${this.baseUrl}/rejectedByFinance/${id}?remarks=${encodeURIComponent(remarks)}`
    );
  }
  create(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${id}/status`, { status });
  }
}