import { IPosts } from "@/types/posts";
import { NextPage } from "next";

interface TemplateBProps {
  post: IPosts;
}

const TemplateB: NextPage<TemplateBProps> = ({ post }) => {
  return <div>templateB</div>;
};

export default TemplateB;
