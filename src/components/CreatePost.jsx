import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

const CreatePost = ({ isAuth }) => {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postCollectionRef = collection(db, "posts");
  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title,
      postText,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  } );
  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label>Title :</label>
          <input
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="inputGp">
          <label>Post :</label>
          <textarea
            placeholder="Post..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
