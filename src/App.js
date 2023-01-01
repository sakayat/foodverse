import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
	const inputRef = useRef(null)
	const [saveItems, setSaveItems] = useState(() => {
		const saveLocalData = localStorage.getItem("recipes");
		return saveLocalData ? JSON.parse(saveLocalData) : [];
	});
	
	const navigate = useNavigate();

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
		setSearchQuery("")
		inputRef.current.blur()
	};

	const checkLocalData = (data, id) => {
		const local = JSON.parse(localStorage.getItem("recipes"));
		const existData = local.some((item) => item.recipe_id === id);
		if (!existData) {
			setSaveItems([...saveItems, data]);
		} else {
			const newData = local.filter((item) => item.recipe_id !== id);
			setSaveItems(newData);
		}
	};

	const favoritesHandler = (id) => {
		fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
			.then((res) => res.json())
			.then((data) => checkLocalData(data.recipe, data.recipe.recipe_id));
		navigate("/favorites");
	};

	useEffect(() => {
		localStorage.setItem("recipes", JSON.stringify(saveItems));
	}, [saveItems]);

	return (
		<>
			<div className="min-h-screen bg-fuchsia-100 text-slate-900">
				<Navbar
					searchHandler={searchHandler}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					inputRef={inputRef}
					saveCount={saveItems.length}
				/>
				<Routes>
					<Route path="/" element={<Home recipes={recipes} loading={loading} error={error} />} />
					<Route path="favorites" element={<Favorites saveItems={saveItems} />} />
					<Route
						path="recipe-item/:id"
						element={<RecipeItem favoritesHandler={favoritesHandler} saveItems={saveItems}/>}
					/>
				</Routes>
			</div>
			<Footer />
		</>
	);
};

export default App;
