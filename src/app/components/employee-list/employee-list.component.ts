import { Component, inject } from '@angular/core';
import { IEmployee } from '../../interfaces/employee';
import { HttpService } from '../../http.service';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,BrowserAnimationsModule,BrowserModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employeeList:IEmployee[]=[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','phoneNumber','position', 'departement', 'createDate'];
  httpService=inject(HttpService);
  ngOnInit() {
    this.getEmployeeFromServer();
  }
  getEmployeeFromServer() {
    this.httpService.getAllEmployee().subscribe((result) => {
      this.employeeList = result;
      console.log(this.employeeList);
    });
  }

}
