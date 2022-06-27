import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { rgb2hex } from "src/app/common/color.utilities";
import { EmployeeUI } from "src/app/models/employee.model";
import { EventBusService } from "src/app/services/eventbus.service";
import { EmployeeCardComponent } from "./employee-card.component";

describe( 'EmployeeCardComponent', () => {

    let mockEventBusService: any,
        fixture: ComponentFixture<EmployeeCardComponent>,
        component: EmployeeCardComponent,
        debugEl: DebugElement;

    beforeEach( () => {
        mockEventBusService = jasmine.createSpyObj( 'mockEventBusService', [ 'emit' ] );

        TestBed.configureTestingModule( {
            declarations: [
                EmployeeCardComponent,
            ],
            providers: [
                { provide: EventBusService, useValue: mockEventBusService },
            ]
        } );

        fixture = TestBed.createComponent( EmployeeCardComponent );
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
    } )

    describe( 'basic behavior', () => {
        describe( "renders correct elements", () => {
            it( 'should create the component', () => {
                expect( component ).toBeTruthy();
                expect( component ).toBeDefined();
            } );

            it( "should have an element for employee detail with the class '.emp-details'", () => {
                const empDetailElem = debugEl.query( By.css( ".emp-details" ) );
                expect( empDetailElem ).not.toBeNull();
            } );

            it( "should have a span for employee position with the class '.emp-position'", () => {
                const empPositionElem = debugEl.query( By.css( ".emp-position" ) );
                expect( empPositionElem ).not.toBeNull();
            } );

            it( "should have a span for employee first name with the class '.emp-name'", () => {
                const empNameElem = debugEl.query( By.css( ".emp-name" ) );
                expect( empNameElem ).not.toBeNull();
            } );
        } );

        describe( "renders correct specification", () => {
            it( "should have a span with the class '.emp-position' with correct specification", () => {
                const empPositionElem = debugEl.query( By.css( ".emp-position" ) ).nativeElement;

                const empPositionStyle = getComputedStyle( empPositionElem );

                expect( rgb2hex( empPositionStyle.color ) ).toBe( '#83A1C9' )
            } );

            it( "should have a span with the class '.emp-name' with correct specification", () => {
                const empNameElem = debugEl.query( By.css( ".emp-name" ) ).nativeElement;

                const empNameStyle = getComputedStyle( empNameElem );

                expect( rgb2hex( empNameStyle.color ) ).toBe( '#262626' )
            } );
        } );

        describe( "respond correct behavior", () => {
            it( "should call the eventBusService.emit with the right parameters", () => {
                component.employee = <EmployeeUI>{ position: "Analyst", firstName: 'Martha' }

                debugEl.query( By.css( ".emp-details" ) ).nativeElement.click();

                expect( mockEventBusService.emit ).toHaveBeenCalled();
                expect( mockEventBusService.emit ).toHaveBeenCalledWith( 'updateSelectedEmployee', component.employee );
            } );
        } );

        describe( "render correct data", () => {
            it( 'should set correct employee\'s position', () => {
                component.employee = <EmployeeUI>{ position: "Designer", }

                fixture.detectChanges();

                const empPositionElem = debugEl.query( By.css( ".emp-position" ) ).nativeElement;
                expect( empPositionElem.textContent ).toContain( 'Designer' )
            } );

            it( 'should set correct employee\'s first name', () => {
                component.employee = <EmployeeUI>{ firstName: "Alex", }

                fixture.detectChanges();

                const empPositionElem = debugEl.query( By.css( ".emp-name" ) ).nativeElement;
                expect( empPositionElem.textContent ).toContain( 'Alex' )
            } );
        } );
    } );
} );