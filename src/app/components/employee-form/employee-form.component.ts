import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  
  employeeForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    lastName: ['', [Validators.required]],
    phoneNumber: [0, []],
    position: ['', [Validators.required]],
    departement: ['', [Validators.required]],
  });
  employeeId!: number;
  isEdit = false;
  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
    if (this.employeeId) {
      this.isEdit = true;
      this.httpService.getEmployee(this.employeeId).subscribe((result) => {
        console.log(result);
        this.employeeForm.patchValue(result);
        this.employeeForm.controls.email.disable();
      });
    }
  }
  save() {
    console.log(this.employeeForm.value);
    const employee: IEmployee = {
      firstName: this.employeeForm.value.firstName!,
      email: this.employeeForm.value.email!,
      lastName: this.employeeForm.value.lastName!,
      phoneNumber: this.employeeForm.value.phoneNumber!,
      position: this.employeeForm.value.position!,
      departement: this.employeeForm.value.departement!,
    };
    if (this.isEdit) {
      this.httpService
        .updateEmployee(this.employeeId, employee)
        .subscribe(() => {
          console.log('success');
          
          this.router.navigateByUrl('/employee-list');
        });
    } else {
      this.httpService.createEmployee(employee).subscribe(() => {
        console.log('success');
     
        this.router.navigateByUrl('/employee-list');
      });
    }
  }
}