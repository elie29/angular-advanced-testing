import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';

import { Article } from '../../services/article.model';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleItemComponent {
  @HostBinding('attr.class') css = 'row';

  @Input() article: Article;
  @Output() upvoteArticle = new EventEmitter<Article>();
  @Output() downvoteArticle = new EventEmitter<Article>();
  @Output() removedArticle = new EventEmitter<Article>();

  upvote(): false {
    this.upvoteArticle.emit(this.article);
    return false; // required when href exists on a tag
  }

  downvote(): false {
    this.downvoteArticle.emit(this.article);
    return false;
  }

  delete(): false {
    this.removedArticle.emit(this.article);
    return false;
  }
}
