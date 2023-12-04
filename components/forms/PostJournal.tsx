"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { JournalValidation } from "@/lib/validations/journal";
import { createEntry } from "@/lib/actions/journal.actions";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface Props {
  userId: string;
}

function PostJournal({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const organization = useOrganization();

  const [blocks, setBlocks] = useState("");

  const form = useForm({
    resolver: zodResolver(JournalValidation),
    defaultValues: {
      journal: "This is the test entry",
      accountId: userId,
    },
  });
  const onSubmit = async (values: z.infer<typeof JournalValidation>) => {
    await createEntry({
      text: blocks,
      author: userId,
      communityId:
        organization && organization.organization
          ? organization.organization.id
          : null,
      path: pathname,
    });

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="journal"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                {/* <Textarea rows={15} {...field} /> */}
                <Editor
                  apiKey="w4dg63t3nvw0nejcjlzvx5odxzjj84d8hg8oat4i7t6j3353"
                  plugins={["link", "paste", "table", "image", "code"]}
                  value={blocks}
                  onEditorChange={setBlocks}
                  init={{
                    skin: "oxide-dark",
                    content_css: "dark",
                    height: 500,
                  }}
                  // {...field}
                />
              </FormControl>
              {/* <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1"></FormControl> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-red-800">
          Post Entry
        </Button>
      </form>
    </Form>
  );
}

export default PostJournal;
