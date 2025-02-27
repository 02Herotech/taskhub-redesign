import type { Metadata } from "next";
import React from "react";
import PostTask from "./PostTask";

export const metadata: Metadata = {
  title: "Post Your Task | Olojà",
};

function Page() {
  return <PostTask />;
}

export default Page;
