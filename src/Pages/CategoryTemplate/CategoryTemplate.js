import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderBg from '../../Shared/HeaderBg/HeaderBg';
import SinglePostCard from '../../Shared/SinglePostCard/SinglePostCard';

const CategoryTemplate = () => {

    const {id} = useParams()
    const [posts, setPosts] = useState([]);
    console.log(posts);

    //fetching category wise post
    useEffect(() => {
        fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
          .then(res => res.json())
          .then(data => {
            console.log(data.data);
            setPosts(data?.data);
          });
      }, [id]);

    return (
        <section>
            <HeaderBg content={"Category Name"}/>
            <div className="container">
        <div className="row mt-3 gy-4">
          {posts.map(post => (
            <SinglePostCard key={post._id} post={post}></SinglePostCard>
          ))}
        </div>
      </div>
        </section>
    );
};

export default CategoryTemplate;