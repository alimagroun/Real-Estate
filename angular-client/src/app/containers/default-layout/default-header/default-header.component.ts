import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../_services/storage.service';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  isLoggedIn!: boolean;

  constructor(private storageService: StorageService, private classToggler: ClassToggleService, private authService: AuthService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  onBuyLinkClick() {
    // Use the navigate method to add the 'status=sale' parameter to the route
    this.router.navigate(['/propertysearch'], { queryParams: { status: 'sale' } });
  }

  onRentLinkClick() {
    // Use the navigate method to add the 'status=rent' parameter to the route
    this.router.navigate(['/propertysearch'], { queryParams: { status: 'rent' } });
  }
  
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log("Logout successful.");
        this.storageService.clean();
        this.router.navigate(['/login']);
      },
    });
  }
}
