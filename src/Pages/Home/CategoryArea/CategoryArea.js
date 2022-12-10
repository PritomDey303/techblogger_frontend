import React, { useEffect, useState } from 'react';
import './CategoryArea.css'
import CategoryCard from './CategoryCard';
const CategoryArea = () => {

    const [categories , setCategories] = useState([])


    // categories fetching 

    useEffect(()=>{
        fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => setCategories(data.data.news_category))
    } , [])



    return (
        <section className='my-5 '>
            <div className="container">
            <div>
                <h3>Popular Categories</h3>
                 <span className='cs-divider'></span>
            </div>

            <div className='row mt-3 gy-3'>


                {
                    categories.map(category => <CategoryCard key={category?.category_id} category={category}></CategoryCard>)
                }

            </div>
            </div>
        </section>
    );
};

export default CategoryArea;