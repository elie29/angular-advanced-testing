import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Article } from '../../services/article.model';
import { ArticleItemComponent } from './article-item.component';

describe('ArticleItemComponent unit test', () => {
  let component: ArticleItemComponent;
  let fixture: ComponentFixture<ArticleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleItemComponent],
      schemas: [NO_ERRORS_SCHEMA] // We won't declare app-article-item-votes and other components
    }).compileComponents();
  }));

  beforeEach(() => {
    // Create fixture component
    fixture = TestBed.createComponent(ArticleItemComponent);
    // Get component from the fixture
    component = fixture.componentInstance;
    // Attach article to component input
    component.article = new Article('angular.io', 'http://angular.io', 5, 7);
  });

  it('should have created a component', () => {
    expect(component).toBeTruthy();
  });

  it('should have populated component template with link and title', () => {
    fixture.detectChanges(); // populate template

    const a = fixture.debugElement.query(By.css('a.ui.large.header'));
    expect(a.nativeElement.href).toContain('http://angular.io');
    expect(a.nativeElement.textContent).toContain('angular.io');
  });

  it('should call upvote, downvote and delete', () => {
    spyOn(component, 'upvote').and.callThrough();
    spyOn(component, 'downvote').and.callThrough();
    spyOn(component, 'delete').and.callThrough();

    const allLinks = fixture.debugElement.queryAll(By.css('li.item a'));
    allLinks.forEach(link => {
      link.triggerEventHandler('click', null);
    });

    expect(component.upvote).toHaveBeenCalledTimes(1);
    expect(component.downvote).toHaveBeenCalledTimes(1);
    expect(component.delete).toHaveBeenCalledTimes(1);
  });
});
