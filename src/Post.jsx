import PropTypes from 'prop-types';
import { DateTime } from "luxon";
import Comment from './Comment';

function Post({ postId, title, text, updatedAt, comments }) {

    function formatDate(date) {
        if (typeof date === "string") {
            return DateTime.fromISO(updatedAt.slice(0,10)).toLocaleString(DateTime.DATE_FULL);
        } else {
            return "no date provided"
        }    
    }

    function getPostComments(comments) {
        return comments.filter((comment) => comment.post[0] === postId)
    }

    return (
        <>
            <h2>{title}</h2>
            <p>{`(published on ${formatDate(updatedAt)})`}</p>
            <p>{text}</p>
            <h3>Comments</h3>
            {getPostComments(comments).map((comment) =>
                <Comment
                    key={comment._id}
                    title={comment.title}
                    text={comment.text}
                    authorName={comment.authorName} 
                    updatedAt={comment.updatedAt}
                />
            )}
        </>
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