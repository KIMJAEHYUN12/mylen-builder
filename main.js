document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-button');
    const lotteryNumbersDisplay = document.getElementById('lottery-numbers');
    const themeToggleButton = document.querySelector('.theme-toggle-btn');

    // Theme logic
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
    }

    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        let theme = 'light-mode';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark-mode';
        }
        localStorage.setItem('theme', theme);
    });

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


    // Teachable Machine model logic
    const URL = "https://teachablemachine.withgoogle.com/models/J3i5WvDds/";
    let model, webcam, labelContainer, maxPredictions;

    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const flip = true;
        webcam = new tmImage.Webcam(200, 200, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);

        document.getElementById("webcam-container").innerHTML = ''; // Clear existing content
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        labelContainer.innerHTML = ''; // Clear existing content
        for (let i = 0; i < maxPredictions; i++) {
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }

    // Attach init to the new start button
    const startWebcamButton = document.getElementById('start-webcam-button');
    if (startWebcamButton) {
        startWebcamButton.addEventListener('click', init);
    }
});

// Triggering redeployment from Gemini CLI