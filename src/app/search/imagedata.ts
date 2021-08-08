import {Photo} from "./photo";

export class Imagedata {

  constructor(
    public page: number,
    public pages: number,
    public perpage: number,
    public total: number) {
  }

}
