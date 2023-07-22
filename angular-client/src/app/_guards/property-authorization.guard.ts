import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyAuthorizationGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const propertyId = +next.params['propertyId']; // Access the property ID from the route parameters

    return this.authService.isLoggedIn().pipe(
      tap((loggedIn: boolean) => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        } else {
          this.authService.isAuthorized(propertyId).subscribe((authorized: boolean) => {
            if (!authorized) {
              this.router.navigate(['/403']);
            }
          });
        }
      })
    );
  }
}
