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
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";

interface Props {
  userId: string;
}

function PostJournal({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const organization = useOrganization();
  const { startUpload } = useUploadThing("media");

  const [files, setFiles] = useState<File[]>([]);

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
                  plugins={["link", "image", "code", "lists"]}
                  toolbar="undo redo | styleselect  | bold italic underline | numlist | bullist"
                  value={blocks}
                  onEditorChange={setBlocks}
                  init={{
                    skin: "oxide-dark",
                    content_css: "dark",
                    height: 500,
                    images_upload_handler: async (blobInfo) => {
                      return new Promise((resolve, reject) => {
                        const blockFile = new File(
                          [blobInfo.blob()],
                          blobInfo.filename(),
                          { type: blobInfo.blob().type }
                        ); // Convert BlobInfo to File
                        console.log("blockFile", blockFile);
                        const filesArray = [blockFile]; // Create a file array with the converted File object
                        console.log("filesArray", blockFile);
                        startUpload(filesArray)
                          .then((data) => {
                            if (data && data[0]) {
                              const url = data[0].fileUrl;
                              resolve(url);
                            } else {
                              resolve(blobInfo.blobUri());
                            }
                          })
                          .catch((e) => {
                            console.log("Error uploading file", e);
                            reject(e);
                          });
                      });
                    },
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
