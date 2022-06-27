import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { EmployeeService } from "src/app/services/employee.service";
import { EmployeeListComponent } from "./employee-list.component";

describe( 'EmployeeListComponent Integrated Tests', () => {

    let mockEmployeeService: any,
        fixture: ComponentFixture<EmployeeListComponent>;

    describe( "renders correct UI", () => {
        it( 'should render employee-card elements', () => {

            const employeeList = [
                {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe",
                    "position": "Engineer",
                    "birthdate": "1999-05-29",
                    "manager": null
                },
                {
                    "id": 2,
                    "firstName": "Brittany",
                    "lastName": "Allen",
                    "position": "Project Manager",
                    "birthdate": "1975-05-19",
                    "manager": null
                }
            ];

            mockEmployeeService = { getEmployees: () => of( employeeList ) }

            TestBed.configureTestingModule( {
                declarations: [
                    EmployeeListComponent,
                ],
                providers: [
                    { provide: EmployeeService, useValue: mockEmployeeService },
                ],
                schemas: [
                    NO_ERRORS_SCHEMA
                ]
            } );

            fixture = TestBed.createComponent( EmployeeListComponent );
            fixture.detectChanges();

            const empCardElem = fixture.debugElement.queryAll( By.css( "employee-card" ) );
            expect( empCardElem ).not.toBeNull();
            expect( empCardElem.length ).toBe( 2 );
            for ( let i = 0; i < empCardElem.length; i++ ) {
                expect( empCardElem[ i ].nativeElement ).not.toBeNull();
            }
        } )

        it( 'should render correct employee-card elements', () => {

            const employeeList = [
                {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe",
                    "position": "Engineer",
                    "birthdate": "1999-05-29",
                    "manager": 2
                },
                {
                    "id": 2,
                    "firstName": "Brittany",
                    "lastName": "Allen",
                    "position": "Project Manager",
                    "birthdate": "1975-05-19",
                    "manager": null
                }
            ];

            mockEmployeeService = { getEmployees: () => of( employeeList ) }

            TestBed.configureTestingModule( {
                declarations: [
                    EmployeeListComponent,
                ],
                providers: [
                    { provide: EmployeeService, useValue: mockEmployeeService },
                ],
                schemas: [
                    NO_ERRORS_SCHEMA
                ]
            } );

            fixture = TestBed.createComponent( EmployeeListComponent );
            fixture.detectChanges();

            const empCardElem = fixture.debugElement.queryAll( By.css( "employee-card" ) );
            expect( empCardElem ).not.toBeNull();
            expect( empCardElem.length ).toBe( 1 );
            for ( let i = 0; i < empCardElem.length; i++ ) {
                expect( empCardElem[ i ].nativeElement ).not.toBeNull();
            }
        } )
    } );
} );

describe( 'EmployeeListComponent Isolated Tests', () => {

    let component: EmployeeListComponent;
    let mockEmployeeService: any;

    beforeEach( () => {
        mockEmployeeService = jasmine.createSpyObj( 'mockEmployeeService', [ 'getEmployees' ] );
        component = new EmployeeListComponent( mockEmployeeService );
    } );

    describe( "renders correct elements", () => {
        it( 'should create the component', () => {
            expect( component ).toBeDefined();
        } );

        it( 'should have employee list empty', () => {
            expect( component.employeeUIList ).toEqual( [] );
            expect( component.employeeUIList.length ).toBe( 0 );
        } );
    } );

    describe( 'ngOnInit', () => {
        it( 'should set employee correctly', () => {
            const employeeList = [
                {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe",
                    "position": "Engineer",
                    "birthdate": "1999-05-29",
                    "manager": null
                },
                {
                    "id": 2,
                    "firstName": "Brittany",
                    "lastName": "Allen",
                    "position": "Project Manager",
                    "birthdate": "1975-05-19",
                    "manager": null
                }
            ];

            mockEmployeeService.getEmployees.and.returnValue( of( employeeList ) );
            component.ngOnInit();

            expect( component.employeeUIList.length ).toBe( 2 );
            expect( component.employeeUIList[ 0 ].firstName ).toBe( "John" );
            expect( component.employeeUIList[ 1 ].firstName ).toBe( "Brittany" );
        } )

        it( 'should set correct employee hierarchy', () => {
            const employeeList = [
                {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe",
                    "position": "Engineer",
                    "birthdate": "1999-05-29",
                    "manager": 3
                },
                {
                    "id": 2,
                    "firstName": "Brittany",
                    "lastName": "Allen",
                    "position": "Project Manager",
                    "birthdate": "1975-05-19",
                    "manager": null
                },
                {
                    "id": 3,
                    "firstName": "Philip",
                    "lastName": "Holmes",
                    "position": "Manager",
                    "birthdate": "1982-02-24",
                    "manager": 2
                }
            ];

            mockEmployeeService.getEmployees.and.returnValue( of( employeeList ) );
            component.ngOnInit();

            expect( component.employeeUIList.length ).toBe( 1 );
            expect( component.employeeUIList[ 0 ].firstName ).toBe( "Brittany" );
            expect( component.employeeUIList[ 0 ].managingEmployees.length ).toBe( 1 );
            expect( component.employeeUIList[ 0 ].managingEmployees[ 0 ].lastName ).toBe( "Holmes" );
            expect( component.employeeUIList[ 0 ].managingEmployees[ 0 ].managingEmployees.length ).toBe( 1 );
            expect( component.employeeUIList[ 0 ].managingEmployees[ 0 ].managingEmployees[ 0 ].position ).toBe( "Engineer" );
        } )

        it( 'should sort the employees correctly w.r.t position', () => {
            const employeeList = [
                {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe",
                    "position": "Engineer",
                    "birthdate": "1999-05-29",
                    "manager": null
                },
                {
                    "id": 2,
                    "firstName": "Brittany",
                    "lastName": "Allen",
                    "position": "Project Manager",
                    "birthdate": "1975-05-19",
                    "manager": null
                },
                {
                    "id": 3,
                    "firstName": "Philip",
                    "lastName": "Holmes",
                    "position": "Manager",
                    "birthdate": "1982-02-24",
                    "manager": null
                }
            ];

            mockEmployeeService.getEmployees.and.returnValue( of( employeeList ) );
            component.ngOnInit();

            expect( component.employeeUIList.length ).toBe( 3 );
            expect( component.employeeUIList[ 2 ].firstName ).toBe( "Brittany" );
        } )
    } );
} );