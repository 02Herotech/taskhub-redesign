import { redirect } from "next/navigation";

function Page() {
  redirect("/customer/settings/profile");
  return <div>Settings</div>;
}

export default Page;
