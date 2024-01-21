import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { timeDifferenceForDate } from "@/lib/utils";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  //getActivity
  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className="head-text mb-10 text-black dark:text-white">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity: any) =>
              activity.type === "reply" ? (
                <Link key={activity._id} href={`/journal/${activity.parentId}`}>
                  <article className="activity-card justify-between">
                    <div className="flex gap-2">
                      <Image
                        src={activity.author.image}
                        alt="Profile picture"
                        width={20}
                        height={20}
                        className="rounded-full object-cover"
                      />
                      <p className="!text-small-regular text-black dark:text-light-1">
                        <span className="mr-1 text-red-800">
                          {activity.author.name}
                        </span>{" "}
                        replied to your thread
                      </p>
                    </div>
                    <p className="!text-small-regular text:slate-600 dark:text-light-3">
                      {timeDifferenceForDate(activity.createdAt)} ago
                    </p>
                  </article>
                </Link>
              ) : (
                <Link key={activity._id} href={`/journal/${activity.parentId}`}>
                  <article className="activity-card justify-between">
                    <div className="flex gap-3">
                      <Image
                        src={activity.user.image}
                        alt="Profile picture"
                        width={20}
                        height={20}
                        className="rounded-full object-cover"
                      />
                      <p className="!text-small-regular text-light-1">
                        <span className="mr-1 text-primary-500">
                          {activity.user.name}
                        </span>{" "}
                        liked your thread
                      </p>
                    </div>
                    <p className="!text-small-regular text-light-3">
                      {timeDifferenceForDate(activity.createdAt)} ago
                    </p>
                  </article>
                </Link>
              )
            )}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </section>
    </section>
  );
}

export default Page;
