const select = (selector) => document.querySelector(selector);

const form = select(".form");
console.log(form);

form.addEventListener("submit", (e) => {
    console.log("form is submitting");
});
