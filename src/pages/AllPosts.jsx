import React, { useEffect, useState } from "react";
import { Container, Postcard } from "../components";
import appwriteService from "../appwrite/config";
function AllPost() {
  const [Post, setPost] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((response) => {
      if (response) {
        setPost(response.documents);
      }
    });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {Post.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <Postcard
                $id={post.$id}
                title={post.title}
                img_id={post.img_id}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
