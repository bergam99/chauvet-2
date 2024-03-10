import { IPosts } from "@/types/posts";
import { NextPage } from "next";

interface TemplateCProps {
  post: IPosts;
}

const TemplateC: NextPage<TemplateCProps> = ({ post }) => {
  return <div>templateC</div>;
};

export default TemplateC;
