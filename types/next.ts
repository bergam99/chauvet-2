import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

// nested layout
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
