import React, { useEffect, useState } from "react";
import { techCategory } from "../../../UtilityFunction/categoryList";
import "./CategoryArea.css";
import CategoryCard from "./CategoryCard";
const CategoryArea = () => {
  const [categories, setCategories] = useState([]);

  // categories fetching

  useEffect(() => {
    setCategories(techCategory);
  }, []);
  console.log(categories);

  return (
    <section className="my-5 ">
      <div className="container">
        <div>
          <h3>Popular Categories</h3>
          <span className="cs-divider"></span>
        </div>

        <div className="row mt-3 gy-3">
          {categories.map((category) => (
            <CategoryCard key={category?.id} category={category}></CategoryCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryArea;
