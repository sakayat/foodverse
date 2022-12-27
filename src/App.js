import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Favorites from "./components/Favorites";
import RecipeItem from "./components/RecipeItem";
import Footer from "./components/Footer";

const App = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const getData = async () => {
		try {
			setLoading(true);
			const res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${searchQuery}`);
			const data = await res.json();
			setRecipes(data.recipes);
			if (!res.ok) throw new Error("No Recipes Found");
			setLoading(false);
		} catch (error) {
			setError(error.message);
		}
	};

	const searchHandler = (e) => {
		e.preventDefault();
		getData();
		setRecipes([]);
		setError("");
	};

	const checkLocalData = (data) => {};

	const favoritesHandler = (id) => {
		fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
			.then((res) => res.json())
			.then((data) => checkLocalData(data.recipe));
	};

	return (
		<>
			<div className="min-h-screen bg-fuchsia-100 text-slate-900">
				<Navbar
					searchHandler={searchHandler}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
				<Routes>
					<Route path="/" element={<Home recipes={recipes} loading={loading} error={error} />} />
					<Route path="favorites" element={<Favorites />} />
					<Route
						path="recipe-item/:id"
						element={<RecipeItem favoritesHandler={favoritesHandler} />}
					/>
				</Routes>
			</div>
			<Footer/>
		</>
	);
};

export default App;
