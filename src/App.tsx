import { useEffect } from "react"
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
          <h2 className="regular-header about-me-header">About me</h2>
          <div className="about-me-text-container">
            <h3 className="about-me-text-header">My Work</h3>
            <p className="about-me-text">
              I am a software engineer who loves to create web applications.<br />
              I am currently working as a frontend developer at a company in the Netherlands.<br />
              My main focus is on creating user-friendly and accessible web applications.<br />
              I am always looking for new challenges and opportunities to learn new things.<br />
              I am passionate about creating clean and maintainable code and I love to work in a team.<br />
              I am always looking for new ways to improve my skills and I am not afraid to take on new challenges.<br />
            </p>
          </div>
        </article>
      </main>
    </div>
  )
}

export default App
