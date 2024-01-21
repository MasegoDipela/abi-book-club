"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
  memberRequestToCommunity,
  removeUserFromCommunity,
  updateCommunityInfo,
} from "@/lib/actions/community.actions";
import { usePathname, useRouter } from "next/navigation";
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
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  isMember?: boolean;
  isOwner?: boolean;
  type?: "User" | "Community";
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  isMember,
  isOwner,
  type,
}: Props) => {
  const pathName = usePathname();

  const joinCommunity = async () => {
    await memberRequestToCommunity(accountId, authUserId, pathName);
  };

  const leaveCommunity = async () => {
    await removeUserFromCommunity(authUserId, accountId, pathName);
  };

  const confirmDeleteCommunity = async () => {
    await updateCommunityInfo(accountId, name, username, imgUrl, "delete");
  };
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="Profile image"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-black dark:text-light-1">
              {name}
            </h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>

        {!isOwner && !isMember && type === "Community" && (
          <div>
            <Button
              onClick={() => joinCommunity()}
              size="sm"
              className="community-card_btn bg-slate-800"
            >
              Join
            </Button>
          </div>
        )}
        {isOwner && isMember && type === "Community" && (
          <div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  // onClick={() => leaveCommunity()}
                  size="sm"
                  className="community-card_btn bg-red-800"
                >
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your club, remove all your club's entries and members.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => confirmDeleteCommunity()}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
        {!isOwner && isMember && type === "Community" && (
          <div>
            <Button
              onClick={() => leaveCommunity()}
              size="sm"
              className="community-card_btn bg-slate-800"
            >
              Leave
            </Button>
          </div>
        )}
      </div>

      {/* TODO: Community */}

      <p className="mt-6 max-w-lg text-base-regular text-black dark:text-light-2">
        {bio}
      </p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;
