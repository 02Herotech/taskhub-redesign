import { redirect } from "next/navigation";
import React from "react";

function Page() {
  redirect("/customer/payment-new/update/make");
  return <div>Page</div>;
}

export default Page;
