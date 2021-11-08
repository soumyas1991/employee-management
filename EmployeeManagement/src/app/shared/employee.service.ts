import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
//import {toPromise} from 'rxjs/operators';
//import 'rxjs/add/operator/toPromise';

import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  baseURL = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  addEmployee(emp : Employee)
  {
    
    return this.http.post(this.baseURL, emp);
  }

  getEmployeeList()
  {
    
    return this.http.get(this.baseURL);
  }
  
  getEmployee(_id: string)
  {
    
    return this.http.get(this.baseURL + `/${_id}`);
  }
  updateEmployee(emp: Employee) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  updateEnddate(_id:string) {
    return this.http.post(this.baseURL+ `/${_id}`,{});
  }
  
}
