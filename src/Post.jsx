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

    return (
        <>
            <h2>{title}</h2>
            <p>{`(published on ${formatDate(updatedAt)})`}</p>
            <p>{text}</p>
            <h3>Comments</h3>
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