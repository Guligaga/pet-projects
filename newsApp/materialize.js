document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('select');
    const [country, category] = M.FormSelect.init(elems, {});
    changeColor(country, 'white', 'red');
    changeColor(category, 'white', 'red');
});

// document.addEventListener('DOMContentLoaded', function() {
//     M.AutoInit();
//   });

function changeColor(instance, wrapperColor, optionColor) {
    instance.dropdown.el.classList.add(`${wrapperColor}-text`, 'focus-underline');
    const dOpts = [...instance.dropdownOptions.children];
    dOpts.forEach((opt, i) => {
        if(!i) return;
        opt.firstElementChild.classList.add(`${optionColor}-text`);
    })
}