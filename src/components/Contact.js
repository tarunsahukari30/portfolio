import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Use Netlify redirect in production, fallback to localhost in dev
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8888/.netlify/functions" // Netlify dev server
      : ""; // in production, use relative path

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert(data.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("❌ Network/Fetch Error:", error);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact">
      <div className="contact-container">
        <div className="contact-form-wrapper">
          <div className="contact-header">
            <p className="contact-subtitle">Get in Touch</p>
            <h1 className="contact-title">Contact Me</h1>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="subject"
                className="form-input"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                className="form-textarea"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className="submit-button-wrapper">
              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
