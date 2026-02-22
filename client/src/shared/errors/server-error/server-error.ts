import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from '../../../types/error';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css',
})
export class ServerError {
  protected error?: ApiError;
  private router = inject(Router)
  protected showDetails = false;


  constructor() {
    const state = this.router.currentNavigation()?.extras.state as { error?: ApiError } | undefined;
    this.error = state?.error;

  }

    detailsToggle() {
    this.showDetails = !this.showDetails;    
 
  }


}
