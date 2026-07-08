import { useAuth } from "../context/AuthContext";
import { useNotices } from "../hooks/useNotices";
import { useRealtimeNotices } from "../hooks/useRealtimeNotices";

import Navbar from "../components/Navbar";
import NoticeForm from "../components/NoticeForm";
import NoticeCard from "../components/NoticeCard";

export default function Dashboard() {
  const { user } = useAuth();

  const {
    notices,
    setNotices,
    loading,
    addNotice,
    deleteNotice,
  } = useNotices();

  useRealtimeNotices(setNotices);

  const handleDelete = async (id) => {
    await deleteNotice(id);
  };

  const userName =
    user?.email?.split("@")[0] || "User";

  return (
    <>
      <Navbar />

      <main className="page-container">

        <section className="dashboard-header">

          <div>

            <p className="dashboard-greeting">
              Welcome back,
            </p>

            <h1>
              {userName}
            </h1>

            <span className="dashboard-subtitle">
              Manage and share campus notices with your community.
            </span>

          </div>

        </section>

        <section className="dashboard-content">

          <div className="form-section">

            <div className="section-heading">
              <h2>Create Notice</h2>
              <p>
                Publish announcements for everyone on campus.
              </p>
            </div>

            <NoticeForm
              onAdd={addNotice}
              userId={user.id}
            />

          </div>

          <div className="notice-section">

            <div className="section-heading">

              <h2>Recent Notices</h2>

              {!loading && (
                <span className="notice-count">
                  {notices.length} Notice{notices.length !== 1 ? "s" : ""}
                </span>
              )}

            </div>

            {loading ? (
              <div className="empty-state">
                Loading notices...
              </div>
            ) : notices.length === 0 ? (
              <div className="empty-state">
                No notices available.
              </div>
            ) : (
              <div className="notice-list">
                {notices.map((notice) => (
                  <NoticeCard
                    key={notice.id}
                    notice={notice}
                    currentUserId={user.id}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}

          </div>

        </section>

      </main>
    </>
  );
}