import { IPosts } from "@/types/posts";
import { NextPage } from "next";
import TemplateLayout1 from "../templateLayouts/templateLayout1/templateLayout1";
import TemplateLayout2 from "../templateLayouts/templateLayout2/templateLayout2";
import TemplateLayout3 from "../templateLayouts/TemplateLayout3/TemplateLayout3";
import TemplateLayout4 from "../templateLayouts/TemplateLayout4/TemplateLayout4";
import TL4b from "../templateLayouts/TemplateLayout4/TL/TL4b/TL4b";
import { extractCardProps } from "../templateA/templateA";
import TL4a from "../templateLayouts/TemplateLayout4/TL/TL4a/TL4a";
import useIntersectionObserver from "@/utils/useIntersectionObserver";

interface TemplateBProps {
  post: IPosts;
}

const TemplateB: NextPage<TemplateBProps> = ({ post }) => {
  useIntersectionObserver();
  const { cards } = post.template[0];

  const templateLayout1Props = {
    img: cards[0]?.url,
    author: post.author,
    txt: cards[0]?.txt,
  };

  const templateLayout2Props = extractCardProps(cards, 1, 4);

  const TL4bProps = {
    img: cards[4]?.url,
    txt: cards[4]?.txt,
    connectedTxt: cards[4]?.connected_txt,
  };

  const templateLayout4Props = extractCardProps(cards, 5, 8);

  const templateLayout3Props = {
    img: cards[8]?.url,
    txt: cards[8]?.txt,
  };

  const TL4aProps = {
    img: cards[9]?.url,
    txt: cards[9]?.txt,
    connectedTxt: cards[9]?.connected_txt,
  };

  const TL4bProps_1 = {
    img: cards[10]?.url,
    txt: cards[10]?.txt,
    connectedTxt: cards[10]?.connected_txt,
  };

  return (
    <>
      <TemplateLayout1 {...templateLayout1Props} />
      <TemplateLayout2 {...templateLayout2Props} />
      <TL4b {...TL4bProps} />
      <TemplateLayout4 {...templateLayout4Props} />
      <TemplateLayout3 {...templateLayout3Props} />
      <TL4a {...TL4aProps} />
      <TL4b {...TL4bProps_1} />
    </>
  );
};

export default TemplateB;
