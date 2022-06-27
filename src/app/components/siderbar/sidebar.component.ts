import { Component, OnInit } from '@angular/core';
import { EmployeeUI } from "../../models/employee.model";
import { EventBusService } from "../../services/eventbus.service";

@Component( {
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: [ "./sidebar.component.css" ],
} )
export class SidebarComponent implements OnInit {

    selectedEmployee!: EmployeeUI;
    width: string = "0";

    get getAgeFromDOB () {
        if ( this.selectedEmployee ) {
            let birthdate = new Date( this.selectedEmployee.birthdate );
            let timeDiff = Math.abs( Date.now() - birthdate.getTime() );
            let age = Math.floor( ( timeDiff / ( 1000 * 3600 * 24 ) ) / 365.25 );

            return age
        }
        else return ''
    }

    constructor ( private eventBusService: EventBusService ) {
        this.eventBusService.registerListener( "updateSelectedEmployee", ( data: EmployeeUI ) => {
            this.selectedEmployee = data;
        } );
    }

    ngOnInit () {

    }

    toggleSidebar () {
        if ( this.width == '0' )
            this.width = "45%";
        else
            this.width = "0";
    }
}