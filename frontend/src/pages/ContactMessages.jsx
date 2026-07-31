import { useState } from "react";
import "./ContactMessages.css";

function ContactMessages() {
  const [search, setSearch] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      subject: "Blood Donation",
      message: "I want to register as a blood donor.",
      status: "Unread",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@gmail.com",
      subject: "Emergency Blood",
      message: "Need O+ blood urgently for my father.",
      status: "Read",
    },
    {
      id: 3,
      name: "Kiran",
      email: "kiran@gmail.com",
      subject: "Hospital Registration",
      message: "How can I register my hospital?",
      status: "Unread",
    },
  ]);

  const markAsRead = (id) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id
          ? { ...msg, status: "Read" }
          : msg
      )
    );
  };

  const deleteMessage = (id) => {
    if (window.confirm("Delete this message?")) {
      setMessages(messages.filter((msg) => msg.id !== id));
    }
  };

  const filteredMessages = messages.filter((msg) =>
    msg.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="contact-container">

      <div className="contact-card">

        <h1>📩 Contact Messages</h1>

        <p>
          View and manage all user contact messages.
        </p>

        <input
          type="text"
          placeholder="Search by Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredMessages.map((msg) => (

              <tr key={msg.id}>

                <td>{msg.name}</td>

                <td>{msg.email}</td>

                <td>{msg.subject}</td>

                <td>
                  <span
                    className={
                      msg.status === "Read"
                        ? "read"
                        : "unread"
                    }
                  >
                    {msg.status}
                  </span>
                </td>

                <td>

                  <button
                    className="view-btn"
                    onClick={() =>
                      alert(msg.message)
                    }
                  >
                    View
                  </button>

                  <button
                    className="read-btn"
                    onClick={() =>
                      markAsRead(msg.id)
                    }
                  >
                    Mark Read
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteMessage(msg.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="footer">
          Total Messages : {filteredMessages.length}
        </div>

      </div>

    </div>
  );
}

export default ContactMessages;