import { redirect } from "next/navigation";

function Page() {
  redirect("/service-provider/settings/profile");
  return <div>Settings</div>;
}

export default Page;
