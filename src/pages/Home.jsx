import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";
import { Container, Postcard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service
      .getPosts([])
      .then((response) => {
        if (response) {
          setPosts(response.documents);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-sky-200 border-t-sky-500 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-slate-500">Loading posts...</p>
        </div>
      </div>
    );
  }

  // No posts
  if (!loading && posts.length === 0) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center bg-white">
        <div className="text-center px-6 max-w-sm">
          <div className="mx-auto mb-6 h-px w-10 bg-sky-400" />

          <h2 className="font-serif text-2xl text-slate-800">No posts yet</h2>

          <p className="mt-3 text-slate-500 leading-relaxed">
            There aren't any posts available right now. Check back later.
          </p>
        </div>
      </div>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <div className="w-full min-h-screen bg-slate-100">
      <Container>
        <div className="max-w-4xl mx-auto py-14 px-4">
          {/* Masthead */}
          <header className="mb-12">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500 mb-3">
                  Community Blog
                </p>

                <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-slate-900">
                  Field Notes
                </h1>

                <p className="mt-3 text-slate-500">
                  Writing from the community, newest first
                </p>
              </div>

              <span className="hidden sm:block text-sm text-slate-400">
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </span>
            </div>

            <div className="mt-7 h-px bg-sky-100" />
          </header>

          {/* Featured Post */}
          {featured && (
            <section className="mb-12 pb-12 border-b border-sky-100">
              <Link to={`/post/${featured.$id}`} className="group block">
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-7 items-center">
                  {/* Image */}
                  <div className="sm:col-span-2 rounded-xl overflow-hidden">
                    <Postcard
                      $id={featured.$id}
                      title={featured.title}
                      img_id={featured.img_id}
                    />
                  </div>

                  {/* Content */}
                  <div className="sm:col-span-3">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-sky-600">
                      Latest story
                    </span>

                    <h2 className="mt-3 font-serif text-2xl md:text-3xl text-slate-900 leading-snug group-hover:text-sky-700 transition-colors">
                      {featured.title}
                    </h2>

                    <p className="mt-4 text-slate-500 leading-relaxed">
                      Read the latest story from our community and discover
                      something new.
                    </p>

                    <span className="inline-block mt-5 text-sm font-medium text-sky-600 group-hover:text-sky-700">
                      Read story →
                    </span>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Remaining Posts */}
          {rest.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="font-serif text-xl text-slate-900">
                  More stories
                </h2>

                <div className="flex-1 h-px bg-sky-100" />
              </div>

              <div className="divide-y divide-sky-100">
                {rest.map((post) => (
                  <Link
                    key={post.$id}
                    to={`/post/${post.$id}`}
                    className="group flex items-center gap-5 py-5"
                  >
                    {/* Thumbnail */}
                    <div className="w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <Postcard
                        $id={post.$id}
                        title={post.title}
                        img_id={post.img_id}
                        compact
                      />
                    </div>

                    {/* Title */}
                    <div className="flex-1">
                      <h3 className="font-serif text-lg md:text-xl text-slate-800 group-hover:text-sky-700 transition-colors leading-snug">
                        {post.title}
                      </h3>

                      <span className="inline-block mt-2 text-xs text-slate-400">
                        Read story →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;
