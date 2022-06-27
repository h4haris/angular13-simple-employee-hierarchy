import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Employee } from "../models/employee.model";

@Injectable( {
    providedIn: "root",
} )
export class EmployeeService {

    private _URL = 'assets/data/employee.json';

    constructor ( private http: HttpClient ) { }

    getEmployees (): Observable<Employee[]> {
        return this.http.get<Employee[]>( this._URL )
            .pipe( catchError( this.handleError<Employee[]>( 'getEmployees', [] ) ) )
    }

    private handleError<T> ( operation = 'operation', result?: T ) {
        return ( error: any ): Observable<T> => {
            console.error( error );
            return of( result as T );
        }
    }
}