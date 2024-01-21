import { fetchCommunities } from "@/lib/actions/community.actions";
import ClubCard from "../cards/ClubCard";
import CarouselCard from "../cards/CarouselCard";
import { fetchUsers } from "@/lib/actions/user.actions";
import ProfileCard from "../cards/ProfileCard";

async function RightSidebar() {
  const commuminutyResult = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 3,
  });

  const userResult = await fetchUsers({
    userId: "",
    searchString: "",
    pageNumber: 1,
    pageSize: 5,
  });

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-black dark:text-light-1">
          Suggested Clubs
        </h3>
        <div className="flex flex-col gap-3.5 justify-center mt-2.5">
          {commuminutyResult.communities.map((community) => (
            <ClubCard
              key={community.id}
              id={community.id}
              name={community.name}
              username={community.username}
              imgUrl={community.image}
              bio={community.bio}
              members={community.members}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-black dark:text-light-1 mb-2">
          Suggested Readers
        </h3>

        <CarouselCard>
          {userResult.users.map((user: any, index: number) => (
            <ProfileCard
              id={index + 1}
              imgUrl={user.image}
              name={user.name}
              username={user.username}
              key={user._id}
              personType=""
              bio={user.bio}
            />
          ))}
        </CarouselCard>
      </div>
    </section>
  );
}

export default RightSidebar;
