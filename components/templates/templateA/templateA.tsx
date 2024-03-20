import { IPosts } from "@/types/posts";
import { NextPage } from "next";
import TemplateLayout1 from "../templateLayouts/templateLayout1/templateLayout1";
import TemplateLayout2 from "../templateLayouts/templateLayout2/templateLayout2";
import classes from "./templateA.module.css";
import TemplateLayout3 from "../templateLayouts/TemplateLayout3/TemplateLayout3";
import TemplateLayout4 from "../templateLayouts/TemplateLayout4/TemplateLayout4";
import TemplateLayout5 from "../templateLayouts/TemplateLayout5/TemplateLayout5";
import TL4b from "../templateLayouts/TemplateLayout4/TL/TL4b/TL4b";

interface TemplateAProps {
  post: IPosts;
}

// extract common properties
export const extractCardProps = (
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

const TemplateA: NextPage<TemplateAProps> = ({ post }) => {
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

  // ==== Layout 2 ====
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

  // ==== Layout 3_1 ====
  // For a single card, similar to Layout 1
  const templateLayout3Props_1 = {
    img: cards[8]?.url,
    size: cards[8]?.size,
    txt: cards[8]?.txt,
  };

  // ==== Layout 5 ====
  // For a single card, similar to Layout 1
  const templateLayout5Props = extractCardProps(cards, 9, 11);

  const TL4bProps = {
    img: cards[11]?.url,
    size: cards[11]?.size,
    txt: cards[11]?.txt,
    connectedTxt: cards[11]?.connected_txt,
  };
  console.log(TL4bProps);

  return (
    <>
      <TemplateLayout1 {...templateLayout1Props} />
      <TemplateLayout2 {...templateLayout2Props} />
      <TemplateLayout3 {...templateLayout3Props} />
      <TemplateLayout4 {...templateLayout4Props} />
      <TemplateLayout3 {...templateLayout3Props_1} />
      <TemplateLayout5 {...templateLayout5Props} />
      <TL4b {...TL4bProps} />
    </>
  );
};

export default TemplateA;
