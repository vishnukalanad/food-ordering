import {useEffect, useState} from "react";
import MealItem from "./MealItem.jsx";

export default function Meals() {
    const [meals, setMeals] = useState([]);
    useEffect(() => {
        async function getMeals() {
            const response = await fetch('http://localhost:3000/meals');
            if(!response.ok) {
                return new Error("Error fetching meals");
            }

            const mealsJson = await response.json();
            setMeals(mealsJson);
        }

        getMeals();
    }, [])
    return <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            { meals.map(meal => <MealItem key={meal.id} data={meal} />) }
        </div>
    </div>;
}