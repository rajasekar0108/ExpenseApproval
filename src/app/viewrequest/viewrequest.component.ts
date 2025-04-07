import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../app/api.service';
import { TabViewModule } from 'primeng/tabview';
 
 @Component({ 
  selector: 'app-viewrequest',
  standalone: true,
  templateUrl: './viewrequest.component.html',
  styleUrls: ['./viewrequest.component.css'],
  imports: [CommonModule, TableModule, ButtonModule,TabViewModule,DatePipe ] 
})
export class ViewrequestComponent implements OnInit {
  usersPending: any[] = []; // This will be filled dynamically
  usersCompleted:any[]=[]
  selectedUser: any; 
  status:any=''
  type:any=''
  selectedUser1: any;
  selectedUser2: any;
  category:any=''



  constructor(private router: Router, private api: ApiService,private datePipe: DatePipe) {}

  ngOnInit() {
   
    console.log("Component initialized");
    this.getPending(); 
    this.getCompleted() 
  }
// pending
  getPending() {
    console.log("Fetching expense details...");
    
    this.api.getPending().subscribe(
      (res: any) => {
        console.log("API Response:", res.result);
        this.usersPending=res.result
       },
      (error:any) => console.error("Error fetching data:", error.message)
    );
  }

  // completed
  getCompleted() {
    console.log("Fetching expense details...");
    
    this.api.getCompleted().subscribe(
      (res: any) => {
        console.log("API Response:", res.result);
        this.usersCompleted=res.result
       },
      (error:any) => console.error("Error fetching data:", error.message)
    );
  }

  onRowSelect(event: any,tableType: string) {
    console.log('Row selected:', event);
    if (event?.data?.id) {
      console.log('Navigating to request-details/', event.data.id);
      this.router.navigate(['/request-details', event.data.id,tableType]);
    } else {
      console.error('User ID is undefined');
    }
  }

  checkSelection() {
    console.log('Selected user:', this.selectedUser);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'status-pending';

      case 'approvedByManager':
        return 'approvedByManager';

        case 'approvedByDirector':
          return 'approvedByDirector';
          
        case 'rejectedByManager':
          return 'rejectedByManager';
     
          case 'rejectedByDirector':
            return 'rejectedByDirector';
       
      default:
        return 'status-default';
    }
  }
  
}
