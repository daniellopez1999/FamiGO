import React, { ChangeEvent, useState } from 'react';
import { publishComment } from '../../services/activity';

interface CommentProps {
  myUsername?: string;
  activityID?: string;
}

const Comment: React.FC<CommentProps> = ({ myUsername, activityID }) => {
  const [commentText, setCommentText] = useState('');

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setCommentText(newText);
  };

  const submitComment = async () => {
    publishComment(myUsername!, activityID!, commentText);
  };

  return (
    <>
      <textarea
        name="textarea"
        rows={10}
        cols={50}
        value={commentText}
        onChange={handleTextareaChange}
        placeholder="COMENTA AQUI POR FAVOOOR"
      />
      <button onClick={() => submitComment()}>Send</button>
    </>
  );
};

export default Comment;
