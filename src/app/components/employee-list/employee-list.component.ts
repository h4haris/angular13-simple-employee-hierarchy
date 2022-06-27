import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeUI } from "../../models/employee.model";
import { EmployeeService } from "../../services/employee.service";

@Component( {
    selector: 'employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: [ "./employee-list.component.css" ],
} )
export class EmployeeListComponent implements OnInit {

    employeeUIList: EmployeeUI[] = [];

    constructor ( private empService: EmployeeService ) { }

    ngOnInit () {
        this.empService.getEmployees().subscribe(
            ( result ) => {
                this.formatEmpResult( result )
            },
            ( error ) => {
                console.log( error )
            }
        );
    }

    formatEmpResult ( data: Employee[] ): void {
        data.sort( ( a, b ) => {
            if ( a.position < b.position ) {
                return -1;
            }
            if ( a.position > b.position ) {
                return 1;
            }
            return 0;
        } );

        this.employeeUIList = this.getEmployeesHierarchyList( null, data );
    }

    getEmployeesHierarchyList ( empNo: number | null, data: Employee[] ): EmployeeUI[] {

        var empList = <EmployeeUI[]>data.filter( x => x.manager == empNo );

        empList.forEach( emp => {
            emp.managingEmployees = this.getEmployeesHierarchyList( emp.id, data );
        } );

        return empList;
    }
}