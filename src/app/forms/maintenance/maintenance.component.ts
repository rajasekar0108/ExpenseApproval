import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [FormsModule, CommonModule, DialogModule, ButtonModule],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.css',
})
export class MaintenanceComponent {
  contractSelection: string = '';
  vehicleSelection: string = '';

  contractOptions: any[] = [];
  vehicleOptions: any[] = [];
  cost: string = '';

  selectedVehicle: any = {
    vehicleType: '',
    vendorName: '',
    vendorAcc: '',
    ifsc: '',
    bank: '',
    branch: '',
    cost: '',  

  };

  displayModal: boolean = false; // Controls dialog visibility
  modalMessage: string = ''; // Stores the success/error message
  isError: boolean = false; // Flag to indicate error
  subcategoryError: boolean = false;
  errorMessage: string = '';
  disabled: boolean = false;

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
      this.vehicleOptions = res.message;
    });
  }

  onVehicleChange() {
    console.log('Selected Vehicle:', this.vehicleSelection);

    const selected = this.vehicleOptions.find(
      (ele: any) => ele.vehicleNo === this.vehicleSelection
    );

    if (selected) {
      this.selectedVehicle = {
        vehicleType: selected.makeAndModel,
        vendorName: selected.VendorName,
        vendorAcc: selected.BankACno,
        ifsc: selected.IFSC,
        bank: selected.BankName,
        branch: selected.Branch,
        cost:this.cost
      };
    }
  }

  maintenanceForm(form: any) {
    console.log('clicked');

    this.disabled = true;

    if (localStorage.getItem('subcategory')) {
        this.api.postRequest(form.value)?.subscribe(
            (response: any) => {
                console.log('Response:', response);

                if (response.status === true) {
                    this.modalMessage = 'The API call was successful!';
                    this.isError = false;

                    // Reset Form Fields after successful API call
                    form.resetForm(); 
                    
                    // Reset dropdown selections to the default "Select Type"
                    this.contractSelection = ''; 
                    this.vehicleSelection = '';

                    // Clear selected vehicle details
                    this.selectedVehicle = {
                        vehicleType: '',
                        vendorName: '',
                        vendorAcc: '',
                        ifsc: '',
                        bank: '',
                        branch: '',
                        cost: ''
                    };
                } else {
                    this.errorMessage = response.message || 'Error';
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
    } else {
        console.log('Please choose a valid Subcategory');
        this.errorMessage = 'Please choose a valid Subcategory';
        this.isError = true;
        this.displayModal = true;
    }
}


  closeModal() {
    console.log('modal closed');
    this.disabled = false;

    this.displayModal = false;
  }
}
