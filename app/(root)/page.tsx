import CommunityCard from "@/components/cards/CommunityCard";
import Community from "@/components/forms/Community";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const communityInfo = {
    id: "",
    username: "",
    name: "",
    image: "",
    bio: "",
  };

  // Fetch communities
  const result = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  const activeCommunities = result.communities.filter(
    (c) => c.status === "active"
  );

  return (
    <section>
      <div className="flex justify-between align-middle">
        <div className="flex-col">
          <h1 className="head-text text-black dark:text-white leading-none">
            Find Your Book Club
          </h1>
          <h1 className="head-text cursive">Community</h1>
          <img
            src="\assets\underline.png"
            alt="Text Underline"
            width="150px"
            height="10px"
            className="underline"
          ></img>
          <p className="mt-7 text-black dark:text-white">
            Hop into a book club and access curated content by your favorite
            creators. Heck, you could even create your own!
          </p>
        </div>
        <div className="flex items-center"></div>
      </div>
      {/* Search Bar*/}

      {/* Dialog for community form */}

      <div className="mt-9 flex flex-wrap gap-4">
        {activeCommunities.length === 0 ? (
          <p className="no-result">No Communities</p>
        ) : (
          <>
            {activeCommunities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={JSON.parse(JSON.stringify(community.members))}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
