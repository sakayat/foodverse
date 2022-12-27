import React from "react";
import FoodCard from "./FoodCard";

const Home = ({ recipes, loading, error }) => {
	return (
		<div className="container mx-auto py-10">
			<div className="flex flex-wrap gap-10 justify-center">
				{!loading && !error && recipes.length === 0 ? (
					<p className="text-2xl lg:text-3xl text-orange-300 font-bold">
						Nothing to show, please search something{" "}
					</p>
				) : null}

				{loading && <p>{error ? error : "loading..."}</p>}

				{recipes?.length > 0 &&
					recipes.map((recipe) => <FoodCard recipe={recipe} key={recipe.recipe_id} />)
				}
			</div>
		</div>
	);
};

export default Home;
