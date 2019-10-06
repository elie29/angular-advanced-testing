import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ArticleItemComponent } from '../../components/article-item/article-item.component';
import { ArticlesService } from '../../services/articles.service';
import { ArticlesComponent } from './articles.component';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let articlesService: ArticlesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // Just ArticleItem needed
      declarations: [ArticlesComponent, ArticleItemComponent],
      providers: [ArticlesService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    articlesService = TestBed.get(ArticlesService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return 3 articles', () => {
    expect(component.articles.length).toBe(3);
  });

  it('should add an article', () => {
    component.onAddedArticle({ title: 'angular', link: 'http://angular.io' });
    expect(component.articles.length).toBe(4);
  });

  it('should remove an article', () => {
    const article = component.articles[0];
    component.onRemoved(article);
    expect(component.articles.length).toBe(2);
  });

  it('should call upvoteAll on click', () => {
    spyOn(articlesService, 'upvoteAll');

    fixture.detectChanges();

    const a = fixture.debugElement.query(By.css('a'));
    a.triggerEventHandler('click', null);
    expect(articlesService.upvoteAll).toHaveBeenCalled();
  });

  it('should call onUpvote', () => {
    spyOn(articlesService, 'upvote');
    component.onUpvote(component.articles[0]);
    expect(articlesService.upvote).toHaveBeenCalled();
  });

  it('should call onDownvote', () => {
    spyOn(articlesService, 'downvote');
    component.onDownvote(component.articles[0]);
    expect(articlesService.downvote).toHaveBeenCalled();
  });

  it('test component ngFor', () => {
    expect(getItemsLength()).toBe(3);

    component.onRemoved(component.articles[0]);

    expect(getItemsLength()).toBe(2);
  });

  // Search for items in the DOM
  function getItemsLength(): number {
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(
      By.directive(ArticleItemComponent)
    );
    return items.length;
  }
});
