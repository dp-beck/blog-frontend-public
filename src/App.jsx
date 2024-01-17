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
      <header>
        <h1>{`Dan's Blog`} </h1>
      </header>

      <div id="posts">
        {posts.map((post) => 
        <Post 
          key={post._id} 
          postId = {post._id}
          title={post.title}
          text={post.text}
          updatedAt={post.updatedAt}
          comments={getPostComments(fetchedComments, post)}
          />)}

      </div>
        <footer>
          <a href="https://www.freepik.com/free-vector/aged-paper-texture-background-design_14765966.htm#query=faded%20paper&position=0&from_view=keyword&track=ais&uuid=87dc82a0-ecc8-4576-abcf-2a22e659938d">Background Image by boggus</a> on Freepik
        </footer>
    </>
  )
}

export default App
