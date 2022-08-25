/*          Select Box          */
const selectInput = document.querySelector('.input-select--selected');
const selectLabel = document.getElementById('selectedLabel')
const selectBox = document.querySelector('.input-select--options');
const options = document.querySelectorAll('.option');

selectInput.addEventListener('click', () => {
    if (!selectInput.classList.contains('read-only')) {
        const dropdownIcon = document.getElementById('selectedIcon');
        if (selectBox.classList.contains('active')) {
            selectBox.classList.remove('active');
            dropdownIcon.style.transform = "rotate(180deg)";
        } else {
            selectBox.classList.add('active');
            dropdownIcon.style.transform = "rotate(360deg)";
        }
    }
});

options.forEach((option) => {
    option.addEventListener('click', () => {
        const dropdownIcon = document.getElementById('selectedIcon');

        selectLabel.innerHTML = option.querySelector('label').innerHTML;
        selectLabel.style.color = 'rgba(55, 43, 43, .5)';

        selectBox.classList.remove('active');
        dropdownIcon.style.transform = "rotate(180deg)";
    })
});