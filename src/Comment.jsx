import PropTypes from "prop-types";
import { DateTime } from "luxon";

function Comment ( { title, text, authorName, updatedAt }) {

    function formatDate(date) {
        if (typeof date === "string") {
            return DateTime.fromISO(updatedAt.slice(0,10)).toLocaleString(DateTime.DATE_FULL);
        } else {
            return "no date provided"
        }    
    }

    return (
        <>
            <h4>{title}</h4>
            <p>{text}</p>
            <p>{authorName}</p>
            <p>{`published on ${formatDate(updatedAt)}`}</p>
        </>
    )
}

Comment.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    authorName: PropTypes.string,
    updatedAt: PropTypes.string
}

export default Comment;