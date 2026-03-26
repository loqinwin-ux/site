const statusEl = document.getElementById('status');
const onlineEl = document.getElementById('online');

async function fetchServerStatus() {
    try {
        const res = await fetch('https://api.mcsrvstat.us/2/play.example.com');
        const data = await res.json();
        
        if(data.online) {
            statusEl.textContent = '✅ онлайн';
            onlineEl.textContent = data.players.online || '0';
        } else {
            statusEl.textContent = '⛔ офлайн';
            onlineEl.textContent = '0';
        }
    } catch(e) {
        statusEl.textContent = '❌ ошибка';
        onlineEl.textContent = '?';
    }
}

document.getElementById('copyBtn').addEventListener('click', () => {
    const ip = 'play.example.com';
    navigator.clipboard.writeText(ip);
    alert('IP скопирован: ' + ip);
});

fetchServerStatus();
setInterval(fetchServerStatus, 30000);
