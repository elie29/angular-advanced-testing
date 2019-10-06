import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ArticleFormComponent } from './article-form.component';

describe('ArticleFormComponent unit test', () => {
  let component: ArticleFormComponent;
  let fixture: ComponentFixture<ArticleFormComponent>;
  let form: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    // Create fixture component
    fixture = TestBed.createComponent(ArticleFormComponent);
    // Get component from the fixture
    component = fixture.componentInstance;
    // Query the form tag
    form = fixture.debugElement.query(By.css('form'));
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to addArticle', () => {
    // title and link won't be populated
    fixture.detectChanges();
    // elements are set to empty, trigger again
    spyOn(component.addedArticle, 'emit');
    form.triggerEventHandler('ngSubmit', null);
    expect(component.addedArticle.emit).toHaveBeenCalledTimes(0);
  });

  it('should populate form', () => {
    fixture.debugElement.query(By.css('#title')).nativeElement.value =
      'Angular';
    fixture.debugElement.query(By.css('#link')).nativeElement.value =
      'angular.io';

    fixture.detectChanges();

    // elements are set to empty, trigger again
    spyOn(component.addedArticle, 'emit');
    form.triggerEventHandler('ngSubmit', null);
    expect(component.addedArticle.emit).toHaveBeenCalledTimes(1);
  });
});
