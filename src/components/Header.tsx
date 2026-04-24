
import { useState } from "react";
import emailjs from "@emailjs/browser";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [messageStatus, setMessageStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessageStatus(null);

    try {
      // Initialize EmailJS with public key from environment
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          message: formData.message,
          to_email: import.meta.env.VITE_EMAILJS_RECEIVE_EMAIL,
          subject: `New message from ${formData.from_name}`,
        }
      );

      if (response.status === 200) {
        setMessageStatus({
          type: "success",
          text: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ from_name: "", from_email: "", message: "" });
        setTimeout(() => {
          setIsModalOpen(false);
          setMessageStatus(null);
        }, 2000);
      }
    } catch (error) {
      setMessageStatus({
        type: "error",
        text: "Failed to send message. Please try again.",
      });
      console.error("Email error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header>
        <div></div>
        <button
          className="btn"
          data-aos="fade-down"
          data-aos-duration="2000"
          onClick={() => setIsModalOpen(true)}
        >
          Contact
        </button>
      </header>

      <div
        className={`modal-overlay ${isModalOpen ? "active" : ""}`}
        onClick={() => setIsModalOpen(false)}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Get in Touch</h2>
            <button
              className="close-btn"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSendEmail}>
            {messageStatus && (
              <div className={`form-message ${messageStatus.type}`}>
                {messageStatus.text}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="from_name">Name</label>
              <input
                type="text"
                id="from_name"
                name="from_name"
                value={formData.from_name}
                onChange={handleInputChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="from_email">Email</label>
              <input
                type="email"
                id="from_email"
                name="from_email"
                value={formData.from_email}
                onChange={handleInputChange}
                placeholder="Your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message..."
                required
              ></textarea>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="send-btn"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Header;
