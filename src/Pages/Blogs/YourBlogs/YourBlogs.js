import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AllPost } from "../../../Context/PostContext";
import { Notification } from "../../../Context/ToastContext";
import { url } from "../../../Context/Url";
import ReactLoader from "../../../Shared/ReactLoader/ReactLoader";

const YourBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { triggerPost, setTriggerPost } = useContext(AllPost);
  const { notification } = useContext(Notification);
  const [done, setDone] = useState(false);
  const [trigger, setTrigger] = useState(false);
  //blogs of logged in user
  useEffect(() => {
    setDone(false);
    //api call to get all blogs of logged in user

    fetch(`${url}/api/blog/user/data`, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.status === "success") {
          setBlogs(data.data);
          setDone(true);
        }
        if (data?.status === "error") {
          notification(data?.message, "danger");
          setDone(true);
        }
        setDone(true);
      });
  }, [trigger]);

  //delete blog
  const deleteBlog = (id) => {
    setDone(false);
    fetch(`${url}/api/blog/delete/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.status === "success") {
          notification(data?.message, "success");
          setDone(true);
          setTriggerPost(!triggerPost);
          setTrigger(!trigger);
        }
        if (data?.status === "error") {
          notification(data?.message, "danger");
          setDone(true);
        }
      });
  };
  return !done ? (
    <ReactLoader />
  ) : (
    <section className="mt-3" style={{ minHeight: "80vh" }}>
      <Container>
        <div className="row">
          <div className="col-md-12 mx-auto">
            <h1 className="text-center mb-3">Your Blogs</h1>

            {/* table for blogs  */}
            <table className="table table-hover w-100">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Title</th>
                  <th>Category</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs?.map((blog, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>

                      <td style={{ width: "40%" }}>{blog?.title}</td>

                      <td>{blog?.category}</td>

                      <td>
                        <button className="btn btn-primary btn-sm">
                          <Link
                            to={`/blogs/${blog?._id}`}
                            className="text-light"
                          >
                            View
                          </Link>
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteBlog(blog?._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default YourBlogs;
