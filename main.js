document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-button');
    const lotteryNumbersDisplay = document.getElementById('lottery-numbers');

    const generateLotteryNumbers = () => {
        const numbers = new Set();
        while (numbers.size < 6) { // Generate 6 unique numbers
            const randomNumber = Math.floor(Math.random() * 45) + 1; // Numbers from 1 to 45
            numbers.add(randomNumber);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    };

    const displayLotteryNumbers = (lotteryNumbers) => {
        lotteryNumbersDisplay.innerHTML = ''; // Clear previous numbers
        lotteryNumbers.forEach(number => {
            const numberBall = document.createElement('div');
            numberBall.classList.add('number-ball');
            numberBall.textContent = number;
            lotteryNumbersDisplay.appendChild(numberBall);
        });
    };

    generateButton.addEventListener('click', () => {
        const numbers = generateLotteryNumbers();
        displayLotteryNumbers(numbers);
    });

    // Initial generation when the page loads
    displayLotteryNumbers(generateLotteryNumbers());
});