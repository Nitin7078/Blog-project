
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteservice from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "",
    },
  });

  const navigate = useNavigate();

  const userData = useSelector((state) => state.user.userData);

  const submit = async (data) => {
    try {
      if (post) {
        // Update existing post
        let file = null;

        if (data.image?.[0]) {
          file = await appwriteservice.uploadFile(data.image[0]);
        }

        // Delete old image if a new image was uploaded
        if (file) {
          await appwriteservice.deleteFile(post.featuredImage);
        }

        const dbpost = await appwriteservice.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      } else {
        // Create new post
        const file = await appwriteservice.uploadFile(data.image[0]);

        if (file) {
          const file_id = file.$id;

          const dbpost = await appwriteservice.createPost({
            ...data,
            featuredImage: file_id,
            userid: userData.$id,
          });

          if (dbpost) {
            navigate(`/post/${dbpost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Post submission error:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    }

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteservice.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;

// ### What I corrected

// * `getValue` → `getValues`
// * `setvalue` → `setValue`
// * `transform()` → `slugTransform()`
// * Fixed slug regex
// * Added `await` to image upload during update
// * Changed `uploadFile(data.image)` → `uploadFile(data.image[0])`
// * Fixed `` `/post/$(dbpost.$id)` `` → `` `/post/${dbpost.$id}` ``
// * Fixed `getfilepreview()` → `getFilePreview()`
// * Added `try/catch` around submission
// * Preserved the old featured image when updating without selecting a new image
// * Added optional chaining for `data.image?.[0]`

// **One thing to verify:** your `config.js` must actually have methods named `uploadFile`, `deleteFile`, `updatePost`, `createPost`, and `getFilePreview`. If any method has a different name, use the exact name from your service file.
