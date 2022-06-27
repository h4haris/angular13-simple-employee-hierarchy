import { Component, Input, OnInit } from '@angular/core';
import { EmployeeUI } from "src/app/models/employee.model";
import { EventBusService } from "src/app/services/eventbus.service";

@Component( {
    selector: 'employee-card',
    templateUrl: './employee-card.component.html',
    styleUrls: [ "./employee-card.component.css" ],
} )
export class EmployeeCardComponent implements OnInit {

    @Input() employee!: EmployeeUI;
    @Input() level: number = 1;

    get getLevel () {
        return this.level + 1;
    }

    get getLevelClass () {
        return 'level' + this.level;
    }

    get getStyle () {
        return {
            "top": ( ( this.level - 1 ) * 40 ) + "px",
            "z-index": 15 - this.level,
            "padding-left": ( ( this.level - 1 ) * 25 ) + "px",
        }
    }

    constructor ( private eventBusService: EventBusService ) { }

    ngOnInit () {
    }

    onEmployeeSelection () {
        this.eventBusService.emit( "updateSelectedEmployee", this.employee );
    }
}