import { IPosts } from "@/types/posts";
import { NextPage } from "next";
import TemplateLayout1 from "../templateLayouts/templateLayout1/templateLayout1";
import TemplateLayout3 from "../templateLayouts/TemplateLayout3/TemplateLayout3";
import TemplateLayout4 from "../templateLayouts/TemplateLayout4/TemplateLayout4";
import TL4b from "../templateLayouts/TemplateLayout4/TL/TL4b/TL4b";
import { extractCardProps } from "../templateA/templateA";
import TemplateLayout6 from "../templateLayouts/TemplateLayout6/TemplateLayout6";
import TL4a from "../templateLayouts/TemplateLayout4/TL/TL4a/TL4a";
import useIntersectionObserver from "@/utils/useIntersectionObserver";

interface TemplateCProps {
  post: IPosts;
}

const TemplateC: NextPage<TemplateCProps> = ({ post }) => {
  useIntersectionObserver();
  const { cards } = post.template[0];

  const templateLayout1Props = {
    img: cards[0]?.url,
    author: post.author,
    txt: cards[0]?.txt,
  };

  const templateLayout6Props = extractCardProps(cards, 1, 4);

  const templateLayout4Props = extractCardProps(cards, 4, 7);

  const TL4bProps = {
    img: cards[7]?.url,
    txt: cards[7]?.txt,
    connectedTxt: cards[7]?.connected_txt,
  };

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
      <TemplateLayout6 {...templateLayout6Props} />
      <TemplateLayout4 {...templateLayout4Props} />
      <TL4b {...TL4bProps} />
      <TemplateLayout3 {...templateLayout3Props} />
      <TL4a {...TL4aProps} />
      <TL4b {...TL4bProps_1} />
    </>
  );
};

export default TemplateC;
