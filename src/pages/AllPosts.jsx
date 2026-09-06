import React, { useEffect, useState } from "react";
import { Container, Postcard } from "../components";
import { service as appwriteService } from "../appwrite/config";
function AllPost() {
  const [Post, setPost] = useState([]);

  useEffect(() => {}, []);
  appwriteService.getPosts([]).then((Post) => {
    if (Post) {
      setPost(Post.document);
    }
  });
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {Post.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <Postcard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
