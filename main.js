const snackDisplay = document.querySelector('.snack-display');
const recommendBtn = document.querySelector('.recommend-btn');
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
    let activeTheme = '';
    if (document.body.classList.contains('light-mode')) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        activeTheme = 'dark-mode';
    } else if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('blue-mode');
        activeTheme = 'blue-mode';
    } else { // Currently blue-mode, switch to light-mode
        document.body.classList.remove('blue-mode');
        document.body.classList.add('light-mode');
        activeTheme = 'light-mode';
    }
    localStorage.setItem('theme', activeTheme);
});


// Soju Snacks Data (using picsum.photos for placeholder images)
const sojuSnacks = [
    { name: "파전", description: "바삭하고 고소한 해물 파전은 비오는 날 소주와 환상의 조합입니다.", imageUrl: "https://picsum.photos/id/1084/300/200" },
    { name: "닭발", description: "매콤한 닭발은 소주 안주로 최고죠! 스트레스가 확 풀립니다.", imageUrl: "https://picsum.photos/id/1069/300/200" },
    { name: "제육볶음", description: "매콤달콤한 제육볶음은 든든하면서 소주를 부르는 맛입니다.", imageUrl: "https://picsum.photos/id/1080/300/200" },
    { name: "두부김치", description: "따뜻한 두부와 볶음 김치의 조화는 소주와 편안하게 즐기기 좋습니다.", imageUrl: "https://picsum.photos/id/1005/300/200" },
    { name: "오뎅탕", description: "시원하고 얼큰한 오뎅탕은 추운 날 소주와 함께 몸을 녹여줍니다.", imageUrl: "https://picsum.photos/id/1025/300/200" },
    { name: "골뱅이 소면", description: "새콤달콤매콤한 골뱅이 소면은 입맛을 돋우고 소주와 잘 어울립니다.", imageUrl: "https://picsum.photos/id/1004/300/200" },
    { name: "곱창/막창", description: "쫄깃하고 고소한 곱창/막창은 소주 애호가들의 스테디셀러 안주입니다.", imageUrl: "https://picsum.photos/id/1020/300/200" },
    { name: "치킨", description: "바삭한 치킨에 시원한 소주는 언제나 옳습니다!", imageUrl: "https://picsum.photos/id/1024/300/200" },
    { name: "김치찌개", description: "얼큰한 김치찌개는 소주 한 잔 후 속을 개운하게 해줍니다.", imageUrl: "https://picsum.photos/id/1015/300/200" },
    { name: "보쌈", description: "부드러운 보쌈 고기와 김치는 소주와 함께라면 든든한 한 끼 식사입니다.", imageUrl: "https://picsum.photos/id/1016/300/200" },
    { name: "피자", description: "소주와 피자의 이색 조합! 의외의 꿀맛을 경험해보세요.", imageUrl: "https://picsum.photos/id/1060/300/200" } // Pizza image from picsum.photos
];

const recommendSnack = () => {
    const randomIndex = Math.floor(Math.random() * sojuSnacks.length);
    return sojuSnacks[randomIndex];
};

const displaySnack = (snack) => {
    snackDisplay.innerHTML = `
        <img src="${snack.imageUrl}" alt="${snack.name}" class="snack-image">
        <h2>${snack.name}</h2>
        <p>${snack.description}</p>
    `;
};

recommendBtn.addEventListener('click', () => {
    const recommended = recommendSnack();
    displaySnack(recommended);
});