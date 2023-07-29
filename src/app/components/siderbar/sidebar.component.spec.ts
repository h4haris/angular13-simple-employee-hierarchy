import { DebugElement, EventEmitter } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { rgb2hex } from "src/app/common/color.utilities";
import { EventBusService } from "src/app/services/eventbus.service";
import { SidebarComponent } from "./sidebar.component";

describe( 'SidebarComponent', () => {

    let mockEventBusService: any,
        fixture: ComponentFixture<SidebarComponent>,
        component: SidebarComponent,
        element: HTMLElement,
        debugEl: DebugElement;

    beforeEach( () => {
        const event = new EventEmitter();

        mockEventBusService = {
            registerListener: ( eventName: string, callback: Function ) => {
                return event.subscribe( callback );
            },
            emit: ( eventName: string, args: any ) => event.emit( args )
        }

        TestBed.configureTestingModule( {
            declarations: [
                SidebarComponent,
            ],
            providers: [
                { provide: EventBusService, useValue: mockEventBusService },
            ]
        } );

        fixture = TestBed.createComponent( SidebarComponent );
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement as HTMLElement;
        fixture.detectChanges();
    } )

    describe( 'basic behavior', () => {
        describe( "renders correct elements", () => {
            it( 'should create the component', () => {
                expect( component ).toBeDefined();
            } );

            it( "should have an element for employee detail with the class '.selected-employee'", () => {
                const inputElem = debugEl.query( By.css( ".selected-employee" ) );
                expect( inputElem ).not.toBeNull();
            } );

            it( "should have a side-menu button with the class '.side-menu-btn'", () => {
                const sideMenuBtnElem = debugEl.query( By.css( ".side-menu-btn" ) );
                expect( sideMenuBtnElem ).not.toBeNull();
            } );

            it( 'should initially begin with no employee info', () => {
                const empInfoElem = debugEl.queryAll( By.css( ".empInfo" ) );
                expect( empInfoElem ).not.toBeNull();
                for ( let i = 0; i < empInfoElem.length; i++ ) {
                    expect( empInfoElem[ i ].nativeElement.textContent ).toEqual( "" );
                }
            } )
        } );

        describe( "renders correct specification", () => {
            it( "should have a side-menu button with correct specification when not pressed", () => {
                const sideMenuBtnElem = debugEl.query( By.css( ".side-menu-btn" ) ).nativeElement;

                const sideMenuStyle = getComputedStyle( sideMenuBtnElem );

                expect( rgb2hex( sideMenuStyle.backgroundColor ) ).toBe( '#41946D' )
                expect( rgb2hex( sideMenuStyle.color ) ).toBe( '#F5F5F5' )
            } );

            it( "should have a side-menu button with correct specification when pressed", () => {
                const sideMenuBtnElem = debugEl.query( By.css( ".side-menu-btn" ) ).nativeElement;

                sideMenuBtnElem.click();
                fixture.detectChanges();

                const sideMenuStyle = getComputedStyle( sideMenuBtnElem );
                expect( rgb2hex( sideMenuStyle.backgroundColor ) ).toBe( '#83C9A8' )
                expect( rgb2hex( sideMenuStyle.color ) ).toBe( '#F5F5F5' )
            } );

            it( "should have a side-menu button with correct specification when pressed and then unpressed", () => {
                const sideMenuBtnElem = debugEl.query( By.css( ".side-menu-btn" ) ).nativeElement;

                sideMenuBtnElem.click();
                sideMenuBtnElem.click();
                fixture.detectChanges();

                const sideMenuStyle = getComputedStyle( sideMenuBtnElem );
                expect( rgb2hex( sideMenuStyle.backgroundColor ) ).toBe( '#41946D' )
                expect( rgb2hex( sideMenuStyle.color ) ).toBe( '#F5F5F5' )
            } );
        } );

        describe( "respond correct behavior", () => {
            it( "should have a side navigation with employee details view collapsed initially", () => {
                const sideNavElem = debugEl.query( By.css( ".sidenav" ) ).nativeElement;

                const sideNavWidth = +getComputedStyle( sideNavElem ).width.replace( 'px', '' );

                expect( sideNavWidth ).toBe( 0 )
            } );

            it( "should have a side navigation with employee details view expanded on button pressed", () => {
                const sideNavElem = debugEl.query( By.css( ".sidenav" ) ).nativeElement;

                debugEl.query( By.css( ".side-menu-btn" ) ).nativeElement.click();
                fixture.detectChanges();

                const sideNavWidth = +getComputedStyle( sideNavElem ).width.replace( 'px', '' );
                expect( sideNavWidth ).toBeGreaterThan( 0 );
            } );

            it( "should have a side navigation with employee details view expanded having width around 45% ", () => {
                const sideNavContainerElem = debugEl.query( By.css( ".sidebar-container" ) ).nativeElement;
                const sideNavElem = debugEl.query( By.css( ".sidenav" ) ).nativeElement;

                debugEl.query( By.css( ".side-menu-btn" ) ).nativeElement.click();
                fixture.detectChanges();

                const sideNavContainerWidth = +getComputedStyle( sideNavContainerElem ).width.replace( 'px', '' );
                const sideNavWidth = +getComputedStyle( sideNavElem ).width.replace( 'px', '' );

                expect( sideNavWidth / sideNavContainerWidth ).toBeGreaterThanOrEqual( 0.45 );
            } );

            it( "should have a side navigation with employee details view collapsed on button pressed twice", () => {
                const sideNavElem = debugEl.query( By.css( ".sidenav" ) ).nativeElement;

                debugEl.query( By.css( ".side-menu-btn" ) ).nativeElement.click();
                debugEl.query( By.css( ".side-menu-btn" ) ).nativeElement.click();
                fixture.detectChanges();

                const sideNavWidth = +getComputedStyle( sideNavElem ).width.replace( 'px', '' );
                expect( sideNavWidth ).toBe( 0 )
            } );
        } );
    } );

    describe( 'selected Employee behavior', () => {
        describe( "set correct data", () => {
            it( 'should have "selectedEmployee" object undefined initially', () => {
                expect( component.selectedEmployee ).toBeUndefined();
            } );

            it( 'should set "selectedEmployee" object thru eventBusService', () => {
                const selectedEmployee = { id: 1, firstName: "John", lastName: "Doe", position: "Engineer" }

                mockEventBusService.emit( "updateSelectedEmployee", selectedEmployee );

                expect( component.selectedEmployee ).toBeDefined();
                expect( component.selectedEmployee ).toBeTruthy();
            } );

            it( 'should set correct "selectedEmployee" data', () => {
                const selectedEmployee = { firstName: "Carl", lastName: "Jones", position: "Developer", birthdate: new Date( "1995-04-01" ) }

                mockEventBusService.emit( "updateSelectedEmployee", selectedEmployee );

                expect( component.selectedEmployee.firstName ).toBe( "Carl" );
                expect( component.selectedEmployee.lastName ).toBe( "Jones" );
                expect( component.selectedEmployee.position ).toBe( "Developer" );
                expect( component.selectedEmployee.birthdate ).toEqual( new Date( "1995-04-01" ) );
            } );
        } );

        describe( "render correct data", () => {
            it( 'should set correct "selectedEmployee" first name', () => {
                const selectedEmployee = { firstName: "John", }

                mockEventBusService.emit( "updateSelectedEmployee", selectedEmployee );
                fixture.detectChanges();

                const empFirstNameElem = debugEl.queryAll( By.css( ".empInfo" ) )[ 0 ].nativeElement;
                expect( empFirstNameElem.textContent ).toContain( "John" );
            } );

            it( 'should set correct "selectedEmployee" family name', () => {
                const selectedEmployee = { lastName: "Allen", }

                mockEventBusService.emit( "updateSelectedEmployee", selectedEmployee );
                fixture.detectChanges();

                const empLastNameElem = debugEl.queryAll( By.css( ".empInfo" ) )[ 1 ].nativeElement;
                expect( empLastNameElem.textContent ).toContain( "Allen" );
            } );

            it( 'should set correct "selectedEmployee" position', () => {
                const selectedEmployee = { position: "Director", }

                mockEventBusService.emit( "updateSelectedEmployee", selectedEmployee );
                fixture.detectChanges();

                const empPositionElem = debugEl.queryAll( By.css( ".empInfo" ) )[ 2 ].nativeElement;
                expect( empPositionElem.textContent ).toContain( "Director" );
            } );

            it( 'should set correct "selectedEmployee" age', () => {
                const selectedEmployee = { birthdate: new Date( "2000-04-01" ) }

                mockEventBusService.emit( "updateSelectedEmployee", selectedEmployee );
                fixture.detectChanges();

                const empAgeElem = debugEl.queryAll( By.css( ".empInfo" ) )[ 3 ].nativeElement;
                expect( empAgeElem.textContent ).toContain( "23" );
            } );
        } );
    } );
} );
