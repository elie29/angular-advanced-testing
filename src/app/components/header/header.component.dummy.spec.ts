import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { createUser, User } from '@services/user.model';

import { HeaderComponent } from './header.component';

@Component({
  template: '<app-header [user]="user" (logout)="onLogout()"></app-header>'
})
export class DummyComponent {
  user: User;
  onLogout(): void {}
}

describe('DummyHeaderComponent unit test for HeaderComponent', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;
  let div: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DummyComponent, HeaderComponent]
    }).compileComponents(); // associate templateUrl to the component, run in async mode required
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
    div = fixture.debugElement.query(By.css('div.ui.menu'));
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should has h1 default title', () => {
    fixture.detectChanges();
    expect(div.nativeElement.textContent).toContain(
      'Angular Advanced Features'
    );
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

    // Immutable change
    component.user = { ...component.user };
    component.user.authenticated = false;
    fixture.detectChanges();
    content = div.nativeElement.textContent;
    expect(content).not.toContain('Articles');
  });

  // Spy on dummy component
  it('should call logout method', () => {
    spyOn(component, 'onLogout');
    component.user = createUser('elie29@gmail.com');
    fixture.detectChanges();
    const logout = (div.nativeElement as HTMLDivElement).querySelector(
      'a.logout'
    );
    logout.dispatchEvent(new Event('click'));
    expect(component.onLogout).toHaveBeenCalledTimes(1);
  });
});
