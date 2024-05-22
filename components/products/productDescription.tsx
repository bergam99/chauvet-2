import Image from "next/image";
import classes from "./productDescription.module.css";

var $ = require("jquery");
if (typeof window !== "undefined") {
  // client-side only code
  window.$ = window.jQuery = require("jquery");
}

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

interface ProductImage {
  url: string;
}

interface productDescriptionProps {
  img: ProductImage[];
  description: string;
}

const options = {
  loop: true,
  dots: false,
  nav: true,
  navText: ["<", ">"],
  responsive: {
    0: {
      items: 1.2,
    },
    800: {
      items: 2.5,
    },
  },
};

const productDescription = ({ img, description }: productDescriptionProps) => {
  return (
    <>
      <ul className={classes.imageListContainer}>
        <OwlCarousel {...options}>
          {img?.map((img) => (
            <li key={img.url} className={classes.imageListItem}>
              <Image
                src={img?.url}
                alt={img?.url}
                width={400}
                height={300}
                className={classes.img}
              />
            </li>
          ))}
        </OwlCarousel>
      </ul>
      <p className={classes.des}>{description}</p>
    </>
  );
};

export default productDescription;
