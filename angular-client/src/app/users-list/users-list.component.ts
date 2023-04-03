import { Component } from '@angular/core';
import {User} from '../_models/user';
import {AuthService} from '../_services/auth.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  users?: User[];
  currentTutorial: User = {};
  currentIndex = -1;
  title = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers():void{
    this.authService.getAll()
    .subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

}
