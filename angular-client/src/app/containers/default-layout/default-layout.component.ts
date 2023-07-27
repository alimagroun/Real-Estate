import { Component, OnInit } from '@angular/core';
import { navItems } from './_nav';
import { INavData } from '@coreui/angular';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  public navItems: INavData[] = []; 
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  public isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {

    this.authService.isAdmin().subscribe((admin) => {
      this.isAdmin = admin;
  
      this.navItems = this.getModifiedNavItems();
    });
  }

  private getModifiedNavItems(): INavData[] { 
 
    const modifiedNavItems = [...navItems];

    if (this.isAdmin) {
      const adminLinks: INavData[] = [
        {
          name: 'Property List',
          url: '/propertylist',
        },
        {
          name: 'Message List',
          url: '/messagelist',
        },
      ];

      modifiedNavItems.push(...adminLinks);
    }

    return modifiedNavItems;
  }
}
