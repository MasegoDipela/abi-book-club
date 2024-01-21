"use client";

import { likeEntry } from "@/lib/actions/journal.actions";
import { formatDateString } from "@/lib/utils";
import { timeDifferenceForDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./EntryCard.css";

interface Props {
  id: string;
  content: string;
  currentUserId: string;
  parentId?: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    _id: string;
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
      name: string;
    };
  }[];
  likes: [];
  isComment?: boolean;
}

const EntryCard = ({
  id,
  content,
  author,
  community,
  createdAt,
  comments,
  likes,
  isComment,
  currentUserId,
}: Props) => {
  const pathname = usePathname();
  const handleLike = async () => {
    await likeEntry(id, currentUserId, pathname);
  };

  const isLiked = likes.find((l: any) => l.user === currentUserId);
  return (
    <article
      className={`flex w-full flex-col rounded-xl parent-text  ${
        isComment ? "px-0 xs:px-7" : "bg-gray-100 dark:bg-dark-2 p-7"
      } `}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-black dark:text-light-1">
                {author.name}
              </h4>
            </Link>

            <div
              className={`${
                isComment && "mb-5"
              } mt-2 text-small-regular text-black dark:text-light-2 max-w-lg text-wrap`}
            >
              <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex items-center gap-3.5">
                <div className="flex items-center gap-1">
                  <Image
                    onClick={() => handleLike()}
                    src={`${
                      isLiked
                        ? "/assets/heart-filled.svg"
                        : "/assets/heart-gray.svg"
                    }`}
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                  <p className="text-subtle-medium text-gray-1 bg- items-center">
                    {likes.length}
                  </p>
                </div>
                <Link href={`/journal/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
              </div>

              {comments.length > 0 && (
                <div className="flex gap-2">
                  <div className="flex relative ml-2.5">
                    {comments.map((comment, index) => {
                      return (
                        index < 4 && (
                          <Image
                            key={index}
                            src={comment.author.image}
                            alt={`${comment.author.name} profile image`}
                            width={24}
                            height={24}
                            className="cursor-pointer object-contain -ml-2.5 bg-dark-2 rounded-full border-2 border-dark-2"
                          />
                        )
                      );
                    })}
                  </div>

                  <Link href={`/journal/${id}`}>
                    <p className="mt-1 text-subtle-medium text-gray-1">
                      {comments.length} comments
                    </p>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TODO: Delete thread */}

        {
          <p className="!text-small-regular text-light-3">
            {timeDifferenceForDate(new Date(createdAt))} ago
          </p>
        }
      </div>
      {!isComment && community && (
        <Link
          href={`/clubs/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)} - {community.name} Club
          </p>
          <div className="relative h-4 w-4">
            <Image
              src={community.image}
              alt={community.name}
              fill
              className="ml-2 rounded-full"
            />
          </div>
        </Link>
      )}
    </article>
  );
};

export default EntryCard;
