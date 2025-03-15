import { useEffect } from "react"
import ProjectCard from "./Components/ProjectCard";
import "./App.css"

function App() {
  const professions = [
    "Software engineer",
    "Frontend developer",
    "Backend developer",
    "Mobile app developer",
  ]

  function changeProfession() {
    const profession = document.getElementById("header-profession") as HTMLHeadingElement;
    let professionNum = 0;
    let professionText = professions[professionNum];
    let letNum = 0;
    let goForwards = true;
    let timeout = false;


    setInterval(() => {
      if (!goForwards) return;
      timeout = false;
      profession.innerText = "";
      professionText = professions[professionNum];
      if (letNum < professionText.length) {
        profession.innerText += professionText.substring(0, letNum);
        letNum++;
      } else {
        profession.innerText = professionText;
        setTimeout(() => {
          goForwards = false;
        }, 3000)
      }
    }, 1000/professionText.length)

    setInterval(() => {
      if (goForwards) return;
      profession.innerText = "";
      if (letNum > 0) {
          profession.innerText = professionText.substring(0, letNum);
          letNum--;
      } else {
        if (!timeout)
          professionNum++;
        timeout = true;
        goForwards = true;
        if (professionNum >= professions.length) {
          professionNum = 0;
        }
      }
    }, 1000/professionText.length)
  }

  useEffect(() => {
    changeProfession();
    document.getElementById('projects-header')?.scrollIntoView({behavior: 'smooth'});
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <div className="headertext-container">
          <h1 className="big-header">Jannes Borger</h1>
          <h2 className="regular-header" id="header-profession"></h2>
        </div>
      </header>
      <main>
        <article className="about-me-container">
          <h2 className="regular-header about-me-header" id="about-me-header">About me (Test Data)</h2>
          <div className="about-me-text-container">
            <h3 className="about-me-text-header small-header" id="my-info">Me</h3>
            <p className="about-me-text regular-text">
              I am an avid learner and enjoy keeping up with the latest trends in technology.<br />
              In my free time, I like to contribute to open-source projects and write technical blogs.<br />
              I also enjoy mentoring junior developers and sharing my knowledge with the community.<br />
              When I am not coding, I love to travel, read books, and play video games.<br />
              I believe in continuous improvement and strive to be a better version of myself every day.<br />
            </p>
          </div>

          <div className="about-me-text-container">
            <h3 className="about-me-text-header small-header" id="experience-info">Experience</h3>
            <p className="about-me-text regular-text">
              I have been working as a software engineer for over 5 years.<br />
              I have experience with a wide range of technologies and programming languages.<br />
              I have worked on a variety of projects, from small websites to large web applications.<br />
              I am always looking for new challenges and opportunities to learn new things.<br />
              I am passionate about creating clean and maintainable code and I love to work in a team.<br />
              I am always looking for new ways to improve my skills and I am not afraid to take on new challenges.<br />
            </p>
          </div>

          <div className="about-me-text-container">
            <h3 className="about-me-text-header small-header" id="hobbies-info">Hobbies</h3>
            <p className="about-me-text regular-text">
              I am a software engineer who loves to create web applications.<br />
              I am currently working as a frontend developer at a company in the Netherlands.<br />
              My main focus is on creating user-friendly and accessible web applications.<br />
              I am always looking for new challenges and opportunities to learn new things.<br />
              I am passionate about creating clean and maintainable code and I love to work in a team.<br />
              I am always looking for new ways to improve my skills and I am not afraid to take on new challenges.<br />
            </p>
          </div>

        </article>
        <section id="projects-wrapper">
          <h2 className="regular-header" id="projects-header">Projects</h2>
          <div className="projects-container">
            <ProjectCard url="https://portfolio-synkrotics-projects.vercel.app/" />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
