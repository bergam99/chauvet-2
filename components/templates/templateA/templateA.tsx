import { IPosts } from "@/types/posts";
import { NextPage } from "next";
import TemplateLayout1 from "../templateLayouts/templateLayout1/templateLayout1";
import TemplateLayout2 from "../templateLayouts/templateLayout2/templateLayout2";
import TemplateLayout3 from "../templateLayouts/TemplateLayout3/TemplateLayout3";
import TemplateLayout4 from "../templateLayouts/TemplateLayout4/TemplateLayout4";
import TemplateLayout5 from "../templateLayouts/TemplateLayout5/TemplateLayout5";
import TL4b from "../templateLayouts/TemplateLayout4/TL/TL4b/TL4b";
import useIntersectionObserver from "@/utils/useIntersectionObserver";

interface TemplateAProps {
  post: IPosts;
}

export const extractCardProps = (
  cards: any,
  startIndex?: number,
  endIndex?: number
) => {
  const slice = cards.slice(startIndex, endIndex);
  return {
    img: slice.map((card: any) => card.url),
    txt: slice.map((card: any) => card.txt),
    connectedTxt: slice.map((card: any) => card.connected_txt),
  };
};

const TemplateA: NextPage<TemplateAProps> = ({ post }) => {
  useIntersectionObserver();

  const { cards } = post.template[0];

  const templateLayout1Props = {
    img: cards[0]?.url,
    author: post.author,
    txt: cards[0]?.txt,
  };

  const templateLayout2Props = extractCardProps(cards, 1, 4);

  const templateLayout3Props = {
    img: cards[4]?.url,
    txt: cards[4]?.txt,
  };

  const templateLayout4Props = extractCardProps(cards, 5, 8);

  const templateLayout3Props_1 = {
    img: cards[8]?.url,
    txt: cards[8]?.txt,
  };

  const templateLayout5Props = extractCardProps(cards, 9, 11);

  const TL4bProps = {
    img: cards[11]?.url,
    txt: cards[11]?.txt,
    connectedTxt: cards[11]?.connected_txt,
  };

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
