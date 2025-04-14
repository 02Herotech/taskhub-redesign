import { redirect } from "next/navigation";

function Page() {
  redirect("/new-settings/profile");
  return <div>Settings</div>;
}

export default Page;
