const typingElement = document.getElementById("typing");
const minSpeed = 100;  // 最小速度（毫秒）
const maxSpeed = 300;  // 最大随机延迟（毫秒）
let index = 0;
let wordIndex = 0;
let words = [];
let currentWord = '';
let currentWordColor = '';

// 通过fetch从当前目录获取text.txt文件
fetch('./text.txt')
    .then(response => response.text())
    .then(data => {
        // 按照空格和换行符分割文本，将文本分割成单词和换行符
        words = data.split(/(\s+)/);
        prepareNextWord();
        changeBodyBackgroundColor(); // 初始时改变背景颜色
        typeText();   // 开始打字效果
    })
    .catch(error => console.error('Error loading the text file:', error));

// 随机生成一个颜色
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 计算颜色的亮度
function getLuminance(color) {
    const rgb = parseInt(color.slice(1), 16); // 将颜色转换为十六进制数字
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b; // 计算亮度
}

// 检查两个颜色是否相似（可以根据需求调整阈值）
function areColorsSimilar(color1, color2) {
    const luminance1 = getLuminance(color1);
    const luminance2 = getLuminance(color2);
    return Math.abs(luminance1 - luminance2) < 50; // 调整阈值以增加或减少对比度
}

// 改变Body背景颜色，确保与文本颜色不同
function changeBodyBackgroundColor() {
    let bgColor;
    do {
        bgColor = getRandomColor();
    } while (areColorsSimilar(bgColor, currentWordColor));
    document.body.style.backgroundColor = bgColor;
}

// 准备下一个词
function prepareNextWord() {
    if (wordIndex < words.length) {
        currentWord = words[wordIndex];
        currentWordColor = getRandomColor();
        wordIndex++;
    }
}

function typeText() {
    if (index < currentWord.length) {
        // 为当前字符应用当前单词的颜色
        const coloredChar = `<span style="color:${currentWordColor}">${currentWord.charAt(index)}</span>`;
        typingElement.innerHTML += coloredChar;
        index++;

        // 随机设置延迟时间，但不能低于最小速度
        const delay = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        setTimeout(typeText, delay);
    } else if (wordIndex < words.length) {
        index = 0;
        changeBodyBackgroundColor();  // 每当显示一个新单词时改变背景颜色
        prepareNextWord();
        typeText();
    } else {
        setTimeout(() => {
            index = 0;
            wordIndex = 0;
            typingElement.innerHTML = ""; // 清空内容，重新开始
            changeBodyBackgroundColor();  // 重新开始时改变背景颜色
            prepareNextWord();
            typeText();
        }, 2000); // 延迟2秒后重新开始
    }
}
