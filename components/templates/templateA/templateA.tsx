import { IPosts } from "@/types/posts";
import { NextPage } from "next";
import TemplateLayout1 from "../templateLayouts/templateLayout1/templateLayout1";
import TemplateLayout2 from "../templateLayouts/templateLayout2/templateLayout2";
import classes from "./templateA.module.css";
import TemplateLayout3 from "../templateLayouts/TemplateLayout3/TemplateLayout3";

interface TemplateAProps {
  post: IPosts;
}

const TemplateA: NextPage<TemplateAProps> = ({ post }) => {
  // ==== Layout 1 ====
  const templateLayout1Props = {
    img: post.template[0]?.cards[0]?.url,
    author: post.author,
    txt: post.template[0]?.cards[0]?.txt,
    size: post.template[0].cards[0]?.size,
  };

  // ==== Layout 2 ====
  const templateLayout2PropsIMG = post.template[0]?.cards
    .slice(1, 4)
    .map((card) => card.url); // slice(1, 4) extracts from index 1 to 3 and select each url

  const templateLayout2Props = {
    img: templateLayout2PropsIMG,
    size: post.template[0]?.cards.slice(1, 4).map((card) => card.size),
  };

  // ==== Layout 3 ====
  const templateLayout3Props = {
    img: post.template[0]?.cards[4]?.url,
    size: post.template[0]?.cards[4]?.size,
    txt: post.template[0]?.cards[4]?.txt,
  };

  return (
    <>
      <TemplateLayout1 {...templateLayout1Props} />
      <TemplateLayout2 {...templateLayout2Props} />
      <TemplateLayout3 {...templateLayout3Props} />
    </>
  );
};

export default TemplateA;
