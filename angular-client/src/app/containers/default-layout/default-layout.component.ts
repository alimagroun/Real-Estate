import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouteConfigLoadEnd } from '@angular/router';
import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  showSidebar = true;
  ngOnInit() {
    const sidebar = this.activatedRoute.snapshot.firstChild?.data?.['sidebar'];
    if (sidebar ==false){this.showSidebar = false;}
  }
  }
  
