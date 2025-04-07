import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../app/api.service';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
declare var bootstrap: any; // Ensure Bootstrap is available globally

@Component({
  selector: 'app-request-details',
  standalone: true,
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ToastModule,
    ButtonModule,
    ConfirmDialog,
  ],
  providers: [ConfirmationService, MessageService], // Add PrimeNG services here
})
export class RequestDetailsComponent implements OnInit, AfterViewInit {
  userId: number | null = null;
  details: any = {};
  myForm: FormGroup = new FormGroup({
    createdAt: new FormControl(''),
    updatedAt: new FormControl(''),
    Categorytype: new FormControl(''),
    SubCategorytype: new FormControl(''),
    age: new FormControl(''),
  });
  modalInstance: any;
  displayDialog: boolean = false;

  isApproveAccess: any = true;
  tableType: any;
  createdAt: any;
  updatedAt: any;
  Categorytype: any;
  SubCategorytype: any;
  requester: any;
  status: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private date:DatePipe
  ) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.tableType = this.route.snapshot.paramMap.get('tableType');
    console.log('tabletype is ==============', this.tableType);
    this.getDetailsById();
  }

  ngAfterViewInit() {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  getDetailsById() {
    console.log(this.userId);
    this.api.getWorkFlowById(this.userId).subscribe(
      (res: any) => {
        console.log('Full API Response  :', res.result);
        console.log('Details Api Response:', res.result.details);


    this.createdAt=res.result['createdAt'],
     this.updatedAt=res.result['updatedAt'],
          this.Categorytype= res.result['expenceSubCategory.expenceCategory.type'],
         this.SubCategorytype= res.result['expenceSubCategory.type'],
   this.requester=res.result['admin_credential.Employeename']
   this.status=res.result.status


        // this.myForm.patchValue({
        //   createdAt: res.result['expenceSubCategory.expenceCategory.createdAt'],
        //   updatedAt: res.result['expenceSubCategory.expenceCategory.updatedAt'],
        //   Categorytype: res.result['expenceSubCategory.expenceCategory.type'],
        //   SubCategorytype: res.result['expenceSubCategory.type'],
        // });
        this.isApproveAccess = res.result.isApproveAccess;
        console.log('approve or reject', this.isApproveAccess);
        this.details = res.result.details;
        this.createFormControls();
      },
      (error: any) => console.error('Error fetching data:', error.message)
    );
  }

  createFormControls() {
    const controls: { [key: string]: FormControl } = {};

    Object.keys(this.details).forEach((key) => {
      controls[key] = new FormControl(this.details[key] || '');
    });

    controls['status'] = new FormControl('');
    this.myForm = new FormGroup(controls);
  }

  getKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  confirm() {
    console.log('confirm clicked');
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Please confirm to proceed moving forward.',
      icon: 'pi pi-exclamation-circle',
      rejectButtonProps: {
        label: 'Cancel',
        icon: 'pi pi-times',
        outlined: true,
        size: 'small',
      },
      acceptButtonProps: {
        label: 'Save',
        icon: 'pi pi-check',
        size: 'small',
      },
      accept: () => {
        // this.messageService.add({ severity: 'info', summary: 'Processing', detail: 'Approval in progress...', life: 2000 });

        const payload = {
          status: 'approved',
          userId: this.userId,
        };

        // Call the API to approve the request
        this.api.approveRequest(payload).subscribe(
          (res: any) => {
            console.log(
              'API Response========:',
              res,
              res.status,
              res.status ? 'Failed' : 'success3'
            );
            this.messageService.add({
              severity: res.status ? 'success' : 'error',
              summary: res.status ? 'Success' : 'Failed',
              detail: res.message || 'Approval successful!',
              life: 30000,
            });

            // Hide Bootstrap modal if it's open
            if (this.modalInstance) {
              this.modalInstance.hide();
            }

            // Ensure Bootstrap backdrop and modal-open class are removed
            setTimeout(() => {
              document.body.classList.remove('modal-open');
              document.querySelector('.modal-backdrop')?.remove();
            }, 100);

            // Redirect after approval
            setTimeout(() => {
              this.router.navigate(['/view']);
            }, 1000);
          },
          (error: any) => {
            console.error('Error:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error?.message || 'Approval failed!',
              life: 3000,
            });
          }
        );
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cancel',
          detail: 'You have cancelled',
          life: 3000,
        });
      },
    });
  }

  reject() {
    console.log('reject clicked');
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Please confirm to proceed moving forward.',
      icon: 'pi pi-exclamation-circle',
      rejectButtonProps: {
        label: 'Cancel',
        icon: 'pi pi-times',
        outlined: true,
        size: 'small',
      },
      acceptButtonProps: {
        label: 'Save',
        icon: 'pi pi-check',
        size: 'small',
      },
      accept: () => {
        // this.messageService.add({ severity: 'info', summary: 'Processing', detail: 'Approval in progress...', life: 2000 });

        const payload = {
          status: 'rejected',
          userId: this.userId,
        };

        // Call the API to approve the request
        this.api.approveRequest(payload).subscribe(
          (res: any) => {
            console.log(
              'API Response========:',
              res,
              res.status,
              res.status ? 'Failed' : 'success3'
            );
            this.messageService.add({
              severity: res.status ? 'success' : 'error',
              summary: res.status ? 'Success' : 'Failed',
              detail: res.message || 'Approval successful!',
              life: 30000,
            });

            // Hide Bootstrap modal if it's open
            if (this.modalInstance) {
              this.modalInstance.hide();
            }

            // Ensure Bootstrap backdrop and modal-open class are removed
            setTimeout(() => {
              document.body.classList.remove('modal-open');
              document.querySelector('.modal-backdrop')?.remove();
            }, 100);

            // Redirect after approval
            setTimeout(() => {
              this.router.navigate(['/view']);
            }, 1000);
          },
          (error: any) => {
            console.error('Error:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error?.message || 'Approval failed!',
              life: 3000,
            });
          }
        );
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cancel',
          detail: 'You have cancelled',
          life: 3000,
        });
      },
    });
  }
}
