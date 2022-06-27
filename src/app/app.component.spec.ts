import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe( 'AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    beforeEach( async () => {
        await TestBed.configureTestingModule( {
            declarations: [
                AppComponent
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        } ).compileComponents();

        fixture = TestBed.createComponent( AppComponent );
    } );

    it( 'should create the app', () => {
        const app = fixture.componentInstance;
        expect( app ).toBeTruthy();
    } );

    it( `should have as title 'angular13-simple-employee-hierarchy'`, () => {
        const app = fixture.componentInstance;
        expect( app.title ).toEqual( 'angular13-simple-employee-hierarchy' );
    } );

    it( 'should render employee-list', () => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect( compiled.querySelector( 'employee-list' ) ).not.toBeNull();
    } );

    it( 'should render sidebar', () => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect( compiled.querySelector( 'sidebar' ) ).not.toBeNull();
    } );
} );
