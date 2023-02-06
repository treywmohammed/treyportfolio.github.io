const mainContainer = document.querySelector(".main-container")
const thankYou = document.querySelector(".thank-you")
const submit = document.getElementById("submit")
const rating = document.getElementById("rating")
const rates = document.querySelectorAll(".btn")


submit.addEventListener("click", () => {
    thankYou.classList.remove("hidden")
    mainContainer.style.display = "none"
})

rates.forEach((rate) => {
    rate.addEventListener("click", () => {
        rating.innerHTML = rate.innerHTML
    })
})

