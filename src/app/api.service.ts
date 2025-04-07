import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  users: BehaviorSubject<any>;
  user: any;
  loginUrl = 'https://pnd.city-link.co.in/supervisorApis/login';
  getAllUrl = 'https://pnd.city-link.co.in/reports/expenceCategory/getall';
  getAllByIdUrl =
    'https://pnd.city-link.co.in/reports/expenceSubCategory/getall';
  getActiveContracts =
    'https://pnd.city-link.co.in/reports/userContract/getActive/contracts';
  getvehicleInfo =
    'https://pnd.city-link.co.in/reports/customercontractvehiclerequirement/dashboardAllVehicles';
  postRequestUrl = 'https://pnd.city-link.co.in/reports/expence/create';
  requestDetailsUrlPending= 'https://pnd.city-link.co.in/reports/expence/getworkflow';
  requestDetailsUrlCompleted= 'https://pnd.city-link.co.in/reports/expence/getworkflow/completed'
  requestDetailsUrlByID =
    'https://pnd.city-link.co.in/reports/expence/getworkflowbyid';
    updateUrl=' https://pnd.city-link.co.in/reports/expence/update'
  constructor(private http: HttpClient) {

    // Retrieve user data from localStorage if available
    const storedUser = localStorage.getItem('user');
    this.users = new BehaviorSubject(storedUser ? JSON.parse(storedUser) : {});
  }

  getLoginDetails(payload: any) {
    return this.http.post(this.loginUrl, payload);
  }

  updateUser() {
    const person = localStorage.getItem('user');
    console.log("user",person)
    if (person) {
      this.users.next(JSON.parse(person));
    }
  }

  // Check if the user is logged in
  isLoggedIn(): any {
    // console.log('Checking whether user is logged in or not');
    // console.log('User present:', this.users.value);
    const person = localStorage.getItem('user');
    // const user = this.users.value; // Get current value of BehaviorSubject
    // console.log(user);
    console.log(person);

    return person && Object.keys(person).length > 0; // Check if user object is not empty
  }

  // Logout function
  logout(): void {
    localStorage.removeItem('subcategory');

    localStorage.removeItem('user');
  }
  getCategory() {
    return this.http.get(this.getAllUrl);
  }
  getCategoryById(id: any) {
    return this.http.get(`${this.getAllByIdUrl}/${id}`);
  }

  getContractDropdown() {
    console.log('hello from dropdown contract');

    let user: any = localStorage.getItem('user');
    console.log(user);
    if (user) {
      // Parse the user from localStorage only if it exists
      user = JSON.parse(user);

      const Payload = {
        userId: user.userid,
      };
      console.error('Payload ', Payload);

      return this.http.post(this.getActiveContracts, Payload);
    } else {
      // Handle the case where there's no user in localStorage
      console.error('User not found in localStorage');
      return null; // Or you can throw an error or handle accordingly
    }
  }

  getPending(): any {
    console.log('hello from view component');
    let user: any = localStorage.getItem('user');
    console.log(user);
    if (user) {
      // Parse the user from localStorage only if it exists
      user = JSON.parse(user);

      const Payload = {
        userId: user.userid,
      };
      console.log('Payload ', Payload);

      return this.http.post(this.requestDetailsUrlPending, Payload);
    } else {
      // Handle the case where there's no user in localStorage
      console.error('User not found in localStorage');
      return null; // Or you can throw an error or handle accordingly
    }
  }
  getCompleted(): any {
    console.log('hello from view component');
    let user: any = localStorage.getItem('user');
    // console.log(user);
    if (user) {
      // Parse the user from localStorage only if it exists
      user = JSON.parse(user);

      const Payload = {
        userId: user.userid,
      };
      // console.log('Payload ', Payload);

      return this.http.post(this.requestDetailsUrlCompleted, Payload);
    } else {
      // Handle the case where there's no user in localStorage
      console.error('User not found in localStorage');
      return null; // Or you can throw an error or handle accordingly
    }
  }
  getvehicleInformation(contractName: any) {
    console.log('hello from dropdown contract');

    let user: any = localStorage.getItem('user');
    console.log(user);
    if (user) {
      // Parse the user from localStorage only if it exists
      user = JSON.parse(user);

      const Payload = {
        userId: user.userid,
        contractName: contractName,
      };
      console.error('Payload ', Payload);

      return this.http.post(this.getvehicleInfo, Payload);
    } else {
      // Handle the case where there's no user in localStorage
      console.error('User not found in localStorage');
      return null; // Or you can throw an error or handle accordingly
    }
  }

  postRequest(data: any) {
    console.log("form data in service----------------------------------------------",data)
    let user: any = localStorage.getItem('user');
    let subcategory: any = localStorage.getItem('subcategory');

    console.log("user ===============",user);
    console.log("subcategory ===============",subcategory);

    if (user && subcategory) {
      // Parse the user from localStorage only if it exists
      user = JSON.parse(user);
      subcategory = JSON.parse(subcategory);

      const Payload = {
        userId: user.userid,
        subcategoryId: subcategory.id,
        data: data,
      };
      console.error('Payload ', Payload);

      return this.http.post(this.postRequestUrl, Payload);
    } else {
      // Handle the case where there's no user in localStorage
      console.error('User not found in localStorage');
      return null; // Or you can throw an error or handle accordingly
    }
  }

  getWorkFlowById(id: any):any {
    console.log('id', id);

    let user: any = localStorage.getItem('user');

    console.log(user);
    if (user) {
      // Parse the user from localStorage only if it exists
      user = JSON.parse(user);

      const Payload = {
        userId: user.userid,
        id: id,
      };
      console.error('Payload ', Payload);

      return this.http.post(this.requestDetailsUrlByID, Payload);
    } else {
      // Handle the case where there's no user in localStorage
      console.error('User not found in localStorage');
      return null; // Or you can throw an error or handle accordingly
    }
  }
  approveRequest(val:any):any{
    console.log("value val",val)
    let user: any = localStorage.getItem('user');

    console.log(user);
    if (user) {
      // Parse the user from localStorage only if it exists
      user = JSON.parse(user);

      const Payload = {
        status: val.status,
        id: val.userId,
        userId: user.userid,
      };
      console.error('Payload ', Payload);

      return this.http.post(this.updateUrl, Payload);
    } else {
      // Handle the case where there's no user in localStorage
      console.error('User not found in localStorage');
      return null; // Or you can throw an error or handle accordingly
    }
  }
}
