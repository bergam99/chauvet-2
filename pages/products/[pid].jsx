import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Link from "next/link";

const ProductDetailPage = ({ detail }) => {
  if (!detail) return <div>detail not found</div>;

  return (
    <div>
      <h1>{detail.name}</h1>
      <p>{detail.description}</p>
      <p>${detail.price}</p>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const pid = context.params.pid;

  // optimize  this  + products page
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/products`);
  const { products } = await res.json();
  //
  const detail = products.find((detail) => detail._id === pid);

  return {
    props: { detail: detail },
  };
};

export default ProductDetailPage;
