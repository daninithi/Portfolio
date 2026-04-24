import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Hero() {
  const email = import.meta.env.VITE_EMAIL;
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL;
  const githubUrl = import.meta.env.VITE_GITHUB_URL;

  return (
    <>
      <div 
        className="content" 
        data-aos="fade-zoom-in" 
        data-aos-easing="ease-in-back" 
        data-aos-delay="300" 
        data-aos-offset="0" 
        data-aos-duration="1500"
      >
        <div className="tag-box">
          <div className="tag">Backend Developer | DevOps Enthusiast</div>
        </div>
        <h1 className="title">Hi, I'm Danijella</h1>
        <p className="description">I am a Backend Developer with a strong interest in DevOps and cloud technologies. 
        I enjoy building scalable backend systems and deploying them using modern tools like Docker, Kubernetes, and CI/CD pipelines. 
        I focus on writing clean, efficient code and designing systems that are reliable, observable, and production-ready.
        </p>
        <div className="buttons">
            <button 
              className="link-btn"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/Danijella_Nithilanayagam.pdf';
                link.download = 'Danijella_Nithilanayagam.pdf';
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
      
      <spline-viewer 
        data-aos="fade-zoom-in" 
        data-aos-easing="ease-in-back" 
        data-aos-delay="300" 
        data-aos-offset="0" 
        data-aos-duration="1500" 
        className="robot" 
        url="https://prod.spline.design/L4VXUz58AsR0iBnp/scene.splinecode"
      ></spline-viewer>
    </>
  )
}

export default Hero
