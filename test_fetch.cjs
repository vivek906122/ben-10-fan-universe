// test_fetch.cjs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fs = require('fs');
const path = require('path');

const targets = [
    { url: 'https://upload.wikimedia.org/wikipedia/en/2/23/Gwen_Tennyson.png', name: 'gwen.png' },
    { url: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Max_Tennyson.png', name: 'max.png' }
];

async function dl() {
    for (const t of targets) {
        try {
            const res = await fetch(t.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                    'Accept': 'image/avif,image/webp,*/*'
                }
            });
            console.log(`Status for ${t.name}:`, res.status);
            if (res.ok) {
                const buffer = await res.arrayBuffer();
                fs.writeFileSync(path.join(process.cwd(), `public/images/${t.name}`), Buffer.from(buffer));
                console.log(`Saved ${t.name}! size:`, buffer.byteLength);
            }
        } catch (e) {
            console.error(e);
        }
    }
}
dl();
