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
      size:
        | "Horizontal_Full"
        | "Vertical_Full"
        | "Horizontal_Small"
        | "Horizontal_Medium"
        | "Vertical_Small";
      connected_txt?: string;
      txt?: string[];
    }[]; // array of objects
  }[];
}
