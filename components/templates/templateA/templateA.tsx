import { IPosts } from "@/types/posts";
import { NextPage } from "next";
import TemplateLayout1 from "../templateLayouts/templateLayout1/templateLayout1";
import TemplateLayout2 from "../templateLayouts/templateLayout2/templateLayout2";
import classes from "./templateA.module.css";
import { getImageSize } from "@/utils/postTemplateClasses";

interface TemplateAProps {
  post: IPosts;
}

const TemplateA: NextPage<TemplateAProps> = ({ post }) => {
  const { className, height, width } = getImageSize(
    post.template[0].cards[0]?.size
  );

  const templateLayout1Props = {
    img: post.template[0]?.cards[0]?.url,
    author: post.author,
    txt: post.template[0]?.cards[0]?.txt,
    className,
    height,
    width,
  };

  const cardsForLayout2 = post.template[0].cards
    .slice(1, 4)
    .map((card) => card.url); // slice(1, 4) extracts from index 1 to 3 and select each url

  const templateLayout2Props = {
    img: cardsForLayout2,
    className,
    height,
    width,
  };

  return (
    <>
      <TemplateLayout1 {...templateLayout1Props} />
      <TemplateLayout2 {...templateLayout2Props} />
    </>
  );
};

export default TemplateA;
