"use client";
import React from "react";
import Image from "next/image";
import { likeEntry } from "@/lib/actions/journal.actions";

interface Props {
  id: string;
  currentUserId: string;
}

const LikeButton = ({ id, currentUserId }: Props) => {
  const handleLike = async () => {
    await likeEntry(id, JSON.parse(currentUserId), "/");
  };
  return (
    <Image
      onClick={() => handleLike()}
      src="/assets/heart-gray.svg"
      alt="heart"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
    />
  );
};

export default LikeButton;
