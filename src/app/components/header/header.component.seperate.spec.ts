import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { createUser } from '@services/user.model';

import { HeaderComponent } from './header.component';

describe('HeaderComponent unit test using separate it()', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let div: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    }).compileComponents(); // associate templateUrl to the component, run in async mode required
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    div = fixture.debugElement.query(By.css('div.ui.menu'));
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should has h1 default title', () => {
    fixture.detectChanges();
    expect(div.nativeElement.textContent).toContain(component.title);
  });

  it('should not be authenticated by default', () => {
    fixture.detectChanges();
    const content = div.nativeElement.textContent;
    expect(content).not.toContain('Articles');
    expect(content).not.toContain('Logout');
    expect(content).toContain('Login');
    expect(content).toContain('register');
  });

  it('should be authenticated when user is connected', () => {
    component.user = createUser('elie29@gmail.com');

    fixture.detectChanges();

    const content = div.nativeElement.textContent;
    expect(content).toContain('Articles');
    expect(content).toContain('Logout');
    expect(content).not.toContain('Login');
    expect(content).not.toContain('register');

    // NO EFFECT -> use another it() function
    component.user = { ...component.user };
    component.user.authenticated = false;
    fixture.detectChanges();
  });

  it('should not be authenticated when user is not connected', () => {
    component.user = createUser('elie29@gmail.com');
    component.user.authenticated = false;
    fixture.autoDetectChanges();

    const content = div.nativeElement.textContent;
    expect(content).not.toContain('Articles');
    expect(content).not.toContain('Logout');
    expect(content).toContain('Login');
    expect(content).toContain('register');
  });

  // Spy on emit or on onLogout
  it('should call logout method', () => {
    spyOn(component.logout, 'emit');
    component.user = createUser('elie29@gmail.com');
    fixture.detectChanges();

    const logout = (div.nativeElement as HTMLDivElement).querySelector(
      'a.logout'
    );

    // With querySelector on nativeElement we use dispatchEvent
    logout.dispatchEvent(new Event('click'));
    expect(component.logout.emit).toHaveBeenCalledTimes(1);
  });
});
