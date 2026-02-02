import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Recipe() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`);
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  if (!recipes) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <button
        onClick={() => navigate("/")}
        className="bg-sky-500 text-white p-3 hover:bg-sky-600 w-full"
      >
        ← Go Back
      </button>

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-100 my-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-full md:w-1/2">
            <img
              src={recipes.image}
              alt={recipes.name}
              className="w-full h-72 object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <span className="text-sm font-bold text-orange-500 uppercase tracking-widest">
              {recipes.cuisine} • {recipes.difficulty}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              {recipes.name}
            </h1>
            <p className="text-gray-600 italic mb-4">{recipes.description}</p>

            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="font-bold text-gray-700">{recipes.rating}</span>
              <span className="text-gray-400">
                ({recipes.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-100 mb-8 text-center">
          <div>
            <p className="text-gray-400 text-xs uppercase">Prep Time</p>
            <p className="font-semibold">{recipes.prepTimeMinutes} mins</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase">Cook Time</p>
            <p className="font-semibold">{recipes.cookTimeMinutes} mins</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase">Servings</p>
            <p className="font-semibold">{recipes.servings} ppl</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase">Calories</p>
            <p className="font-semibold">{recipes.caloriesPerServing} kcal</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Ingredients */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-orange-200 inline-block">
              Ingredients
            </h3>
            <ul className="space-y-2">
              {recipes.ingredients?.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700">
                  <span className="h-1.5 w-1.5 bg-orange-500 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-orange-200 inline-block">
              Instructions
            </h3>
            <div className="space-y-4">
              {recipes.instructions?.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="font-bold text-orange-500">{i + 1}.</span>
                  <p className="text-gray-700 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
          {recipes.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default Recipe;
