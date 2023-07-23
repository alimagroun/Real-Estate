import { Component, Input, OnInit, HostListener} from '@angular/core';
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
  showSidebarToggler = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Check the screen width and set showSidebarToggler accordingly
    this.showSidebarToggler = window.innerWidth <= 768; // Adjust the value (768) as needed for your breakpoint
  }

  constructor(private storageService: StorageService, private classToggler: ClassToggleService, private authService: AuthService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.showSidebarToggler = window.innerWidth <= 768;
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
