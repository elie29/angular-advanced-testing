import { ArticlesService } from './articles.service';

describe('Test article service', () => {
  let articlesService: ArticlesService;

  beforeEach(() => {
    articlesService = new ArticlesService();
  });

  it('should be instantiated', () => {
    expect(articlesService).toBeDefined();
  });

  it('should have 3 items', () => {
    const articles = articlesService.getArticles();
    expect(articles.length).toEqual(3);
  });

  it('should add 1 item', () => {
    articlesService.add('foo', 'bar');
    const articles = articlesService.getArticles();
    expect(articles.length).toEqual(4);
  });

  it('should remove items', () => {
    const articles = articlesService.getArticles();
    articlesService.remove(articles[0]);

    expect(articlesService.getArticles().length).toEqual(2);
  });

  it('should upvote all items', () => {
    const articles = articlesService.getArticles();
    const votes = articles[0].getVotes();

    articlesService.upvoteAll();

    // immutable change
    expect(articles[0].getVotes()).toBe(votes);
    expect(articlesService.getArticles()[0].getVotes()).toBeGreaterThan(votes);
  });

  it('should upvote one item', () => {
    const item = articlesService.getArticles()[0];

    articlesService.upvote(item);

    expect(articlesService.getArticles()[0].getVotes()).toBe(
      item.getVotes() + 1
    );
  });

  it('should down one item', () => {
    const item = articlesService.getArticles()[0];

    articlesService.downvote(item);

    expect(articlesService.getArticles()[0].getVotes()).toBe(
      item.getVotes() - 1
    );
  });
});
