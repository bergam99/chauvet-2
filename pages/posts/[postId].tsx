import { GetServerSideProps, NextPage } from "next";
import { getPost } from "@/utils/extract";
import { IPosts } from "@/types/posts";
import Image from "next/image";
import classes from "./postId.module.css";
type PostPageProps = {
  post?: IPosts;
};

function getImageAttributes(size: string) {
  switch (size) {
    case "Horizontal_Full":
      return { className: "horizontal-full", height: 0, width: 0 };
    case "Vertical_Full":
      return { className: "vertical-full", height: 0, width: 0 };
    case "Horizontal_Small":
      return { className: "horizontal-small", height: 0, width: 0 };
    case "Horizontal_Medium":
      return { className: "horizontal-medium", height: 0, width: 0 };
    case "Vertical_Small":
      return { className: "vertical-small", height: 0, width: 0 };
    default:
      return { className: "", height: 0, width: 0 };
  }
}

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
          {/* {post.author && <p>{post.author}</p>} */}
          {post.template[0]?.cards.map((card, index) => {
            const { className, height, width } = getImageAttributes(card.size);
            return (
              <div key={index} className={classes[className]}>
                <Image
                  src={card.url}
                  alt={post.title}
                  height={height}
                  width={width}
                  priority={index === 0}
                  layout="responsive"
                />
                {card.connected_txt && (
                  <p className={classes.connectedTxt}>{card.connected_txt}</p>
                )}
                {card.txt && <p>{card.txt}</p>}
              </div>
            );
          })}
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
