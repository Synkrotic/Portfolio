import { useEffect } from 'react'
import './App.css'

function App() {
  const professions = [
    "Software engineer",
    "Frontend developer",
    "Backend developer",
    "Mobile app developer",
  ]

  function changeProfession() {
    const profession = document.getElementById('header-profession') as HTMLHeadingElement;
    let professionNum = 0;
    let professionText = professions[professionNum];
    let letNum = 0;
    let goForwards = true;
    let timeout = false;


    setInterval(() => {
      if (!goForwards) return;
      timeout = false;
      profession.innerText = '';
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
      profession.innerText = '';
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
          <h1 id='header-name'>Jannes Borger</h1>
          <h2 id='header-profession'></h2>
        </div>
      </header>
      <main>
        <article>
          <h2>About me</h2>
        </article>
      </main>
    </div>
  )
}

export default App
