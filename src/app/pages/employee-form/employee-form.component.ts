import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { IEmployee } from '../shared/models/Employee';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnChanges {
  @Input() employeeDtos: IEmployee | null = null;
  @Output() onCloseModel = new EventEmitter();

  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {
    this.employeeForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl(0, [Validators.required]),
      position: new FormControl('', [Validators.required]),
      departement: new FormControl('', [Validators.required]),
    });
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.employeeDtos) {
      this.employeeForm.patchValue({
        firstName: this.employeeDtos.firstName,
        lastName: this.employeeDtos.lastName,
        email: this.employeeDtos.email,
        phoneNumber: this.employeeDtos.phoneNumber,
        position: this.employeeDtos.position,
        departement: this.employeeDtos.departement,
      });
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      if (this.employeeDtos) {
        this.employeeService
          .updateEmployee(this.employeeDtos.id as string, this.employeeForm.value)
          .subscribe({
            next: (response: any) => {
              this.resetEmployeeForm();
              this.toastr.success("employee updated");
              
            },
          });
      } else {
        this.employeeService.createEmployee(this.employeeForm.value).subscribe({
          next: (response: any) => {
            this.resetEmployeeForm();
            this.toastr.success("employee created");
          
          },
        });
      }
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  resetEmployeeForm() {
    this.employeeForm.reset();
    this.onClose();
  }
}
