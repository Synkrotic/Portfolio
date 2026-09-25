import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Homepage from "./Components/Pages/Homepage/Homepage"
import { lazy } from "react";

const Versionpage = lazy(() => import("./Components/Pages/Versionpage/Versionpage"));


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/voorraadbeheer" element={<Homepage />} />
				<Route path="/versions/repository/:programName" element={<Versionpage />} />
				<Route path="*" element={<h1>404</h1>} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
