const typingElement = document.getElementById("typing");
const minSpeed = 100;  // 最小速度（毫秒）
const maxSpeed = 300;  // 最大随机延迟（毫秒）
let index = 0;
let text = "";

// 通过fetch从当前目录获取text.txt文件
fetch('./text.txt')
    .then(response => response.text())
    .then(data => {
        text = data;  // 将文件内容存储在text变量中
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

function typeText() {
    if (index < text.length) {
        // 如果字符是换行符，转换为 <br>
        if (text.charAt(index) === '\n') {
            typingElement.innerHTML += "<br>";
        } else {
            // 给每个字符加上随机颜色的 span 标签
            const coloredChar = `<span style="color:${getRandomColor()}">${text.charAt(index)}</span>`;
            typingElement.innerHTML += coloredChar;
        }
        index++;

        // 随机设置延迟时间，但不能低于最小速度
        const delay = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        setTimeout(typeText, delay);
    } else {
        setTimeout(() => {
            index = 0;
            typingElement.innerHTML = ""; // 清空内容，重新开始
            typeText();
        }, 2000); // 延迟2秒后重新开始
    }
}
