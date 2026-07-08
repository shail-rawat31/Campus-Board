import { formatDate } from "../utils/formatDate";

export default function NoticeCard({
  notice,
  currentUserId,
  onDelete,
}) {
  const isOwner = notice.user_id === currentUserId;

  return (
    <article className="notice-card">

      <div className="notice-header">

        <div className="notice-pin"></div>

        <div className="notice-title-wrapper">
          <h3>{notice.title}</h3>

          <small className="notice-date">
            {formatDate(notice.created_at)}
          </small>
        </div>

      </div>

      {notice.content && (
        <p className="notice-content">
          {notice.content}
        </p>
      )}

      <div className="notice-footer">

        <span className="notice-label">
          Campus Notice
        </span>

        {isOwner && (
          <button
            className="link-button"
            onClick={() => onDelete(notice.id)}
          >
            Delete
          </button>
        )}

      </div>

    </article>
  );
}