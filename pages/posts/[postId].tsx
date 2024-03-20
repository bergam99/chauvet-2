import { GetServerSideProps, NextPage } from "next";
import { getPost } from "@/utils/extract";
import { IPosts } from "@/types/posts";
import classes from "./postId.module.css";
import TemplateA from "@/components/templates/templateA/templateA";
import TemplateB from "@/components/templates/templateB/templateB";
import TemplateC from "@/components/templates/templateC/templateC";

type PostPageProps = {
  post?: IPosts;
};

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  if (!post) return <div>product not found</div>;

  return (
    <>
      <section className={classes.section}>
        <div className={classes.title}>
          <i className={classes.thema}>{post.thema}</i>
          <h1 className={classes.heading}>{post.title}</h1>
        </div>
        <div>
          {post.template.map((template, index) => (
            <div key={index}>
              {template.templateKey === "templateA" && (
                <TemplateA post={post} />
              )}
              {template.templateKey === "templateB" && (
                <TemplateB post={post} />
              )}
              {template.templateKey === "templateC" && (
                <TemplateC post={post} />
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postId = context.params?.postId?.toString();

  try {
    const post = await getPost(postId);
    return {
      props: { post },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default PostPage;
