import React, { useEffect, useState } from 'react';
import { getComments } from '../../services/activity';
import './CommentList.css';

interface Comment {
  _id: string;
  username: string;
  text: string;
}

interface CommentListProps {
  activityID: string;
  refresh: number;
}

const CommentList: React.FC<CommentListProps> = ({ activityID, refresh }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await getComments(activityID);
      setComments(response.comments);
      setLoading(false);
    };

    // Verificar si activityID está definido antes de realizar la operación
    if (
      activityID == undefined ||
      activityID === null ||
      activityID === 'undefined'
    ) {
    } else {
      fetchComments();
    }
  }, [activityID, refresh]);

  // Si aún estamos cargando, puedes mostrar un mensaje de carga
  if (loading) {
    return <p>Loading comments...</p>;
  }

  return (
    <div className="comment-list">
      <h2>Comments:</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id}>
            <p>
              {comment.username}: {comment.text}
            </p>
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default CommentList;
