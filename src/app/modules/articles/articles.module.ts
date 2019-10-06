import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleItemMetaComponent } from './components/article-item-meta/article-item-meta.component';
import { ArticleItemVotesComponent } from './components/article-item-votes/article-item-votes.component';
import { ArticleItemComponent } from './components/article-item/article-item.component';
import { ArticlesComponent } from './containers/articles/articles.component';
import { DynamicLabelDirective } from './directives/dynamic-label.directive';
import { ArticlesGuard } from './guards/articles.guard';
import { FibonacciPipe } from './pipes/fibonacci.pipe';
import { ArticlesService } from './services/articles.service';

const ROUTES: Routes = [
  {
    path: 'articles',
    canActivate: [ArticlesGuard], // Access allowed for logged users
    component: ArticlesComponent
  }
];

@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleFormComponent,
    ArticleItemComponent,
    ArticleItemVotesComponent,
    ArticleItemMetaComponent,
    FibonacciPipe,
    DynamicLabelDirective
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(ROUTES)],
  providers: [ArticlesService]
})
export class ArticlesModule {}
