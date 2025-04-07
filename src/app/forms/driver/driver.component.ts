import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-driver',
  imports: [FormsModule, CommonModule, DialogModule, ButtonModule],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css',
})
export class DriverComponent {
   vehicleSelection:any='';
   contractSelection:any='';
   contractOptions: any[] = [];
   vehicleOptions: any[] = [];
   selectedVehicle: any = {
     driverName: '',
     vendorName: '',
   
   };
   displayModal: boolean = false;  // Controls dialog visibility
   modalMessage: string = '';      // Stores the success/error message
   isError: boolean = false;       // Flag to indicate error
   errorMessage:string = ''; 
   disabled:boolean =false;

   constructor(private api: ApiService) {}
 
   ngOnInit() {
     this.contractListDropdown();
   }
 
   contractListDropdown() {
     this.api.getContractDropdown()?.subscribe((res: any) => {
       this.contractOptions = res.result.map((ele: any) => ({
         contractName: ele.ongoing_customercontract.customer_info.CompanyName,
         contractId: ele.contractID,
       }));
     });
   }
 
   onContractChange() {
     console.log('Selected Contract:', this.contractSelection);
     this.getVehicleInfo(this.contractSelection);
   }
 
   getVehicleInfo(name: string) {
     this.api.getvehicleInformation(name)?.subscribe((res: any) => {
       this.vehicleOptions = res.message; // Replace instead of pushing
     });
   }
 
   onVehicleChange() {
     console.log('Selected Vehicle:', this.vehicleSelection);
 
     const selected = this.vehicleOptions.find(
       (ele: any) => ele.vehicleNo === this.vehicleSelection
     );
 
     if (selected) {
       this.selectedVehicle = {
        driverName: selected.driverName,
         vendorName: selected.VendorName,
       };
     }
   }
 
   
   driverForm(form: any) {
      
    this.disabled = true;
    console.log("form values",form.value);

    this.api.postRequest(form.value)?.subscribe(
       (response: any) => {
        console.log('Response:', response);

        if (response.status === true) {
          form.reset()
          this.contractSelection = ''; 
          this.vehicleSelection = '';

          this.modalMessage = 'The API call was successful!';
          this.isError = false;
        } else {
          this.errorMessage=response.message || 'Error'
          this.modalMessage = response.error || 'An unexpected error occurred.';
          this.isError = true;
        }
        
        this.displayModal = true; // Show modal for success or failure
      },
      (error) => {
        console.error('API error:', error);

        this.modalMessage = 'Failed to process request. Please try again later.';
        this.isError = true;
        this.displayModal = true; // Show modal on error
      }
    );
   }
 
   
   closeModal() {
    this.disabled =false;

    this.displayModal = false; // Close the modal
  }
 }
 