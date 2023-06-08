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
  //handle image upload
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setDone(false);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "csyt0qle");
    data.append("cloud_name", "dmyyyzg6r");
    fetch("https://api.cloudinary.com/v1_1/dmyyyzg6r/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.secure_url) {
          /////////////////////////////////////
          ////////////////////////////////////////
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

          const blogData = {
            title: title,
            description: description,
            category: category,
            image_url: data?.secure_url,
          };
          console.log(blogData);
          //api call with token
          const token = localStorage.getItem("token");
          fetch(`${url}/api/blog/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${token}`,
            },
            body: JSON.stringify(blogData),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data?.status === "success") {
                notification("Blog created successfully", "success");
                setTriggerPost(!triggerPost);

                setTitle("");
                setDescription("");
                setCategory("");
                setFile(null);

                setDone(true);
              } else {
                notification("Something went wrong", "danger");
                setDone(true);
              }
            })
            .catch((err) => {
              console.log(err);
              notification("Something went wrong", "danger");
              setDone(true);
            });
          ////////////////////////////////////////
          ////////////////////////////////////////
        } else {
          setDone(true);
          return notification("Something went wrong", "danger");
        }
      })
      .catch((err) => {
        setDone(true);
        return notification("Something went wrong", "danger");
      });
  };

  //handle form submit for multipart form data

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
                  name="file"
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
