import { redirect } from "next/navigation";

function Page() {
  redirect("/customer/payment-new/wallet");
  return <div>Payment</div>;
}

export default Page;
