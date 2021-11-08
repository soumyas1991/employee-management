import { Component, OnInit ,Pipe, PipeTransform} from '@angular/core';
import { Router} from '@angular/router';
import * as moment from 'moment';



import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  employees:any = [];
  pageNo: number = 1;
  query:any;
  public search: any = '';

  // date:any;
  currentDate:any;
  constructor(private employeeService: EmployeeService,private router:Router) {
  
    this.getEmployees();
   
   
   }

  ngOnInit(): void {
  }

  getEmployees()
  {
    this.employeeService.getEmployeeList().subscribe((res) => {
      var date = (new Date()).toISOString().split('T')[0];
      this.currentDate = date+'T00:00:00.000Z';
      this.employees = res;
      let exp = 0;
      for (let index = 0; index < this.employees.length; index++) {
       if(this.employees[index].joindate <= this.currentDate && this.employees[index].enddate == null)
       {       
        var joindate = (new Date(this.employees[index].joindate)).toISOString().split('T')[0];     

        var startDate = moment(joindate, 'YYYY-MM-DD');
        var endDate = moment(date, 'YYYY-MM-DD');
        var dayDiff = endDate.diff(startDate, 'days') +1;
        
        
        this.employees[index]['experience'] =this.calcExperience(dayDiff); 
       }
       else if(this.employees[index].joindate <= this.currentDate && this.employees[index].enddate !== null)
       {
        var joindate = (new Date(this.employees[index].joindate)).toISOString().split('T')[0];    
        var enddate = (new Date(this.employees[index].enddate)).toISOString().split('T')[0];  

        var startDate = moment(joindate, 'YYYY-MM-DD');
        var endDate = moment(enddate, 'YYYY-MM-DD');
        var dayDiff = endDate.diff(startDate, 'days') +1;
        this.employees[index]['experience'] = this.calcExperience(dayDiff); 
       }
       else{
        this.employees[index]['experience'] = null; 
       }
        
      }
      
     
    });
  }
  deleteEmployee(id:any)
  {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(id).subscribe((res) => {
        this.getEmployees();
      });
    }
  }
  editEmployee(id:any)
  {
    this.router.navigateByUrl('/edit/'+id)
  }

  updateEnddate(id:any)
  {
    this.employeeService.updateEnddate(id).subscribe((res) => {
      this.getEmployees();
    });
  }

  clearSearch() { 
    this.query = '';
  }

  calcExperience(days:any) {
    //console.log(dayDiff/365 | 0)
    var yr =days/365 | 0;
    var month = days/12 | 0;
    var day = days%12 | 0;
    var message = yr+ ' year '+month+' months '+ day+' days';
   return message
    }

}
export interface IEmployee {

    name:string;
    phnNo:Number;
    email:String;
    department:String;
    joindate:Date;
    enddate:Date;
    experience:Number;

}
