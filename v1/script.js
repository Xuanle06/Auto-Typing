const text = "Hallo World！\nWelcome to my website!";  // 添加换行符 \n
const minSpeed = 100;  // 最小速度（毫秒）
const maxSpeed = 300;  // 最大随机延迟（毫秒）
let index = 0;

function typeText() {
    const typingElement = document.getElementById("typing");

    if (index < text.length) {
        // 如果字符是换行符，转换为 <br>
        if (text.charAt(index) === '\n') {
            typingElement.innerHTML += "<br>";
        } else {
            typingElement.innerHTML += text.charAt(index);
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

// 开始打字效果
typeText();
