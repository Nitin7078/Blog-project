import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, Postcard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts([]).then((response) => {
      if (response) {
        setPosts(response.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return <div>Login to Read Posts</div>;
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
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

export default Home;
