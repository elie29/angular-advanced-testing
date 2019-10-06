import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DynamicLabelDirective } from './dynamic-label.directive';

// Dummy component to isolate the directive
@Component({
  template: '<div appDynamicLabel><div>'
})
class TestDynamicLabelComponent {}

describe('DynamicLabelDirective unit test', () => {
  let component: TestDynamicLabelComponent;
  let fixture: ComponentFixture<TestDynamicLabelComponent>;
  let div: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDynamicLabelComponent, DynamicLabelDirective]
    }); // no need to call compileComponents, because we are using template
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDynamicLabelComponent);
    component = fixture.componentInstance;
    // div = fixture.debugElement.query(By.css('div'));
    div = fixture.debugElement.query(By.directive(DynamicLabelDirective));
  });

  it('should have created a component', () => {
    expect(component).toBeTruthy();
  });

  it('should add hide-label automatically', () => {
    fixture.detectChanges(); // populate the template
    expect(div.nativeElement.className).toBe('hide-label');
  });

  it('should add/remove hide-label on mouseenter/mouseleave', () => {
    div.triggerEventHandler('mouseenter', null);
    fixture.detectChanges(); // populate the template
    expect(div.nativeElement.className).not.toContain('hide-label');

    div.triggerEventHandler('mouseleave', null);
    fixture.detectChanges(); // populate the template
    expect(div.nativeElement.className).toBe('hide-label');
  });
});
