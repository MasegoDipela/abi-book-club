import PostJournal from "@/components/forms/PostJournal";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo: any = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <PostJournal
        user={{
          id: userInfo.id,
          _id: userInfo._id,
          image: userInfo.image,
          name: userInfo.name,
          communities: JSON.parse(JSON.stringify(userInfo.communities)),
        }}
      />
    </>
  );
}

export default Page;
