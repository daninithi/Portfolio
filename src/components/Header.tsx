import { useEffect, useState } from "react";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  // Switch the header to its "glass" look once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <nav>
        <a href="#" data-aos="fade-down" data-aos-duration="1500">ABOUT</a>
        <a href="#skills" data-aos="fade-down" data-aos-duration="1800">SKILLS</a>
        <a href="#experience" data-aos="fade-down" data-aos-duration="2100">EXPERIENCE</a>
        <a href="#projects" data-aos="fade-down" data-aos-duration="2400">PROJECTS</a>
        <a href="#contact" data-aos="fade-down" data-aos-duration="2700">CONTACT</a>
      </nav>
    </header>
  );
}

export default Header;
