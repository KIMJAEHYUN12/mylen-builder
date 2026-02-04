const numbersDisplay = document.querySelector('.numbers-display');
const generateBtn = document.querySelector('.generate-btn');
const themeToggleButton = document.querySelector('.theme-toggle-btn');

// Theme logic
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList.add(currentTheme);
} else {
    document.body.classList.add('light-mode'); // Default theme
    localStorage.setItem('theme', 'light-mode');
}

themeToggleButton.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
    }
});



const generateNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers);
};

const displayNumbers = (numbers) => {
    numbersDisplay.innerHTML = '';
    numbers.forEach(number => {
        const numberElement = document.createElement('div');
        numberElement.classList.add('number');
        numberElement.textContent = number;
        numbersDisplay.appendChild(numberElement);
    });
};

generateBtn.addEventListener('click', () => {
    const lottoNumbers = generateNumbers();
    displayNumbers(lottoNumbers);
});
