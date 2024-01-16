import { useState } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from "luxon";
import Comment from './Comment';

function Post({ postId, title, text, updatedAt, comments }) {

    const [updatedComments, setUpdatedComments] = useState(comments);

    const [newComment, setNewComment] = useState({
        title: '',
        text: '',
        authorName: '',
        authorEmail: '',
        post: postId,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewComment((prevProps) => ({
            ...prevProps,
            [name] : value
        }));
    };

    const postNewComment = () => {
        fetch('http://localhost:3000/api/comment/create', {
            method: "POST", 
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        }).then((res) => {
            return res.json();
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postNewComment();
        setUpdatedComments([...updatedComments, newComment]);
    };

    function formatDate(date) {
        if (typeof date === "string") {
            return DateTime.fromISO(updatedAt.slice(0,10)).toLocaleString(DateTime.DATE_FULL);
        } else {
            return "no date provided"
        }    
    }

    return (
        <div className='development-border'>
            <h2>{title}</h2>
            <p>{`(published on ${formatDate(updatedAt)})`}</p>
            <p>{text}</p>
            
            <h3>Comments</h3>
            <div className='comments-section'>
                {updatedComments.map((comment) =>
                    <Comment
                        key={comment._id}
                        title={comment.title}
                        text={comment.text}
                        authorName={comment.authorName} 
                        updatedAt={comment.updatedAt}
                    />
                )}
            </div>

            <form onSubmit={handleSubmit} className='development-border'>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" id="title" onChange={handleInputChange} required />
               
                <label htmlFor="text">Text:</label>
                <textarea name="text" id="text" cols="30" rows="10" required onChange={handleInputChange}>Write your comment here!</textarea>
                
                <label htmlFor="authorName">Name:</label>
                <input type="text" name="authorName" id="authorName" required onChange={handleInputChange}/>

                <label htmlFor="authorEmail">Email:</label>
                <input type="email" name="authorEmail" id="authorEmail" required onChange={handleInputChange}/>

                <label htmlFor="postId"></label>
                <input type="hidden" name="postId" id="postId" value={postId} onChange={handleInputChange}/>

                <input type="submit" value="Submit" />
            </form>

        </div>
    )
}

Post.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    updatedAt: PropTypes.string,
    comments: PropTypes.array,
    postId: PropTypes.string,
}

export default Post;