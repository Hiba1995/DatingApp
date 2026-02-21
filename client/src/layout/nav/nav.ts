import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {

  protected accountService = inject(AccountService)
    private router  = inject(Router)
  protected creds: any = {};

  private toast = inject(ToastService)
  // protected loggedIn = signal(false);



  login() { // i should subscribe because it return an observable 
    this.accountService.login(this.creds).subscribe({
      next: result => {
        this.router.navigateByUrl('/members');     
        this.creds = {};
        this.toast.successToast("Loged In Successfully!")
      },
      error: error => {
      this.toast.errorToast(error.error);
      }
    })
    localStorage.setItem('isLoggedIn', 'true');

  }

  logout() {
    this.accountService.logout(this.creds);
    this.router.navigateByUrl('/');

  }

}
