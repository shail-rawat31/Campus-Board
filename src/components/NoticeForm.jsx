import { useState } from "react";

export default function NoticeForm({ onAdd, userId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    setSubmitting(true);

    const { error } = await onAdd(title, content, userId);

    if (!error) {
      setTitle("");
      setContent("");
    }

    setSubmitting(false);
  };

  return (
    <form className="notice-form" onSubmit={handleSubmit}>

      <div className="form-group">
        <label>Notice Title</label>

        <input
          type="text"
          placeholder="Enter a short and clear title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>

        <textarea
          placeholder="Write your notice here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
        />
      </div>

      <div className="notice-form-footer">

        <button
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Publishing..." : "Publish Notice"}
        </button>

      </div>

    </form>
  );
}