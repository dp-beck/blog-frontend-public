/*
run useffect to get comments and put in state variable;
but make it dependent on different state variable...
*/

import { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';

function App() {
  const [posts, setPosts] = useState([]);
  const [fetchedComments, setFetchedComments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/posts')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPosts(data);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/comments')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFetchedComments(data);
      });
  }, []);
  
  function getPostComments(comments, post) {
    return comments.filter((comment) => comment.post[0] === post._id)
  }

  return (
    <>
      <h1>{`Dan's Blog`} </h1>
      {posts.map((post) => 
      <Post 
        key={post._id} 
        postId = {post._id}
        title={post.title}
        text={post.text}
        updatedAt={post.updatedAt}
        comments={getPostComments(fetchedComments, post)}
        />)}
    </>
  )
}

export default App
