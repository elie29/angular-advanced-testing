import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { createUser } from '@services/user.model';

import { HeaderComponent } from './header.component';

describe('HeaderComponent unit test using overrideComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let div: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    })
      .overrideComponent(HeaderComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents(); // associate templateUrl to the component, run in async mode required
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

  it('should be authenticated when user is connected, otherwise not', () => {
    component.user = createUser('elie29@gmail.com');

    fixture.detectChanges();

    let content = div.nativeElement.textContent;
    expect(content).toContain('Articles');
    expect(content).toContain('Logout');
    expect(content).not.toContain('Login');
    expect(content).not.toContain('register');

    // No need for immutability: change detection default
    component.user.authenticated = false;
    fixture.detectChanges();
    content = div.nativeElement.textContent;
    expect(content).not.toContain('Articles');
  });

  // Spy on emit or on onLogout
  it('should call logout method', () => {
    spyOn(component.logout, 'emit');
    component.user = createUser('elie29@gmail.com');
    fixture.detectChanges();

    // We should have a specific selector
    const logout = fixture.debugElement.query(By.css('a.logout'));

    // With debugElement we have triggerEventHandler
    logout.triggerEventHandler('click', null);
    expect(component.logout.emit).toHaveBeenCalledTimes(1);
  });
});
