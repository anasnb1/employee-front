import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../shared/ui/model/model.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../shared/models/Employee';
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ModelComponent, EmployeeFormComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  isModelOpen = false;
  employees: IEmployee[] = [];
  employee!: IEmployee;

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe({
      next: (response) => {
        console.log('Response from API:', response);
        if (response.employeeDtos) {
          this.employees = response.employeeDtos;
        }
        console.log('Employees:', this.employees);
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      }
    });
  }

  loadEmployee(employeeDtos: IEmployee) {
    this.employee = employeeDtos;
    this.openModel();
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        this.toastr.success("deleted");
        this.getAllEmployee();
      },
    });
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllEmployee();
  }
}
