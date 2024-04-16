import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Sidebar/Navigation";
import Navbar from "./components/main/Navbar";
import Home from "./components/Dashboard/Home";
import Employees from "./components/Employees/Employees";
import Students from "./components/Students/Students";
import Finance from "./components/Finance/Finance";
import EventManagement from "./components/EventManagement/EventManagement";
import NotFound from "./components/NotFound";

function App() {
	return (
		<Router>
			<div className="grid lg:grid-cols-[300px_1fr] gap-4 bg-[#F0F2F5]">
				<aside className="h-screen p-4 hidden lg:block">
					<Navigation />
				</aside>
				<main className="w-full">
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/Dashboard" element={<Home />} />
						<Route path="/Employees" element={<Employees />} />
						<Route path="/Students" element={<Students />} />
						<Route path="/Finance" element={<Finance />} />
						<Route path="/Event" element={<EventManagement />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
