
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteservice from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

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
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Watch image for preview
  const image = watch("image");

  useEffect(() => {
    if (image?.[0]) {
      const objectUrl = URL.createObjectURL(image[0]);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const submit = async (data) => {
    try {
      setLoading(true);

      if (post) {
        // -----------------------------
        // UPDATE EXISTING POST
        // -----------------------------

        let file = null;

        if (data.image?.[0]) {
          file = await appwriteservice.uploadFile(data.image[0]);
        }

        // Delete old image only if new image was uploaded
        if (file && post.img_id) {
          try {
            await appwriteservice.deleteFile(post.img_id);
          } catch (error) {
            console.log("Old image could not be deleted:", error);
          }
        }

        const dbpost = await appwriteservice.updatePost(post.$id, {
          title: data.title,
          slug: data.slug,
          content: data.content,
          status: data.status,
          img_id: file ? file.$id : post.img_id,
        });

        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      } else {
        // -----------------------------
        // CREATE NEW POST
        // -----------------------------

        if (!data.image?.[0]) {
          alert("Please select a featured image.");
          return;
        }

        const file = await appwriteservice.uploadFile(data.image[0]);

        if (file) {
          const dbpost = await appwriteservice.createPost({
            title: data.title,
            slug: data.slug,
            content: data.content,
            status: data.status,
            featuredImage: file.$id,
            user_id: userData.$id,
          });

          if (dbpost) {
            navigate(`/post/${dbpost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Post submission error:", error);
      alert(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Slug transformation
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

  // Automatically generate slug from title
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-600">
            {post ? "EDIT ARTICLE" : "CREATE ARTICLE"}
          </span>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {post ? "Edit your story" : "Create something amazing"}
          </h1>

          <p className="mt-2 text-gray-500">
            {post
              ? "Update your article and keep your readers engaged."
              : "Share your thoughts, ideas and stories with the world."}
          </p>
        </div>

        {/* Main Card */}
        <form
          onSubmit={handleSubmit(submit)}
          className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl"
        >
          <div className="grid lg:grid-cols-3">

            {/* Left - Editor */}
            <div className="p-6 sm:p-8 lg:col-span-2">

              {/* Section title */}
              <div className="mb-7">
                <h2 className="text-xl font-bold text-gray-900">
                  Article Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Write and organize your article content.
                </p>
              </div>

              {/* Title */}
              <div className="mb-6">
                <Input
                  label="Title"
                  placeholder="Enter your article title..."
                  className="mb-2"
                  {...register("title", { required: true })}
                />
              </div>

              {/* Slug */}
              <div className="mb-6">
                <Input
                  label="Slug"
                  placeholder="your-article-slug"
                  className="mb-2"
                  {...register("slug", { required: true })}
                  onInput={(e) => {
                    setValue(
                      "slug",
                      slugTransform(e.currentTarget.value),
                      {
                        shouldValidate: true,
                      }
                    );
                  }}
                />

                <p className="mt-1 text-xs text-gray-400">
                  URL: /post/{getValues("slug") || "your-slug"}
                </p>
              </div>

              {/* Content */}
              <div>
                <RTE
                  label="Content"
                  name="content"
                  control={control}
                  defaultValue={getValues("content")}
                />
              </div>
            </div>

            {/* Right - Settings */}
            <div className="border-t border-gray-200 bg-gray-50 p-6 sm:p-8 lg:border-l lg:border-t-0">

              {/* Settings title */}
              <div className="mb-7">
                <h2 className="text-xl font-bold text-gray-900">
                  Publish Settings
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Configure your article before publishing.
                </p>
              </div>

              {/* Image Upload */}
              <div className="mb-7">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Featured Image
                </label>

                <label
                  htmlFor="featured-image"
                  className="group relative flex min-h-52 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-white transition hover:border-blue-400 hover:bg-blue-50"
                >
                  {preview ? (
                    <>
                      <img
                        src={preview}
                        alt="Preview"
                        className="absolute inset-0 h-full w-full object-cover"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                        <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900">
                          Change image
                        </span>
                      </div>
                    </>
                  ) : post?.img_id ? (
                    <>
                      <img
                        src={appwriteservice.getFileView(post.img_id)}
                        alt={post.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                        <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900">
                          Change image
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
                        🖼️
                      </div>

                      <p className="text-sm font-semibold text-gray-700">
                        Upload featured image
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        PNG, JPG, JPEG, GIF or WEBP
                      </p>
                    </>
                  )}

                  <input
                    id="featured-image"
                    type="file"
                    accept=".png,.jpg,.jpeg,.gif,.webp"
                    className="hidden"
                    {...register("image", {
                      required: !post,
                    })}
                  />
                </label>
              </div>

              {/* Status */}
              <div className="mb-7">
                <Select
                  options={["active", "inactive"]}
                  label="Status"
                  className="mb-2"
                  {...register("status", {
                    required: true,
                  })}
                />
              </div>

              {/* Info Box */}
              <div className="mb-7 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex gap-3">
                  <div className="text-lg">💡</div>

                  <div>
                    <h3 className="text-sm font-semibold text-blue-900">
                      Publishing tip
                    </h3>

                    <p className="mt-1 text-xs leading-relaxed text-blue-700">
                      Use a clear title and an attractive featured image
                      to make your article more engaging.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                bgcolor={post ? "bg-green-500" : "bg-blue-600"}
                className="w-full rounded-xl py-3 text-base font-semibold shadow-lg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? post
                    ? "Updating..."
                    : "Publishing..."
                  : post
                  ? "Update Article"
                  : "Publish Article"}
              </Button>

              {/* Cancel */}
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mt-3 w-full rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>

        {/* Bottom text */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Your content is securely stored and managed through Appwrite.
        </p>
      </div>
    </div>
  );
}

export default PostForm;


// ### One important thing

// Since you previously got:

// ```text
// AppwriteException: File extension not allowed
// ```

// your Appwrite **Storage bucket settings** also need to allow the extensions you're uploading.

// Go to:

// **Appwrite Console → Storage → Your Bucket → Settings → Allowed File Extensions**

// Add:

// ```text
// jpg
// jpeg
// png
// gif
// webp
// ```

// The `accept` attribute in React only controls what the file picker shows; it **doesn't override Appwrite's bucket restrictions**.

// This version also gives you a **live image preview** when selecting a new image, while on edit it shows the existing Appwrite image until you choose a replacement.
