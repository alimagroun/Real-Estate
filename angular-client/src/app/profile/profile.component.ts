import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private storageService: StorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log("Logout successful.");
        this.storageService.clean(); // Assuming this clears any stored user data
  
        window.location.reload(); // Refresh the page after logout
      },
      error: (err) => {
        console.log("Logout error:", err);
      }
    });
  }
  
}