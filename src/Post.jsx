import { useState } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from "luxon";
import Comment from './Comment';

function Post({ postId, title, text, updatedAt, comments }) {

    const [newComment, setNewComment] = useState({
        title: '',
        text: '',
        authorName: '',
        authorEmail: '',
        post: postId,
    });

    const [newComments, setNewComments] = useState([]);

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
        setNewComments([...newComments, newComment]);
    };

    function formatDate(date) {
        if (typeof date === "string") {
            return DateTime.fromISO(updatedAt.slice(0,10)).toLocaleString(DateTime.DATE_FULL);
        } else {
            return "no date provided"
        }    
    }

    return (
        <div className="singlePost">
            <div>
                <h2 className='postTitle'>{title}  </h2>
                <p className='publishedDate'>{`(published on ${formatDate(updatedAt)})`}</p>
            </div>
            <p>{text}</p>
            
            <h3>Comments</h3>
            <div className='comments-section'>
                {comments.map((comment) =>
                    <Comment
                        key={comment._id}
                        title={comment.title}
                        text={comment.text}
                        authorName={comment.authorName} 
                        updatedAt={comment.updatedAt}
                    />
                )}
                {newComments.map((comment) =>
                    <Comment
                        key={comment._id}
                        title={comment.title}
                        text={comment.text}
                        authorName={comment.authorName} 
                        updatedAt={comment.updatedAt}
                    />
                )}
            </div>

            <form onSubmit={handleSubmit} className='commentsForm'>

                <div className='formTitleInput'>
                    <label htmlFor="title">Title:</label> <br />
                    <input type="text" name="title" id="title" onChange={handleInputChange} required />
                </div>
               
                <div className='formTextInput'>
                    <label htmlFor="text">Comment:</label> <br />
                    <textarea name="text" id="text" cols="50" rows="10" required onChange={handleInputChange}>Write your comment here!</textarea>
                </div>

                <div className='formAuthorNameInput'>
                    <label htmlFor="authorName">Name:</label> <br />
                    <input type="text" name="authorName" id="authorName" required onChange={handleInputChange}/>
                </div>

                <div className='formAuthorEmailInput'>    
                    <label htmlFor="authorEmail">Email:</label> <br />
                    <input type="email" name="authorEmail" id="authorEmail" required onChange={handleInputChange}/>
                </div>

                <div>
                    <input type="submit" value="Submit" />
                </div>
                
                <label htmlFor="postId"></label>
                <input type="hidden" name="postId" id="postId" value={postId} onChange={handleInputChange}/>

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