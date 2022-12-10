import React, { useContext } from 'react';
import { AllPost } from '../../../Context/PostContext';
import SinglePostCard from '../../../Shared/SinglePostCard/SinglePostCard';

const LatestPost = () => {

    const {posts} = useContext(AllPost)

    //limit post 
    const allPosts = posts.slice(0 , 6)
    // console.log(limitPost);

    return (
        <section className='my-5 '>
        <div className="container">
        <div>
            <h3>Latest Post</h3>
             <span className='cs-divider'></span>
        </div>

        <div className='row mt-3 gy-4'>

            {
                allPosts.map(post => <SinglePostCard key={post._id} post={post}></SinglePostCard>)
            }

        </div>
        </div>
    </section>
    );
};

export default LatestPost;