import { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/posts')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/comments')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setComments(data);
      });
  }, []);
     
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
        comments={comments}
        />)}
    </>
  )
}

export default App
