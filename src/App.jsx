import { useState, useEffect } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://dummyjson.com/recipes");
      const data = await response.json();
      setRecipes(data.recipes);
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-black text-center text-gray-800 mb-10 tracking-tight">
        Explore Recipes
      </h1>

      <div className="flex flex-col gap-4">
        {recipes.map((recipe) => {
          return (
            <a
              href={`/recipe/${recipe.id}`}
              key={recipe.id}
              className="group flex items-center bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md hover:border-sky-300 transition-all duration-300"
            >
              {/* Small Thumbnail Image */}
              <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Recipe Info */}
              <div className="px-6 py-4 flex flex-col items-start text-left">
                <span className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-1">
                  {recipe.cuisine}
                </span>
                <h2 className="text-lg font-bold text-gray-800 group-hover:text-sky-600 transition-colors">
                  {recipe.name}
                </h2>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                  <span>
                    ⏱️ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
                  </span>
                  <span>⭐ {recipe.rating}</span>
                </div>
              </div>

              {/* Right Arrow (Visible on hover) */}
              <div className="ml-auto pr-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                <span className="text-sky-500 text-xl">→</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default App;
