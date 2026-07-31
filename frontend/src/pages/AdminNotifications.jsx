import { useState } from "react";
import "./AdminNotifications.css";

function AdminNotifications() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Blood Donation Camp",
      message: "Blood donation camp on Sunday at Apollo Hospital.",
      date: "28 July 2026",
    },
    {
      id: 2,
      title: "Emergency Alert",
      message: "O- Blood urgently required in Visakhapatnam.",
      date: "27 July 2026",
    },
  ]);

  const addNotification = () => {
    if (!title || !message) {
      alert("Please fill all fields");
      return;
    }

    const newNotification = {
      id: Date.now(),
      title,
      message,
      date: new Date().toLocaleDateString(),
    };

    setNotifications([newNotification, ...notifications]);
    setTitle("");
    setMessage("");
  };

  const deleteNotification = (id) => {
    if (window.confirm("Delete this notification?")) {
      setNotifications(
        notifications.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <div className="notification-container">

      <div className="notification-card">

        <h1>🔔 Admin Notifications</h1>

        <p>Create and manage notifications.</p>

        <div className="notification-form">

          <input
            type="text"
            placeholder="Notification Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            rows="4"
            placeholder="Notification Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={addNotification}>
            Publish Notification
          </button>

        </div>

        <h2>Notification History</h2>

        {notifications.map((item) => (

          <div className="notification-box" key={item.id}>

            <h3>{item.title}</h3>

            <p>{item.message}</p>

            <span>{item.date}</span>

            <button
              className="delete-btn"
              onClick={() => deleteNotification(item.id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminNotifications;