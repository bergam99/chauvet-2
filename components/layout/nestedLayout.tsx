import type { NextPageWithLayout } from "@/pages/_app";

interface Props {
  children: React.ReactNode;
}

const NestedLayout = ({ children }: Props) => {
  return (
    <>
      <p>nested layout</p>
      <main>{children}</main>
    </>
  );
};

export default NestedLayout;
