"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "../ui/button";
import {
  approveMemberToCommunity,
  declineRequestCommunity,
} from "@/lib/actions/community.actions";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
  communityId?: string;
}

function UserCard({
  id,
  name,
  username,
  imgUrl,
  personType,
  communityId,
}: Props) {
  const router = useRouter();

  const path = usePathname();

  const isCommunity = personType === "Community";

  const rejectMemeberRequest = async () => {
    if (communityId) await declineRequestCommunity(id, communityId, path);
  };

  const approveMemberRequest = async () => {
    if (communityId) await approveMemberToCommunity(communityId, id, path);
  };

  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <div className="relative h-12 w-12">
          <Image
            src={imgUrl}
            alt="user_logo"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-black dark:text-light-1">
            {name}
          </h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>

      <Button
        className="user-card_btn"
        onClick={() => {
          router.push(`/profile/${id}`);
        }}
      >
        View
      </Button>
      {personType === "Member" && (
        <Button className="user-card_btn" variant="destructive">
          Ban
        </Button>
      )}

      {personType === "Request" && (
        <>
          <Button
            className="user-card_btn"
            variant="destructive"
            onClick={() => rejectMemeberRequest()}
          >
            Reject
          </Button>
          <Button
            className="user-card_btn bg-green-800"
            onClick={() => approveMemberRequest()}
          >
            Accept
          </Button>
        </>
      )}
    </article>
  );
}

export default UserCard;
