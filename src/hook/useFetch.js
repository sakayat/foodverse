import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export const useFetch = () => {
	const {id} = useParams();
	const [recipe, setRecipe] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	useEffect(() => {    
		const getItemData = async () => {
			try {
				setLoading(true);
				const res = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
                const data = await res.json();
				if (!res.ok) throw new Error("Something Went wrong");
				setRecipe(data.recipe);
				setLoading(false);
			} catch (error) {
				setError(error.message);
			}
		};
		getItemData();
	}, [id]);
	return { recipe, error, loading };
};
