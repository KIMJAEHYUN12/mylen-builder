const numbersDisplay = document.querySelector('.numbers-display');
const generateBtn = document.querySelector('.generate-btn');

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
