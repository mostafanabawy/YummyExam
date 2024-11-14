let loader = $(".loading");
let contentLoader = $(".content-loader");

export class Meals {
    constructor(name) {
        this.name = name;
    }
    async fetchMeals(name, type) {
        let leftOffset = $(".slider").outerWidth() - $(".inner-slider").outerWidth();
        let topOffset = $("#content-container").offset().top;
        contentLoader.css({ left: leftOffset, top: topOffset });
        let api
        if (type === "meals") {
            api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name ? name : ""}`
            contentLoader.fadeIn(0, function () {
                $(this).css('display', 'flex'); // Set to flex after fading in
            })
        } else if (type === "category") {
            api = `https://www.themealdb.com/api/json/v1/1/categories.php`
            loader.fadeIn(0, function () {
                $(this).css('display', 'flex'); // Set to flex after fading in
            })
        } else if (type === "area") {
            api = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
            loader.fadeIn(0, function () {
                $(this).css('display', 'flex'); // Set to flex after fading in
            })
        } else if (type === "ingredients") {
            api = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
            loader.fadeIn(0, function () {
                $(this).css('display', 'flex'); // Set to flex after fading in
            })
        }
        try {
            const response = await fetch(api, { method: 'GET' });
            const data = await response.json();
            display(data, type);
        } catch (error) {
            console.log(error.message);
        }
    }
}

export class MealsDetails {

    async fetchMealDetails(query, type) {
        let api
        loader.fadeIn(0, function () {
            $(this).css('display', 'flex'); // Set to flex after fading in
        })
        if (type === "meals") {
            api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${query}`
        } else if (type === "category") {
            api = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`
        } else if (type === "area") {
            api = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`
        } else if (type === "ingredients") {
            api = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
        }
        try {
            const response = await fetch(api, { method: 'GET' });
            const data = await response.json();
            displayDetails(data, type);
        } catch (error) {
            console.log(error);
        }
    }
}


let container = $("#content-container");
async function display(data, type) {
    let content = ""
    if (type === "meals") {
        let mealArr = await data.meals;
        let length = Math.min(mealArr.length, 20);
        for (let i = 0; i < length; i++) {
            content += `
                <div class="meal-item relative bg-white cursor-pointer" data-name = "${mealArr[i].idMeal}" data-type="meals">
                    <img class="w-full" src="${mealArr[i].strMealThumb}" alt="">
                    <div class="layer bg-white/70 flex items-center ps-5 text-xl">
                        <h3 class="text-black/100 font-bold">${mealArr[i].strMeal}</h3>
                    </div>
                </div>`
        }
    } else if (type === "category") {
        let mealArr = await data.categories;
        let length = Math.min(mealArr.length, 20);
        for (let i = 0; i < length; i++) {
            content += `
                <div class="meal-item relative bg-white" data-name="${mealArr[i].strCategory}" data-type="category">
                    <img class="w-full" src="${mealArr[i].strCategoryThumb}" alt="">
                    <div class="layer bg-white/70 flex flex-col justify-center ps-5 text-xl">
                        <h3 class="text-black/100 font-bold">${mealArr[i].strCategory}</h3>
                        <p class="line-clamp-4 text-sm">${mealArr[i].strCategoryDescription}</p>
                    </div>
                </div>`

        }
    } else if (type === "area") {
        let mealArr = await data.meals;
        let length = Math.min(mealArr.length, 20)
        for (let i = 0; i < length; i++) {
            content += `
            <div  class="meal-item rounded-2 text-center cursor-pointer text-white" data-name="${mealArr[i].strArea}" data-type="area">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${mealArr[i].strArea}</h3>
                </div>`

        }
    } else if (type === "ingredients") {
        let mealArr = await data.meals;
        let length = Math.min(mealArr.length, 20);
        for (let i = 0; i < length; i++) {
            content += `
            <div data-name="${mealArr[i].strIngredient}" data-type="ingredients" class="meal-item rounded-2 text-center cursor-pointer text-white">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${mealArr[i].strIngredient}</h3>
                        <p class="line-clamp-4 text-sm">${mealArr[i].strDescription}</p>
                </div>`

        }
    }
    container.empty();
    container.append(`${content}`);
    loader.fadeOut(0);
    contentLoader.fadeOut(0);
}

let mealContainer = $("#mealDetails")
async function displayDetails(data, type) {
    if (type === "meals") {
        let mealArr = await data.meals;
        let i = 1;
        let ingredients = [];
        let measures = [];
        // Use a while loop to collect ingredients until we hit an empty ingredient
        while (mealArr[0][`strIngredient${i}`]) {
            ingredients.push(mealArr[0][`strIngredient${i}`]);
            measures.push(mealArr[0][`strMeasure${i}`]);
            i++;
        }
        let listItems = "";
        for (let i = 0; i < ingredients.length; i++) {
            listItems += `<li class="bg-blue-100 text-blue-800 m-2 p-1 border border-blue-200 rounded">${measures[i]} ${ingredients[i]}</li>`;
        }
        let content = `
        <div class="container grid grid-cols-4 text-white mx-auto gap-6">
                <header class="col-span-4 lg:col-span-1">
                    <img src="${mealArr[0].strMealThumb}" alt="">
                    <h1 class="text-3xl font-bold">${mealArr[0].strMeal}</h1>
                </header>
                <div class="col-span-4 lg:col-span-3 " id="detailsContent">
                    <div>
                        <div class="flex justify-between">
                            <h2 class="text-3xl font-bold">Instructions</h2>
                            <button>
                                <i class="fa fa-x" aria-hidden="true"></i>
                            </button>
                        </div>

                        <p>${mealArr[0].strInstructions}</p>
                    </div>
                    <div class=" text-white">
                        <h3 class="text-2xl"><span class="font-extrabold">Area : </span>${mealArr[0].strArea}</h3>
                        <h3 class="text-2xl"><span class="font-extrabold">Category : </span>${mealArr[0].strCategory}</h3>
                        <h3 class="text-2xl font-extrabold">Recipes :</h3>
                        <ul class="list-unstyled flex gap-0 flex-wrap items-start">
                            ${listItems}
                        </ul>
                        <h3 class="text-2xl font-extrabold mb-4">Tags :</h3>
                        <a target="_blank" href="${mealArr[0].strSource}" class="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600">Source</a>
                        <a target="_blank" href="${mealArr[0].strYoutube}" class="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600">Youtube</a>
                    </div>

                </div>
            </div>`
        mealContainer.html(`${content}`)
        loader.fadeOut(0);
        mealContainer.toggle();
        $(".fa-x").on("click", function () {
            mealContainer.toggle();
            $("body").removeClass("overflow-hidden")
        })
    } else {
        display(data, "meals");
    }
}