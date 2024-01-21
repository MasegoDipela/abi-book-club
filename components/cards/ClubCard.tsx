import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    image: string;
  }[];
}

const ClubCard = ({ id, name, username, imgUrl, bio, members }: Props) => {
  return (
    <article
      className="group bg-transparent rounded-lg cursor-pointer 
    transform hover:-translate-y-1 hover:bg-gray-100 dark:hover:bg-dark-4 duration-150 ease-in-out "
    >
      <Link href={`/clubs/${id}`}>
        <div className="flex gap-5">
          <div className="flex flex-col justify-center rounded-l-lg overflow-hidden relative w-14 ">
            <Image
              src={imgUrl}
              alt="community_logo"
              fill
              className=" object-cover -translate-x-8 group-hover:translate-x-0 duration-500 ease-in-out"
            />
          </div>
          <div className="flex flex-col justify-center py-4 -translate-x-8 group-hover:translate-x-0 duration-500 ease-in-out ">
            <p className="text-heading2-medium text-black dark:text-light-2">
              {name}
            </p>
            <p className="text-small-regular text-light-3">
              {abbreviateMembers(members.length)} member(s)
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};
const abbreviateMembers = (members: number): string => {
  if (members >= 1000) {
    const abbreviated = (members / 1000).toFixed(2);
    return `${abbreviated}k`;
  } else {
    return members.toString();
  }
};

export default ClubCard;
