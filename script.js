const hackBtn = document.getElementById('hackBtn');
const nicknameInput = document.getElementById('nickname');
const resultDiv = document.getElementById('result');
const resultText = document.getElementById('resultText');

const fakePasswords = [
    'hunter2', 'gandon228', 'zxc123qwe', 'phoenix2026', 'frizminepass', 
    'mcpe12345', 'password123', 'qwerty123', 'serverhack', 'peadmin2026',
    'fuckyou69', 'bitchass', 'gandon1337', 'skidrow123', 'nulledbyerafox'
];

function getRandomPassword() {
    return fakePasswords[Math.floor(Math.random() * fakePasswords.length)];
}

function generateBasedOnNick(nick) {
    if (!nick) return getRandomPassword();
    const hash = nick.length * 7 + nick.charCodeAt(0) % 15;
    return nick.toLowerCase() + hash + '!';
}

hackBtn.addEventListener('click', async () => {
    const nick = nicknameInput.value.trim();
    if (!nick) {
        resultText.innerText = 'укажи ник, лох';
        resultDiv.classList.remove('hidden');
        return;
    }
    
    resultDiv.classList.remove('hidden');
    resultText.innerText = '';
    
    // анимация
    await new Promise(r => setTimeout(r, 1800));
    
    let password;
    if (Math.random() > 0.3) {
        password = generateBasedOnNick(nick);
    } else {
        password = getRandomPassword();
    }
    
    resultText.innerText = `пароль: ${password}`;
});

nicknameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') hackBtn.click();
});
