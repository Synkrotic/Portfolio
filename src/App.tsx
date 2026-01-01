import { useEffect, useRef, useState } from "react"
import ProjectCard from "./Components/ProjectCard";
import "./App.css"
import AboutMeTopic from "./Components/AboutMeTopic";
import NavBar from "./Components/NavBar";

function App() {
  const professions = [
    "Software",
    "Frontend",
    "Android",
    "Kotlin",
    "Java"
  ]

  const navbar = useRef<NavBar>(null);
  const [snapPositions, setSnapPositions] = useState<{ x: number, y: number }[]>();

  function changeProfession() {
    const profession = document.getElementById("header-profession") as HTMLHeadingElement;
    let professionNum = 0;
    let professionText = professions[professionNum];
    let letNum = 0;
    let goForwards = true;
    let isWaiting = false;

    const interval = setInterval(() => {
      professionText = professions[professionNum];
      
      if (goForwards) {
        if (letNum <= professionText.length) {
          profession.innerText = professionText.substring(0, letNum);
          letNum++;
        } else if (!isWaiting) {
          isWaiting = true;
          setTimeout(() => {
            goForwards = false;
            isWaiting = false;
          }, 3000);
        }
      } else {
        if (letNum > 0) {
          letNum--;
          profession.innerText = professionText.substring(0, letNum);
        } else {
          professionNum++;
          if (professionNum >= professions.length) {
            professionNum = 0;
          }
          goForwards = true;
        }
      }
    }, 100);

    interval.toString
  }

  function getSnapPoints(location?: { x: number, y: number }): HTMLCollectionOf<Element> | Element | null {
    let snapPoints = document.getElementsByClassName("navbar-snappoint");
    if (location) {
      for (const snapPoint of snapPoints) {
        if (snapPoint.classList.contains(`${location.x}${location.y}`)) {
          return snapPoint;
        }
      }
      return null;
    }
    return snapPoints;
  }

  useEffect(() => {
    if (navbar.current) {
      navbar.current.selectItem(0)
      navbar.current.snapPositionManager.refresh();
      setSnapPositions(navbar.current.snapPositionManager.getHorizontal());
    }
    changeProfession();
  }, [])

  return (
    <>
      <div className="app">
        <header className="app-header">
          <div className="headertext-container">
            <h1 className="big-header header">Jannes Borger</h1>
            <div className="row-center">
              <h2 className="regular-header header" id="header-profession"></h2>
              <h2 className="regular-header header">Developer</h2>
            </div>
          </div>
        </header>
        <main>
          <article className="about-me-container">
            <h2 className="regular-header about-me-header" id='about-me-header'>About me (Test Data)</h2>

            <AboutMeTopic topic="me" >
              I am an avid learner and enjoy keeping up with the latest trends in technology.
              In my free time, I like to contribute to open-source projects and write technical blogs.
              I also enjoy mentoring junior developers and sharing my knowledge with the community.
              When I am not coding, I love to travel, read books, and play video games.
              I believe in continuous improvement and strive to be a better version of myself every day.
            </AboutMeTopic>

            <AboutMeTopic topic="experience" >
              I have been working as a software engineer for over 5 years.
              I have experience with a wide range of technologies and programming languages.
              I have worked on a variety of projects, from small websites to large web applications.
              I am always looking for new challenges and opportunities to learn new things.
              I am passionate about creating clean and maintainable code and I love to work in a team.
              I am always looking for new ways to improve my skills and I am not afraid to take on new challenges.
            </AboutMeTopic>

            <AboutMeTopic topic="hobbies" >
              I am a software engineer who loves to create web applications.
              I am currently working as a frontend developer at a company in the Netherlands.
              My main focus is on creating user-friendly and accessible web applications.
              I am always looking for new challenges and opportunities to learn new things.
              I am passionate about creating clean and maintainable code and I love to work in a team.
              I am always looking for new ways to improve my skills and I am not afraid to take on new challenges.
            </AboutMeTopic>

          </article>
          <section id="projects-wrapper">
            <h2 className="regular-header" id="projects-header">Projects</h2>
            <div className="projects-container">
              <ProjectCard
                url="https://portfolio-synkrotics-projects.vercel.app/"
                title="Portfolio"
              >
                My professional portfolio
              </ProjectCard>
              <ProjectCard 
                url="https://openai.com/"
                title="ChatGPT"
              >
                OpenAI's generative AI
              </ProjectCard>
              <ProjectCard
                url="https://en.wikipedia.org/wiki/Main_Page"
                title="Wikipedia"
              >
                A trusted source of general information
              </ProjectCard>

              <ProjectCard 
                url="http://paperjs.org/examples/boolean-operations/"
                title="Paper.js"
              >
                Vector graphics framework for JavaScript
              </ProjectCard>
              <ProjectCard
                url="https://threejs.org/examples/webgl_shaders_sky.html"
                title="Three.js"
              >
                An example of how to make a sky in the Three.js framework
              </ProjectCard>
              <ProjectCard
                url="https://turbowarp.org/60917032/embed"
                title="TurboWarp"
              >
                A Scratch game about an apple, exported to JavaScript
              </ProjectCard>
            </div>
          </section>
        </main>
      </div>

      <div className="snap-position-container" id="snap-container">
        {snapPositions && snapPositions.map((pos, index) => {
          return <div key={index} className={`navbar-snappoint auto-resize ${pos.x}${pos.y}`} style={{ top: pos.y, left: pos.x }}></div>
        }
      )}
      </div>
      <NavBar startPos={0} ref={navbar} snapPositionsFunc={setSnapPositions} getSnapPoints={getSnapPoints} />
    </>
  )
}

export default App
