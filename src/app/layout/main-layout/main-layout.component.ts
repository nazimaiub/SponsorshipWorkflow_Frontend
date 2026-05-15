import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  role: string | null = '';

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.role = localStorage.getItem('role');

  }

  logout(): void {

    localStorage.clear();

    this.router.navigate(['/auth/login']);
  }
}