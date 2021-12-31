import React, { useEffect, useState } from "react";
import { collection,  getDocs , deleteDoc , doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "../App.css"

function Home({isAuth}) {
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(postCollectionRef);
      setPostList(data?.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  } );

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };
  return (
    <div className="homePage">
      {postList.map((post) => (
        <div className="post">
          <div className="postHeader">
            <div className="title">
              <h1>{post.title}</h1>
            </div>
            
            <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                  Delete
                  </button>
                )}
              </div>
          </div>
          <div className="postTextContainer">{post.postText}</div>
          {/* <h3>@ {post.author.name}</h3> */}
        </div>
      ))}
    </div>
  );
}

export default Home;
