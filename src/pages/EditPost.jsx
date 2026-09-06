import React, { useEffect, useState } from "react";
import { Container,PostForm } from "../components";
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost (){
    const [Posts,setPosts] =useState(null);
    const {slug} =useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((Posts)=>{
                if(Posts){
                    setPosts(Posts)
                }
                else{
                    navigate('/')
                }
            })
        }
    },[slug,navigate])
    
    return Posts ? (
        <div className=" py-8">
            <Container>
                <PostForm post={Posts} />
            </Container>
        </div>
    ) : null
}
export default EditPost;