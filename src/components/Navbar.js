
import { NavLink } from "react-router-dom";

const Navbar = ({searchHandler,searchQuery,setSearchQuery}) => {
	

	const navActive = ({ isActive }) => {
		return {
			color: isActive ? "#f97316" : null,
		};
	};

	

	return (
		<div className="container mx-auto">
			<nav className="flex lg:flex-row flex-col items-center justify-between py-5">
				<div className="font-bold">
					<NavLink to="/">
						<span>food</span>
						<span className="text-orange-500">verse</span>
					</NavLink>
				</div>
				<form className="search-box" onSubmit={searchHandler}>
					<input
						value={searchQuery}
						onChange={e => setSearchQuery (e.target.value)}
						type="search"
						placeholder="Search recipe..."
						className="rounded-full focus:outline-none bg-white py-2 px-4 w-96"
					/>
				</form>
				<ul className="nav-links flex items-center gap-10">
					<li>
						<NavLink style={navActive} to="/">
							Home
						</NavLink>
					</li>
					<li>
						<NavLink style={navActive} to="/favorites">
							Favorites <span className="text-orange-500 font-bold">(0)</span>
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
