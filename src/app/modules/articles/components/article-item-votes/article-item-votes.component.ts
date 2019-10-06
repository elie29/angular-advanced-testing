import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input
} from '@angular/core';

import { Article } from '../../services/article.model';

@Component({
  selector: 'app-article-item-votes',
  templateUrl: './article-item-votes.component.html',
  styleUrls: ['./article-item-votes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // article is not refreshed unless its reference changes
})
export class ArticleItemVotesComponent {
  @Input() article: Article;

  @HostBinding('attr.class') css = 'four wide column center aligned votes';
}
