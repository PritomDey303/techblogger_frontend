import React, { useContext, useState } from "react";
import { AllPost } from "../../../Context/PostContext";
import { Notification } from "../../../Context/ToastContext";
import { url } from "../../../Context/Url";
import ReactLoader from "../../../Shared/ReactLoader/ReactLoader";
import { techCategory } from "../../../UtilityFunction/categoryList";
import "./CreateBlog.css";
const CreateBlog = () => {
  const { triggerPost, setTriggerPost } = useContext(AllPost);
  const { notification } = useContext(Notification);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [done, setDone] = useState(true);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  //handle form submit for multipart form data
  const handleFormSubmit = (e) => {
    setDone(false);
    e.preventDefault();
    //validation
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      category.trim() === "" ||
      file === null
    ) {
      notification("Please fill all the fields", "danger");
      setDone(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    console.log(formData);
    //api call with token

    fetch(`${url}/api/blog/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          notification("Blog Created Successfully", "success");
          setTriggerPost(!triggerPost);
        } else {
          notification("Something went wrong", "danger");
        }
      })
      //clearing the form
      .then(() => {
        setTitle("");
        setDescription("");
        setCategory("");
        setFile(null);
      })

      .catch((err) => {
        console.log(err);
        notification("Something went wrong", "danger");
      });

    setDone(true);
  };

  return !done ? (
    <ReactLoader />
  ) : (
    <section className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h1 className="text-center">Create Blog</h1>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                {/* selectbox for category */}

                <select
                  className="form-select form-control"
                  aria-label="Default select example"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option defaultValue="programming">Select Category</option>$
                  {techCategory.map((category) => (
                    <option key={category.id} value={category.value}>
                      {category.value}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateBlog;
