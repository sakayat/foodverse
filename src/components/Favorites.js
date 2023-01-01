import React from "react";
import RecipeCard from "./RecipeCard";

const Favorites = ({ saveItems }) => {
	return (
		<div className="container mx-auto py-10">
			{
				saveItems.length === 0 ? <h3 className="text-2xl text-center tracking-widest pb-10">Favorite list is empty</h3> : <h3 className="text-2xl text-center tracking-widest pb-10">Favorite Recipes</h3>
			}
			<div className="flex flex-wrap justify-center gap-10">
				{saveItems.map((recipe, id) => (
					<RecipeCard key={id} recipe={recipe} />
				))}
			</div>
		</div>
	);
};

export default Favorites;
