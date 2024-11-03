import { Meals, MealsDetails } from "./allClasses.js";
/*-------------------------- sidebar code animation------------------------- */
let gear = $(".open-close-icon");
let sidebarLinks = $(".inner-slider ul li");
let sideBar = $(".slider")
let isVisible = false;
let innerSide = $(".inner-slider").innerWidth()
sideBar.animate({ left: -innerSide }, 0);
gear.click(function (e) {
    if (isVisible == false) {
        isVisible = true;
        gear.addClass("fa fa-x")
        sideBar.animate({ left: 0 })
        sidebarLinks.animate({ top: 0 }, 600)
    } else {
        isVisible = false;
        gear.removeClass("fa fa-x");
        sideBar.animate({ left: -innerSide });
        sidebarLinks.animate({ top: 300 }, 600)
    }
})

/* -----------------sidebar end------------------------------- */
/* ------------------meals on start------------------------ */
let meals = new Meals();
meals.fetchMeals(undefined, "meals");

let inputContainer = $("#input-container")
let contentContainer = $("#content-container");

/* ----------------sidebar links on click code-------------------------- */
sideBar.click(function (e) {
    let target = $(e.target);
    if (target.attr("id") === "searchMeals") { // search button
        sideBar.animate({ left: -innerSide })
        sidebarLinks.animate({ top: 300 }, 600)
        gear.removeClass("fa fa-x");
        contentContainer.empty();
        let content = `
            <div>
                <input type="text" class="w-full m-4 bg-black placeholder-gray-500
                border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                 placeholder="Search By Name" id="mealName">
            </div>
            <div>
                <input type="text" class="w-full m-4 bg-black placeholder-gray-500
                border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                 placeholder="Search By First Letter" id="mealOneLetter">
            </div>`

        inputContainer.html(content);
        let firstInput = $('#mealName');
        let secondInput = $('#mealOneLetter');

        /* --------search inputs event listeners---------------------------- */
        firstInput.on('input', function () {
            meals.fetchMeals(this.value, "meals");
        });
        secondInput.on('input', function () {
            if (this.value.length > 1) {
                this.value = this.value.charAt(0); // Keep only the first character
            }
        });
        secondInput.on('keyup', function (e) {
            if (this.value.length >= 1) {
                meals.fetchMeals(this.value, "meals");
                e.preventDefault(); // Prevent further input
            }
        })
    } else if (target.attr("id") === "categories") { // categories button
        sideBar.animate({ left: -innerSide })
        sidebarLinks.animate({ top: 300 }, 600)
        gear.removeClass("fa fa-x")
        contentContainer.empty();
        inputContainer.empty();
        meals.fetchMeals(undefined, "category")
    } else if (target.attr("id") === "area") { // area button
        sideBar.animate({ left: -innerSide })
        sidebarLinks.animate({ top: 300 }, 600)
        gear.removeClass("fa fa-x")
        contentContainer.empty();
        inputContainer.empty();
        meals.fetchMeals(undefined, "area");
    } else if (target.attr("id") === "ingredients") { // ingredients button
        sideBar.animate({ left: -innerSide })
        sidebarLinks.animate({ top: 300 }, 600)
        gear.removeClass("fa fa-x")
        inputContainer.empty();
        contentContainer.empty();
        meals.fetchMeals(undefined, "ingredients");
    } else if (target.attr("id") === "contactUs") { // contactUs button
        sideBar.animate({ left: -innerSide })
        sidebarLinks.animate({ top: 300 }, 600)
        gear.removeClass("fa fa-x")
        contentContainer.empty();
        let contactContent = `
        <div>
                    <input id="nameInput" type="text" 
                    class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Your Name">
                    <div id="nameAlert" class="bg-red-500 text-red-900 font-semibold px-4 py-3 rounded w-100 mt-2 hidden">
                        Special characters and numbers not allowed
                    </div>
                </div>
                <div>
                    <input id="emailInput" type="email" 
                    class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 " placeholder="Enter Your Email">
                    <div id="emailAlert" class="bg-red-500 text-red-900 font-semibold px-4 py-3 rounded w-100 mt-2 hidden">
                        Email not valid *exemple@yyy.zzz
                    </div>
                </div>
                <div>
                    <input id="phoneInput" type="text" 
                    class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 " placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="bg-red-500 text-red-900 font-semibold px-4 py-3 rounded w-100 mt-2 hidden">
                        Enter valid Phone Number
                    </div>
                </div>
                <div>
                    <input id="ageInput" type="number" 
                    class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 " placeholder="Enter Your Age">
                    <div id="ageAlert" class="bg-red-500 text-red-900 font-semibold px-4 py-3 rounded w-100 mt-2 hidden">
                        Enter valid age
                    </div>
                </div>
                <div>
                    <input id="passwordInput" type="password" 
                    class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 " placeholder="Enter Your Password">
                    <div id="passwordAlert" class="bg-red-500 text-red-900 font-semibold px-4 py-3 rounded w-100 mt-2 hidden">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div>
                    <input id="repasswordInput" type="password" 
                    class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 " placeholder="Repassword">
                    <div id="repasswordAlert" class="bg-red-500 text-red-900 font-semibold px-4 py-3 rounded w-100 mt-2 hidden">
                        Enter valid repassword 
                    </div>
                </div>
                <button class="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold py-2 px-4 rounded
                col-span-2 justify-self-center" disabled="true" id="submitBtn">
                    Submit
                </button>`
        inputContainer.html(`${contactContent}`)

        let inputs = $("input")
        inputs.on("keyup", function () {
            inputsValidation(this);
        })
    }
})

let mealDetail = new MealsDetails();
contentContainer.click(function (e) {
    let target = $(e.target);
    if (target.parents(".meal-item").attr("data-type")) {
        let query = target.parents(".meal-item").attr("data-name");
        let type = target.parents(".meal-item").attr("data-type");
        $("body").addClass("overflow-hidden")
        mealDetail.fetchMealDetails(query, type);
    }
})


function inputsValidation(currentInput) {
    const validationMap = {
        nameInput: { regex: /^[A-Za-z\s]+$/, alertId: '#nameAlert' },
        phoneInput: { regex: /^01[0125][0-9]{8}$/, alertId: '#phoneAlert' },
        emailInput: { regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, alertId: '#emailAlert' },
        passwordInput: { regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, alertId: '#passwordAlert' },
        ageInput: { regex: /^(1[01][0-9]|[1-9][0-9]?)$/, alertId: '#ageAlert' },
        repasswordInput: { alertId: '#repasswordAlert' }
    };

    // Get the id of the current input element
    let inputId = $(currentInput).attr("id");
    let inputVal = $(currentInput).val();

    // Get the corresponding regex pattern and alert ID for the input
    let validation = validationMap[inputId];

    // Perform validation on the specific input field
    if (inputId === "repasswordInput") {
        // Compare repasswordInput with passwordInput
        if (inputVal === $('#passwordInput').val()) {
            $(validation.alertId).addClass('hidden');
        } else {
            $(validation.alertId).removeClass('hidden');
        }
    } else if (validation && validation.regex.test(inputVal)) {
        $(validation.alertId).addClass('hidden');
    } else {
        $(validation.alertId).removeClass('hidden');
    }

    // Enable the submit button only if all inputs are valid
    if (Object.keys(validationMap).every(id => {
        if (id === "repasswordInput") {
            return $(`#repasswordInput`).val() === $(`#passwordInput`).val();
        }
        return validationMap[id].regex.test($(`#${id}`).val());
    })) {
        $("#submitBtn").removeAttr("disabled");
    } else {
        $("#submitBtn").attr("disabled", "true");
    }
}
