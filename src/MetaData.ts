export default class MetaData {
  date: string;

  constructor(readonly title: string, readonly composer: string, readonly poet: string, readonly rights: string) {
    this.date = new Date().toISOString();
  }

  getTitle(): string {
    return this.title;
  }

  getComposer(): string {
    return this.composer;
  }

  getPoet(): string {
    return this.poet;
  }

  getRights(): string {
    return this.rights;
  }

  getDate(): string {
    return this.date;
  }

}