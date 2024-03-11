import { IPosts } from "@/types/posts";
import { NextPage } from "next";
import TemplateLayout1 from "../templateLayouts/templateLayout1/templateLayout1";
import TemplateLayout2 from "../templateLayouts/templateLayout2/templateLayout2";
import classes from "./templateA.module.css";
import TemplateLayout3 from "../templateLayouts/TemplateLayout3/TemplateLayout3";
import TemplateLayout4 from "../templateLayouts/TemplateLayout4/TemplateLayout4";

interface TemplateAProps {
  post: IPosts;
}

const TemplateA: NextPage<TemplateAProps> = ({ post }) => {
  // extract common properties
  const extractCardProps = (
    cards: any,
    startIndex?: number,
    endIndex?: number
  ) => {
    const slice = cards.slice(startIndex, endIndex);
    return {
      img: slice.map((card: any) => card.url),
      size: slice.map((card: any) => card.size),
      txt: slice.map((card: any) => card.txt),
      connectedTxt: slice.map((card: any) => card.connected_txt),
    };
  };

  // Destructure for easier access to the first template cards
  const { cards } = post.template[0];

  // ==== Layout 1 ====
  // For a single card, directly access properties without mapping
  const templateLayout1Props = {
    img: cards[0]?.url,
    author: post.author,
    txt: cards[0]?.txt,
    size: cards[0]?.size,
  };

  // ==== Layout ====
  const templateLayout2Props = extractCardProps(cards, 1, 4);

  // ==== Layout 3 ====
  // For a single card, similar to Layout 1
  const templateLayout3Props = {
    img: cards[4]?.url,
    size: cards[4]?.size,
    txt: cards[4]?.txt,
  };

  // ==== Layout 4 ====
  const templateLayout4Props = extractCardProps(cards, 5, 8);

  return (
    <>
      <TemplateLayout1 {...templateLayout1Props} />
      <TemplateLayout2 {...templateLayout2Props} />
      <TemplateLayout3 {...templateLayout3Props} />
      <TemplateLayout4 {...templateLayout4Props} />
    </>
  );
};

export default TemplateA;
