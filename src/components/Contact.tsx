import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaPaperPlane } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./Contact.css";

// Last section: the 3D robot on the left, contact form on the right.
// The form sends through EmailJS using the same .env keys as before.
function Contact() {
  // Falls back to the address the contact form sends to
  const email = import.meta.env.VITE_EMAIL || import.meta.env.VITE_EMAILJS_RECEIVE_EMAIL;
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL;
  const githubUrl = import.meta.env.VITE_GITHUB_URL;

  const [formData, setFormData] = useState({ from_name: "", from_email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [messageStatus, setMessageStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Only load the 3D robot once the section is close to the screen,
  // so the page doesn't load two 3D scenes when it first opens.
  const robotRef = useRef<HTMLDivElement>(null);
  const [showRobot, setShowRobot] = useState(false);
  useEffect(() => {
    const el = robotRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowRobot(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        setMessageStatus({ type: "success", text: "Message sent successfully! I'll get back to you soon." });
        setFormData({ from_name: "", from_email: "", message: "" });
        setTimeout(() => setMessageStatus(null), 5000);
      }
    } catch (error) {
      setMessageStatus({ type: "error", text: "Failed to send message. Please try again." });
      console.error("Email error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="page-section">
      <div className="section-heading" data-aos="fade-up" data-aos-duration="1000">
        <span className="section-eyebrow">Contact</span>
        <h2>
          Let's <span>Talk</span>
        </h2>
        <p>Have a role, a project or a question? Send me a message and I'll reply soon.</p>
      </div>

      <div className="contact-grid">
        {/* ---------- 3D robot (same scene as the hero) ---------- */}
        <div className="contact-robot" ref={robotRef} data-aos="fade-right" data-aos-duration="900">
          {showRobot && <spline-viewer url="https://prod.spline.design/L4VXUz58AsR0iBnp/scene.splinecode"></spline-viewer>}
        </div>

        {/* ---------- Form ---------- */}
        <div className="contact-card" data-aos="fade-left" data-aos-duration="900">
          <form onSubmit={handleSendEmail} className="contact-form">
            {messageStatus && (
              <div className={`form-message ${messageStatus.type}`} role="status">
                {messageStatus.text}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="from_name">Name</label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  autoComplete="name"
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
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
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

            <button type="submit" className="send-btn" disabled={loading}>
              {loading ? (
                "Sending..."
              ) : (
                <>
                  Send message <FaPaperPlane aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          {/* Direct links, for people who'd rather not use the form */}
          <div className="contact-links">
            <span>Or reach me directly</span>
            <div>
              {email && (
                <a href={`mailto:${email}`} aria-label="Email">
                  <MdEmail />
                </a>
              )}
              {linkedinUrl && (
                <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
              )}
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FaGithub />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
