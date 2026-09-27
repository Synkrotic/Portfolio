import { useEffect, useRef, useState } from "react"
import ProjectCard from "../../../Components/ProjectCard";
import AboutMeTopic from "../../../Components/AboutMeTopic";
import NavBar from "../../../Components/NavBar";
import { getMyAge } from "../../../Logic/utils";


function Homepage() {
	const professions = [
		"Software",
		"Frontend",
		"Android",
		"Kotlin",
		"Java"
	]

	const navbar = useRef<NavBar>(null);
	const contactSubject = useRef<HTMLInputElement>(null);
	const contactMessage = useRef<HTMLTextAreaElement>(null);
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

		interval.toString()
	}

	function getSnapPoints(location?: { x: number, y: number }): HTMLCollectionOf<Element> | Element | null {
		const snapPoints = document.getElementsByClassName("navbar-snappoint");
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

	function getSnapPointByIndex(index: number): Element {
		const snapPoints = document.getElementsByClassName("navbar-snappoint");
		return snapPoints[index];
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
						<h2 className="regular-header about-me-header" id='about-me-header'>About me</h2>

						<AboutMeTopic topic="me" >
							Hello! My name is Jannes. I am {getMyAge()} years old and I've been programming for {getMyAge() - 13} of those.
							I come from a small village in the Northern part of the Netherlands, where I grew up on a farm.<br />
                            Around my 12th birthday I sparked an interest in computers and building one.
                            After a year of saving up I built my first computer on my 13th birthday. 
                            Having built this computer made me look for more of a challenge which ended up being programming.
						</AboutMeTopic>

						<AboutMeTopic topic="experience" >
							As I stated in the topic above, I've been programming for {getMyAge() - 13} years.
                            The first language I learnt was C# since I wanted to try game development.
                            Though I did not see a future in game design for myself.
                            My next programming interest was in web development since at the time I got classes in this in middle school.
                            When I started web development I preferred backend development, and got experience in mostly PHP.
                            Though when I got to University I made a couple projects with a classmate.
                            This classmate exceeded my knowledge in backend, so naturally shifted more towards frontend development.
                            

                            Talk about years development in webdev, and multiple frameworks. Also talk about shift to appdev and jvmdev
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
								title="Appel"
							>
								A Scratch game about an apple, exported to JavaScript
							</ProjectCard>
						</div>
					</section>
					
					<section id="contact-wrapper" className="section">
						<div className="contact-container">
							<h2 className="regular-header" id="contact-header">Get In Touch</h2>
							<div className="contact-form-wrapper">
								<img src="/assets/Images/contact.png" id="contact-image" />
								<div id="contact-form">
									<input ref={contactSubject} type="text" className="form-input" placeholder="Subject" required />
									<textarea ref={contactMessage} className="form-textfield" placeholder="Message" rows={5} required />
									<button
										type="submit"
										className="contact-submit-button"
										onClick={() => {
											const email = "jannes@borgerbytes.dev";
											const subject = contactSubject.current?.value.trim() || "";
											const message = contactMessage.current?.value.trim() || "";

											console.log(email, subject, message);
											window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
										}}
									>
										Send Message
									</button>
								</div>
							</div>
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

			<NavBar
				ref={navbar}
				startPos={0}
				snapPositionsFunc={setSnapPositions}
				getSnapPoints={getSnapPoints}
				getSnapPointByIndex={getSnapPointByIndex}
			/>
		</>
	)
}

export default Homepage