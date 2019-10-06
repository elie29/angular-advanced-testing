import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FibonacciPipe } from '../../pipes/fibonacci.pipe';
import { Article } from '../../services/article.model';
import { ArticleItemMetaComponent } from './article-item-meta.component';

describe('ArticleItemMetaComponent unit test', () => {
  let component: ArticleItemMetaComponent;
  let fixture: ComponentFixture<ArticleItemMetaComponent>;
  let meta: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleItemMetaComponent, FibonacciPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    // Create fixture component
    fixture = TestBed.createComponent(ArticleItemMetaComponent);
    // Get component from the fixture
    component = fixture.componentInstance;
    // Get meta from template
    meta = fixture.debugElement.query(By.css('div.meta'));
  });

  it('should have created a component', () => {
    expect(component).toBeTruthy();
  });

  it('should have created an empty component template', () => {
    component.article = new Article('angular.io', 'http://angular.io');
    expect(meta.nativeElement.textContent).toContain('(');
  });

  it('should have populated component template with default minutes value', () => {
    component.article = new Article('angular.io', 'http://angular.io');
    component.minutes = 10;

    fixture.detectChanges(); // populate template

    const result = meta.nativeElement.textContent;
    expect(result).toContain('10 minutes to read');
  });

  it('should have populated component template with 7 minutes read', () => {
    component.article = new Article('angular.io', 'http://angular.io', 0, 7);

    component.ngOnChanges(); // populate minutes

    fixture.detectChanges(); // populate template

    const result = meta.nativeElement.textContent;
    expect(result).toContain('(angular.io)');
    expect(result).toContain('13');
    expect(result).toContain('7 minutes to read');
  });
});
