import EntryCard from "@/components/cards/EntryCard";

import { fetchPosts } from "@/lib/actions/journal.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const result = await fetchPosts(1, 30);
  const user = await currentUser();

  let userInfo: any = null;

  if (user) userInfo = await fetchUser(user?.id);

  return (
    <>
      <h1 className="head-text text-left text-black dark:text-white">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No entries found</p>
        ) : (
          <>
            {result.posts.map((post: any, index) => (
              <EntryCard
                key={post._id}
                id={post._id}
                currentUserId={userInfo?._id || ""}
                // parentId={post.parentId}
                content={post.text}
                author={{
                  name: post.author.name,
                  image: post.author.image,
                  id: post.author.id,
                }}
                community={
                  post.community
                    ? {
                        id: post.community.id,
                        name: post.community.name,
                        image: post.community.image,
                      }
                    : null
                }
                createdAt={post.createdAt}
                comments={JSON.parse(JSON.stringify(post.children))}
                likes={JSON.parse(JSON.stringify(post.likes))}
                // comments={[]}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
