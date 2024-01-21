"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommunityValidation } from "@/lib/validations/community";

import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { ChangeEvent, useState } from "react";
import { createCommunity } from "@/lib/actions/community.actions";
import { Input } from "../ui/input";
import Image from "next/image";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";

interface Props {
  community: {
    id?: string;
    username: string;
    name: string;
    image: string;
    bio: string;
  };
  userId: string;
}

const Community = ({ community, userId }: Props) => {
  const { startUpload } = useUploadThing("media");
  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter();

  const form = useForm<z.infer<typeof CommunityValidation>>({
    resolver: zodResolver(CommunityValidation),
    defaultValues: {
      image: community?.image ? community.image : "",
      name: community?.name ? community.name : "",
      username: community?.username ? community.username : "",
      bio: community?.bio ? community.bio : "",
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof CommunityValidation>) => {
    const blob = values.image;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      console.log("Files before upload", files);
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].fileUrl) {
        values.image = imgRes[0].fileUrl;
      }
    }

    const response = await createCommunity(
      values.name,
      values.username,
      values.image,
      values.bio,
      userId
    );

    router.push(`/clubs/${response}`);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label overflow-hidden">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile_icon"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-cover"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile_icon"
                    width={24}
                    height={24}
                    className="rounded-full object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Add profile photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-1">
              <FormLabel className="text-base-semibold text-light-2">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  placeholder="Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  placeholder="Username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-red-800">
          Create new club
        </Button>
      </form>
    </Form>
  );
};

export default Community;
