import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hook/useFetch";

const RecipeItem = ({ favoritesHandler, saveItems }) => {
	const [saveStatus, setSaveStatus] = useState(null);
	const { recipe } = useFetch();
	const navigate = useNavigate();

	const backToNavigate = () => {
		navigate("/");
	};

	useEffect(() => {
		if (!recipe) return;
		setSaveStatus(saveItems.some((item) => item.recipe_id === recipe.recipe_id));
	}, [recipe,saveItems]);

	return (
		<div className="container mx-auto py-10">
			<div className="grid lg:grid-cols-2 gap-10">
				<div className="info">
					<div className="flex items-center justify-between">
						<p className="text-orange-500 uppercase font-bold">{recipe.publisher}</p>
						<button
							onClick={() => favoritesHandler(recipe.recipe_id)}
							className={`rounded-full capitalize py-2 px-4 ${
								saveStatus ? "bg-green-200" : "bg-orange-200"
							}`}>
							{saveStatus ? "- Remove from favorites" : "+ Save as favorite"}
						</button>
					</div>
					<h2 className="text-2xl lg:text-4xl capitalize pt-6">{recipe.title}</h2>
					<div className="button flex items-center gap-5 py-6">
						<button
							className="rounded-full uppercase bg-orange-200 py-2 px-4"
							onClick={backToNavigate}>
							Go Back
						</button>
						<button className="rounded-full uppercase bg-rose-200 py-2 px-4">Get Directions</button>
					</div>
				</div>
				<div className="img">
					<img src={recipe.image_url} alt={recipe.title} className="w-full h-72 object-fill" />
				</div>
			</div>
			<div className="ingredient py-10">
				<h4 className="text-2xl">Ingredients</h4>
				<ul className="pt-5">
					{recipe?.ingredients?.map((ing, i) => {
						return (
							<li key={i} className="flex gap-3 py-2">
								<span className="text-orange-500">#</span> {ing}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default RecipeItem;
