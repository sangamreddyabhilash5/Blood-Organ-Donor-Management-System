import { useState } from "react";
import "./FAQ.css";

function FAQ() {
  const faqs = [
    {
      id: 1,
      question: "Who can donate blood?",
      answer:
        "Healthy individuals who meet the minimum age, weight, and health requirements can donate blood. Eligibility may vary according to medical guidelines.",
    },
    {
      id: 2,
      question: "How often can I donate blood?",
      answer:
        "In general, whole blood donors can donate every 3 months, depending on local medical regulations and their health condition.",
    },
    {
      id: 3,
      question: "How can I search for blood donors?",
      answer:
        "Go to the Search Donors page and search using blood group, city, or donor name.",
    },
    {
      id: 4,
      question: "How do I update my availability?",
      answer:
        "Open the Availability page and change your current status to Available or Not Available.",
    },
    {
      id: 5,
      question: "How are emergency requests handled?",
      answer:
        "Hospitals and patients can create emergency requests, and available donors receive notifications immediately.",
    },
    {
      id: 6,
      question: "Is my personal information secure?",
      answer:
        "Yes. Your personal information is protected using secure authentication and only authorised users can access it.",
    },
    {
      id: 7,
      question: "Can hospitals register on this platform?",
      answer:
        "Yes. Hospitals can create an account, manage blood requests, and search for suitable donors.",
    },
    {
      id: 8,
      question: "How can I contact support?",
      answer:
        "Visit the Contact Us page and submit your enquiry. Our support team will respond as soon as possible.",
    },
  ];

  const [activeId, setActiveId] = useState(null);

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="faq-container">

      <div className="faq-card">

        <h1>❓ Frequently Asked Questions</h1>

        <p className="faq-description">
          Find answers to the most common questions about blood donation,
          emergency requests, donor registration, and the Blood & Organ
          Donor Management System.
        </p>

        <div className="faq-list">

          {faqs.map((faq) => (

            <div
              className="faq-item"
              key={faq.id}
            >

              <button
                className="faq-question"
                onClick={() => toggleFAQ(faq.id)}
              >

                <span>{faq.question}</span>

                <span>
                  {activeId === faq.id ? "−" : "+"}
                </span>

              </button>

              {activeId === faq.id && (

                <div className="faq-answer">

                  <p>{faq.answer}</p>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default FAQ;