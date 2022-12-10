import React, { useEffect, useState } from 'react';


import { createContext } from "react";
export const AllPost = createContext() 

const PostContext = ({children}) => {

    const [posts , setPosts] = useState([])

    //fetching all post 

    useEffect(()=>{

        fetch('https://openapi.programming-hero.com/api/news/category/08')
        .then(res => res.json())
        .then(data => {
            setPosts(data.data)
        })

    } , [])

    const postData = {posts}


    return (
        <AllPost.Provider value={postData}>
            {children}
        </AllPost.Provider>
    );
};

export default PostContext;