import React from "react";
import Navigation from "./Navigation";

const UpdateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="mt-4 w-full pb-10">
      <Navigation />
      {children}
    </section>
  );
};

export default UpdateLayout;
