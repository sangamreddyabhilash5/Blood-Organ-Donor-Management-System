import "./Notifications.css";

function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Emergency Blood Request",
      message: "O+ Blood is urgently needed at Apollo Hospital.",
      time: "10 minutes ago",
      type: "emergency",
    },
    {
      id: 2,
      title: "Donation Successful",
      message: "Thank you for donating blood. Your contribution can save lives.",
      time: "2 days ago",
      type: "success",
    },
    {
      id: 3,
      title: "Availability Reminder",
      message: "Please update your donor availability status.",
      time: "1 week ago",
      type: "reminder",
    },
    {
      id: 4,
      title: "Blood Request",
      message: "A+ Blood is required at KGH Hospital.",
      time: "Today",
      type: "request",
    },
  ];

  return (
    <div className="notification-container">

      <div className="notification-card">

        <h1>🔔 Notifications</h1>

        <p>
          Stay updated with emergency blood requests and donor activities.
        </p>

        <div className="notification-list">

          {notifications.map((item) => (

            <div
              key={item.id}
              className={`notification-item ${item.type}`}
            >

              <h3>{item.title}</h3>

              <p>{item.message}</p>

              <span>{item.time}</span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Notifications;