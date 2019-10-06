import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges
} from '@angular/core';

import { Article } from '../../services/article.model';

@Component({
  selector: 'app-article-item-meta',
  templateUrl: 'article-item-meta.component.html',
  styleUrls: ['article-item-meta.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleItemMetaComponent implements OnChanges {
  @Input() article: Article;

  minutes: number;

  /**
   * ngOnchanges not OnInit in case minutes change
   */
  ngOnChanges() {
    this.minutes = this.article.getMinutes();
  }
}
