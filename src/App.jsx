import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);

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
     
  return (
    <>
      <h1>{`Dan's Blog`} </h1>
      {posts.map((post) => 
      <div key={post._id}>{post.title}</div>)}
    </>
  )
}

export default App
