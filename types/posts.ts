import { ObjectId } from "mongodb";
export interface IPosts {
  _id: ObjectId | string;
  thema: string;
  title: string;
  author: string;
  template: {
    templateKey: string;
    cards: {
      url: string;
      connected_txt?: string;
      txt?: string[];
    }[];
  }[];
}
