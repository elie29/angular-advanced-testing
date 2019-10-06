import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Article } from '../../services/article.model';
import { ArticleItemVotesComponent } from './article-item-votes.component';

describe('ArticleItemVotesComponent unit test', () => {
  let component: ArticleItemVotesComponent;
  let fixture: ComponentFixture<ArticleItemVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleItemVotesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    // Create fixture component
    fixture = TestBed.createComponent(ArticleItemVotesComponent);
    // Get component from the fixture
    component = fixture.componentInstance;
  });

  it('should have created a component', () => {
    expect(component).toBeTruthy();
  });

  it('should have populated component template with votes', () => {
    component.article = new Article('angular.io', 'http://angular.io', 10);

    fixture.detectChanges(); // populate template

    const div = fixture.debugElement.query(By.css('div.value'));
    expect(div.nativeElement.textContent).toContain('10');
  });
});
