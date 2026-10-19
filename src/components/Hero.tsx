import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import profileImg from "../assets/profile.png";

function Hero() {
  // Falls back to the address the contact form sends to
  const email = import.meta.env.VITE_EMAIL || import.meta.env.VITE_EMAILJS_RECEIVE_EMAIL;
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL;
  const githubUrl = import.meta.env.VITE_GITHUB_URL;

  return (
    <div className="hero-inner">
      <div 
        className="content" 
        data-aos="fade-zoom-in" 
        data-aos-easing="ease-in-back" 
        data-aos-delay="300" 
        data-aos-offset="0" 
        data-aos-duration="1500"
      >
        <div className="tag-box">
          <div className="tag">Software Engineer | Backend &amp; Cloud</div>
        </div>
        <h1 className="title">Hi, I'm Danijella</h1>
        <p className="description">
          Associate Software Engineer at Protonest IoT and Computer Science graduate from the
          University of Colombo School of Computing. I build backend services and REST APIs with
          Spring Boot and microservices, and ship them to AWS using Docker and CI/CD pipelines.
        </p>
        <div className="buttons">
            <button 
              className="link-btn"
              onClick={() => {
                const link = document.createElement('a');
                // file in public/, inside the site folder (BASE_URL = "/Portfolio/")
                link.href = `${import.meta.env.BASE_URL}Danijella_Nithilanayagam_SE.pdf`;
                link.download = 'Danijella_Nithilanayagam_Resume.pdf'; // name it's saved as
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download resume
            </button>
            <button 
              className="link-btn"
              onClick={() => window.open(linkedinUrl, '_blank')}
            >
                <FaLinkedin size={20} />
            </button>
             <button 
               className="link-btn"
               onClick={() => window.location.href = `mailto:${email}`}
             >
                <MdEmail size={20} />
            </button>

            <button 
              className="link-btn"
              onClick={() => window.open(githubUrl, '_blank')}
            >
                <FaGithub size={20} />
            </button>
        </div>
      </div>
      
      {/* Profile photo (background removed, head and shoulders) with a soft purple glow behind it */}
      <div className="hero-photo" data-aos="fade-up" data-aos-delay="300" data-aos-offset="0" data-aos-duration="1500">
        <div className="hero-photo-glow" aria-hidden="true" />
        <img src={profileImg} alt="Danijella Nithilanayagam" />
      </div>
    </div>
  )
}

export default Hero
