import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { formatDate } from '@angular/common';
import { AbstractControl,FormGroup, FormBuilder, Validators, FormControl  } from '@angular/forms';
import { Router,ActivatedRoute  } from '@angular/router';


import { EmployeeService } from '../shared/employee.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  @ViewChild('alert', { static: true }) alert: ElementRef;
  addEmployeeForm: FormGroup;
  submitted = false;
  id: string;
  isAddMode:boolean;
  data:any;
 

  constructor(private addEmplyeeBuilder: FormBuilder,private router:Router, private employeeService: EmployeeService,private actRoute:ActivatedRoute,) { 
    this.createForm();

    this.id = this.actRoute.snapshot.params['id'];
    this.isAddMode = !this.id;

    if(!this.isAddMode)
    {
        this.employeeService.getEmployee(this.id).subscribe((res) => {
          this.data = res;
          
          this.addEmployeeForm.setValue({
            _id: this.data._id,
            name: this.data.name,
            email: this.data.email,
            department: this.data.department,
            phnno: this.data.phnno,
            joindate:formatDate(this.data.joindate, 'yyyy-MM-dd', 'en'),
            enddate:this.data.enddate,
            experience:this.data.experience,
          });
      });
    }

   
  }

  ngOnInit(): void {
  }
  

   createForm() {
      this.addEmployeeForm = this.addEmplyeeBuilder.group({
        _id:[''],
        name: ['', [Validators.required]],
        phnno: ['', [Validators.required]],
        email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        department: ['', [Validators.required]],
        joindate: ['', [Validators.required]],
        enddate: [''],
        experience: [''],
    
        
      });
    }

    get f(): { [key: string]: AbstractControl } {
      return this.addEmployeeForm.controls;
    }

    addEmployee(addEmployeeForm:any){
     
      if (this.addEmployeeForm.invalid) {
        return;
      }
      else{
        if (addEmployeeForm.value._id == ""|| addEmployeeForm.value._id == null) {
          this.employeeService.addEmployee(addEmployeeForm.value).subscribe((res) => {
            this.submitted = true;
            this.resetEmployee(addEmployeeForm);
          });
        }
        else{
          this.employeeService.updateEmployee(addEmployeeForm.value).subscribe((res) => {
            this.submitted = true;
          });
        }
      }
      
    }

    
    gotoEmployeeList()
    {
      this.router.navigateByUrl('/employees')
    }
    resetEmployee(addEmployeeForm:any){
      if (addEmployeeForm){
        addEmployeeForm.reset();
      }
       
     
    }
    closeAlert()
    {
      this.alert.nativeElement.classList.remove('show');
    }
}
