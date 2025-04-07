import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { MaintenanceComponent } from '../forms/maintenance/maintenance.component';
import { DriverComponent } from '../forms/driver/driver.component';
import { VehicleComponent } from '../forms/vehicle/vehicle.component';

@Component({
  selector: 'app-createrequest',
  standalone: true, // ✅ Required for standalone components
  imports: [
    FormsModule,
    CommonModule,
    MaintenanceComponent,
    VehicleComponent,
    DriverComponent,
  ],
  templateUrl: './createrequest.component.html',
  styleUrls: ['./createrequest.component.css'],
})
export class CreaterequestComponent {
  primarySelection: string = '';
  secondarySelection: string = '';
  select: any;
  showSecondarySelect: boolean = true;
  primaryOptions: any = [];
  secondaryOptions: any = [];
  showmaintenance: boolean = false;
  showdriver: boolean = false;
  showvehicle: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getAll();
  }

  // Fetch all categories for the first dropdown
  getAll() {
    this.api.getCategory().subscribe((res: any) => {
      console.log('res', res);
      res.message.forEach((element: any) => {
        this.primaryOptions.push({
          id: element.id,
          value: element.type,
          label: element.type,
        });
      });
    });
  }

  // Handle change for the first dropdown
  onPrimaryChange() {
    console.log('primary option', this.primarySelection);
    this.secondarySelection = '';
    this.secondaryOptions = [];
    localStorage.removeItem('subcategory');
  
    this.showmaintenance = false;
    this.showdriver = false;
    this.showvehicle = false;
  
    const selectedOption = this.primaryOptions.find(
      (ele: any) => ele.value === this.primarySelection
    );
  
    if (!this.primarySelection) {
      // If no primary selected, clear secondary dropdown
      this.secondaryOptions = [];
      return; // Exit early
    }
  
    if (selectedOption) {
      this.select = selectedOption.id;
      this.getAllByID(this.select);
    }
  }
  
  
  // Handle change for the second dropdown
  onSecondaryChange() {
    console.log('secondary option', this.secondarySelection);
  
    if (this.secondarySelection === '') {
      localStorage.removeItem('subcategory');
    } else {
      const selectedOption = this.secondaryOptions.find(
        (ele: any) => ele.value === this.secondarySelection
      );
      if (selectedOption) {
        localStorage.setItem('subcategory', JSON.stringify(selectedOption));
      }
    }
   
    // Reset all
    this.showmaintenance = false;
    this.showdriver = false;
    this.showvehicle = false;
    
    if (this.primarySelection === this.primaryOptions[0]?.value && this.secondarySelection ) {
       this.showmaintenance = true;
    }
  
    // Other specific conditions (you can keep them if needed)
    if (this.secondarySelection === 'Driver Replacement') {
      this.showdriver = true;
    } else if (this.secondarySelection === 'Vehicle Replacement') {
      this.showvehicle = true;
    }
  }
  

  // Fetch categories based on selected ID for the second dropdown
  getAllByID(id: any) {
    console.log(id);
    this.secondaryOptions = []; // Clear secondary options

    this.api.getCategoryById(id).subscribe((res: any) => {
      console.log('result', res);
      res.message.forEach((element: any) => {
        this.secondaryOptions.push({
          id: element.id,
          value: element.type,
          label: element.type,
        });
      });

      // Set the default secondary selection if there are any options
      if (this.secondaryOptions.length > 0) {
        this.secondarySelection = ''; // Reset to default value
      }
    });
  }
}
