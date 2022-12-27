import React from "react";
import { useFetch } from "../hook/useFetch";

const RecipeItem = ({ favoritesHandler }) => {
	const { recipe } = useFetch();

	return (
		<div className="container mx-auto py-10">
			<div className="grid lg:grid-cols-2 gap-10">
				<div className="info">
					<div className="flex items-center justify-between">
						<p className="text-orange-500 uppercase font-bold">{recipe.publisher}</p>
						<button
							onClick={() => favoritesHandler(recipe.recipe_id)}
							className="rounded-full uppercase font-semibold bg-sky-200 py-2 px-8">
							+ Save as favorite
						</button>
					</div>
					<h2 className="text-2xl lg:text-4xl capitalize pt-6">{recipe.title}</h2>
					<div className="button flex items-center gap-5 py-6">
						<button className="rounded-full uppercase bg-orange-200 py-2 px-4">Go Back</button>
						<button className="rounded-full uppercase bg-rose-200 py-2 px-4">Get Directions</button>
					</div>
				</div>
				<div className="img">
					<img src={recipe.image_url} alt={recipe.title} className="w-full" />
				</div>
			</div>
			<div className="ingredient">
				<h4 className="text-2xl">Ingredients</h4>
				<ul className="py-10">
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
