// Sets the copyright year range in footer.html.hbs
const currentYear = new Date().getFullYear();
if (currentYear > 2022) {
    document.querySelector('#copyright-years').innerHTML = `2022 - ${currentYear}`;
}