export class Photo{
  id: number | undefined;
  secret: string | undefined;
  server: string | undefined;
  title: string | undefined;
  constructor(data?: Photo) {
    if (data) {
    this.id = data.id;
    this.secret = data.secret;
    this.server = data.server;
    this.title = data.title;
    }
  }
}
