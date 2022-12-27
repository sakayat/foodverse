import React from "react";
import { Link } from "react-router-dom";

const FoodCard = ({ recipe }) => {
	return (
		<div className="rounded-md bg-white shadow-lg text-sm w-80">
			<img src={recipe.image_url} alt={recipe.title} className="w-full h-56 object-fill" />
			<div className="p-4">
				<span className="food-tag font-bold text-orange-500">{recipe.publisher}</span>
				<h2 className="text-2xl truncate">{recipe.title}</h2>
				<Link
					to={`recipe-item/${recipe.recipe_id}`}
					className="text-white uppercase inline-block border border-transparent bg-slate-900 py-2 px-4 my-2">
					View recipe
				</Link>
			</div>
		</div>
	);
};

export default FoodCard;
