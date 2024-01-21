"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import {
  memberRequestToCommunity,
  removeUserFromCommunity,
  updateCommunityInfo,
} from "@/lib/actions/community.actions";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    id: string;
    image: string;
  }[];
}

function CommunityCard({ id, name, username, imgUrl, bio, members }: Props) {
  return (
    <article className="w-40 sm:w-48">
      <div className="flex flex-wrap items-center gap-3">
        <Link href={`/clubs/${id}`} className="relative h-60 w-full ">
          <Image
            src={imgUrl}
            alt="community_logo"
            fill
            className="object-cover rounded-lg"
          />
        </Link>
      </div>

      <div className="mt-4">
        <Link href={`/clubs/${id}`}>
          <h4 className="text-base-semibold text-light-1 h-10 overflow-hidden text-ellipsis">
            {name}
          </h4>
        </Link>
        <p className="text-small-medium text-gray-1 overflow-hidden  text-ellipsis">
          @{username}
        </p>
      </div>

      <p className="mt-4 text-subtle-medium text-gray-1 h-16 overflow-hidden text-ellipsis">
        {bio}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
        {members.length > 0 && (
          <div className="flex items-center">
            {members.map(
              (member, index) =>
                index < 4 && (
                  <Image
                    key={index}
                    src={member.image}
                    alt={`user_${index}`}
                    width={28}
                    height={28}
                    className={`${
                      index !== 0 && "-ml-3"
                    } rounded-full object-cover`}
                  />
                )
            )}

            <p className="ml-1 text-subtle-medium text-gray-1">
              {members.length}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

export default CommunityCard;
