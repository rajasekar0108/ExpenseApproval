import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaintenanceComponent } from '../forms/maintenance/maintenance.component';
import { VehicleComponent } from '../forms/vehicle/vehicle.component';
import { DriverComponent } from '../forms/driver/driver.component';
 
@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    CommonModule,
    MaintenanceComponent,
    VehicleComponent,
    DriverComponent,
 ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  primarySelection: string = '';
  secondarySelection: string = '';

  showSecondarySelect: boolean = true;

  primaryOptions = [
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'replacement', label: 'Replacement' },
  ];

  secondaryOption = {
    maintenance: [
      { value: 'battery', label: 'Battery' },
      { value: 'tyre', label: 'Tyre' },
      { value: 'other', label: 'Others' },
    ],
    replacement: [
      { value: 'driver', label: 'Driver' },
      { value: 'vehicle', label: 'Vehicle' },
    ],
  };
  secondaryOptions: any;
  showmaintenance: boolean = false;
  showdriver: boolean = false;
  showvehicle: boolean = false;

  onPrimaryChange() {
    
    if (this.primarySelection === 'maintenance') {
      this.secondaryOptions = this.secondaryOption.maintenance;
       this.showvehicle = false;
      this.showdriver  = false;
      //  maintenance form true remaining false
      this.showmaintenance = true;

    } else if (this.primarySelection === 'replacement') {
      this.secondaryOptions = this.secondaryOption.replacement;
      this.showmaintenance = false;
      this.showvehicle = false;
      this.showdriver  = false;
    }
   // show second dropdown
   console.log('both form selected value', this.primarySelection ,this.secondarySelection);
   this.secondarySelection=''
   console.log('both form selected value', this.primarySelection ,this.secondarySelection);

    this.showSecondarySelect = true;
  }

  onSecondaryChange() {
    console.log('second form value', this.secondarySelection);
    if (this.secondarySelection === 'vehicle') {

      this.showdriver = false;
      this.showmaintenance = false;
      //  vehicle form true remaining false
      this.showvehicle = true;
    } else if (this.secondarySelection === 'driver') {
       this.showmaintenance = false;
      this.showvehicle = false;
       //  driver form true remaining false

      this.showdriver = true;

    }
  }

  maintenanceForm(form: any) {
    console.log('maintainace form values', form.value);
  }
  vehicleForm(form: any) {
    console.log('Vehicle Replacement form values', form.value);
  }
  driverForm(form: any) {
    console.log('Driver Replacement form values', form.value);
  }
}
