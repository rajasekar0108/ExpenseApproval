import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterLink,RouterModule],
 
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isProfileOpen = false;
  isProfileOpene = false;

 
  userDetails: any;
  constructor(
   
    private router: Router,
    private eRef: ElementRef,
    private api: ApiService,
   private authService: AuthService 

  ) {}

  ngOnInit() {
     this.router.events.subscribe((event) => {
    console.log("Current Route:", this.router.url);
  });
    this.api.users.subscribe((data: any) => {
      console.log("user details ",data)

      this.userDetails = data;
    });
    console.log("user detail",this.userDetails)
  }
 
  signOut() {
     this.isProfileOpen = false;
     this.api.logout();

    this.router.navigate(['/login']);
  }
  showProfile() {
    this.isProfileOpen = !this.isProfileOpen;
    console.log(this.isProfileOpen);
  }
  showProfilee(event:any) {
    this.isProfileOpene = !this.isProfileOpene;
  }
  
  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isProfileOpen = false;
    }
  }
}
