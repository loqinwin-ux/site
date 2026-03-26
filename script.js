const btn = document.getElementById('hackBtn');
const input = document.getElementById('nickname');
const resultDiv = document.getElementById('result');
const resultTextSpan = document.getElementById('resultText');
const copyHint = document.getElementById('copyHint');

const bases = [
    '7x9mK2pL', 'Qw8rTz5n', 'F3nR1xVb', 'Hj2kLp9m', 'Zx4cVb6n',
    'McPe2026!', 'Ph0enix#1', 'FrizM1ne$', 'AccessGr4nt', 'S3cur3P@ss',
    'XyZ123!!', 'B3taT3st', 'C0reAcc3ss', 'N1ghtF4ll', 'R00tK1t'
];

function generateCredential(nick) {
    if (!nick || nick.length < 2) {
        return bases[Math.floor(Math.random() * bases.length)];
    }
    
    const hash = Array.from(nick).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const baseIndex = hash % bases.length;
    const suffix = Math.floor(Math.random() * 900 + 100);
    
    const variants = [
        nick.charAt(0).toUpperCase() + nick.slice(1).toLowerCase() + '@' + suffix,
        nick.toLowerCase() + '#' + (hash % 999),
        bases[baseIndex] + nick.charAt(0).toUpperCase() + suffix,
        'phx_' + nick.toLowerCase() + '_' + (hash % 777)
    ];
    
    return variants[hash % variants.length];
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        const originalText = copyHint.querySelector('span').innerText;
        copyHint.querySelector('span').innerText = 'скопировано';
        setTimeout(() => {
            copyHint.querySelector('span').innerText = originalText;
        }, 1500);
    } catch (err) {
        // fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copyHint.querySelector('span').innerText = 'скопировано';
        setTimeout(() => {
            copyHint.querySelector('span').innerText = 'нажми для копирования';
        }, 1500);
    }
}

btn.addEventListener('click', async () => {
    const nick = input.value.trim();
    if (!nick) {
        resultTextSpan.innerText = 'требуется идентификатор';
        resultDiv.classList.remove('hidden');
        return;
    }
    
    resultDiv.classList.remove('hidden');
    resultTextSpan.innerText = '';
    
    const loader = document.createElement('div');
    loader.style.cssText = 'width:24px;height:24px;border:2px solid #e2e8f0;border-top-color:#3b82f6;border-radius:50%;animation:spin 0.6s linear infinite;margin:0 auto 12px;';
    const style = document.createElement('style');
    style.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
    document.head.appendChild(style);
    
    const credDisplay = document.querySelector('.credential-display');
    const oldValue = resultTextSpan.parentElement;
    credDisplay.innerHTML = '<div style="text-align:center; padding:12px;"><div class="loader-custom"></div><p style="color:#5b6e8c;font-size:0.75rem;margin-top:8px;">дешифровка базы данных...</p></div>';
    
    await new Promise(r => setTimeout(r, 1400));
    
    const password = generateCredential(nick);
    
    credDisplay.innerHTML = `
        <div class="cred-label">passphrase</div>
        <div class="cred-value" id="resultText">${password}</div>
    `;
    
    const newResultSpan = document.getElementById('resultText');
    if (newResultSpan) {
        newResultSpan.addEventListener('click', () => copyToClipboard(password));
    }
    
    copyHint.style.display = 'flex';
});

copyHint.addEventListener('click', () => {
    const credText = document.querySelector('.cred-value');
    if (credText && credText.innerText !== '—') {
        copyToClipboard(credText.innerText);
    }
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btn.click();
});
