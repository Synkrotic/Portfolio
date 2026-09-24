import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Homepage from "./Components/Pages/Homepage/Homepage"


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/voorraadbeheer" element={<Homepage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
