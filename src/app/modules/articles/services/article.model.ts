export class Article {
  constructor(
    private title: string,
    private link: string,
    private votes = 0,
    private minutes = 0 // Time to read the article
  ) {}

  getTitle(): string {
    return this.title;
  }

  getMeta(): string {
    return this.link.replace(/^(https?):\/\//, '').split('/')[0];
  }

  getLink(): string {
    return this.link;
  }

  getVotes(): number {
    return this.votes;
  }

  getMinutes(): number {
    return this.minutes;
  }

  changeVote(vote: 1 | -1): Article {
    return new Article(this.title, this.link, this.votes + vote, this.minutes);
  }
}
