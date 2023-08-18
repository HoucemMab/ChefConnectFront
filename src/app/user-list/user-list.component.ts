import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[] = []; // Array to hold the list of users
  subscribedUserId: number | null = null; // To track subscribed user
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const userIdString = localStorage.getItem('userId');
    if (userIdString) {
      const userId = parseInt(userIdString, 10);
      this.userService.getUsers().subscribe((users: any[]) => {
        this.users = users.filter((user) => user.userId !== userId);
      });
    }
  }

  subscribeUser(subscriberId: number, targetUserId: number): void {
    this.userService.subscribeUser(subscriberId, targetUserId).subscribe(
      () => {
        // Show a success message
        this.subscribedUserId = targetUserId;
      },
      (error) => {
        // Handle error
        console.error('Error:', error);
        // Display an error message to the user if needed
        console.log('errorMessage:', this.errorMessage);

        this.errorMessage =
          'An error occurred while subscribing. You may be already subscribed this user ';
      }
    );
  }
}
