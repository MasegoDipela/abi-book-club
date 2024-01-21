import React from "react";
import Image from "next/image";

interface Props {
  id: number;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
  bio: string;
}

const ProfileCard = ({
  id,
  name,
  username,
  imgUrl,
  personType,
  bio,
}: Props) => {
  return (
    <div
      id={`slide-${id}`}
      className="flex flex-col gap-1 px-5 py-2 bg-zinc-300 dark:bg-zinc-900"
    >
      <div className="flex gap-2">
        <div className="flex flex-col justify-center">
          <Image
            src={imgUrl}
            alt="community_logo"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col text-black dark:text-white">
          <p className="text-heading3-bold">{name}</p>
          <p className="text-small-medium text-zinc-800 dark:text-gray-1">
            @{username}
          </p>
        </div>
      </div>
      <div className="text-black dark:text-white mt-2">{bio}</div>
    </div>
  );
};

export default ProfileCard;
