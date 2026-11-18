const puppeteer = require('puppeteer'); 
const { launch, getStream } = require('puppeteer-stream');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

// 🚀 SMART LOGO FINDER
let logoBase64 = '';
try {
    const files = fs.readdirSync(__dirname);
    const targetFile = files.find(f => f.toLowerCase().includes('logo'));
    if (targetFile) {
        const logoPath = path.join(__dirname, targetFile);
        const logoData = fs.readFileSync(logoPath);
        logoBase64 = `data:image/jpeg;base64,${logoData.toString('base64')}`;
        console.log(`✅ SUCCESS: '${targetFile}' mil gayi aur code mein load ho gayi!`);
    } else {
        console.error("❌ ALERT: Folder mein koi 'logo' wali file nahi mili!");
    }
} catch (err) {
    console.error("❌ Error reading logo:", err);
}

// 🚀 TERA FINAL HTML ENGINE 🚀
const myHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1080, height=1920, initial-scale=1.0">
    <title>12-Second Masterpiece Reel</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { margin: 0; padding: 0; background-color: #000; overflow: hidden; display: block; width: 1080px; height: 1920px; }
        .video-container { width: 1080px; height: 1920px; background-color: #000; font-family: 'Impact', sans-serif; position: absolute; top: 0; left: 0; overflow: hidden; margin: 0; box-shadow: none; border: none; }
        
        .header-top { position: absolute; top: 60px; width: 100%; display: flex; justify-content: center; align-items: center; gap: 30px; z-index: 20; animation: headerDrop 12s infinite; }
        .flag { width: 180px; height: 110px; border-radius: 8px; border: 3px solid #fff; display: flex; justify-content: center; align-items: center; font-size: 50px; color: white; box-shadow: 0 0 15px rgba(255,255,255,0.3); animation: floatFlag 3s ease-in-out infinite; }
        .flag-ind { background: linear-gradient(to bottom, #FF9933, #FFF, #138808); color: #000080; }
        .flag-nz { background: #00247D; border-color: red; }
        .vs-text { font-size: 75px; font-style: italic; font-weight: bold; background: linear-gradient(to bottom, #FFDF00, #D4AF37); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0px 5px 5px rgba(0,0,0,0.8)) drop-shadow(0px 0px 15px rgba(255,215,0,0.6)); animation: pulseVS 1.5s infinite alternate; margin: 0 20px; }
        
        .footer { position: absolute; bottom: 40px; width: 100%; display: flex; justify-content: space-around; align-items: center; z-index: 20; }
        
        .socials { display: flex; gap: 30px; }
        .icon { width: 70px; height: 70px; background: white; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 40px; opacity: 0; animation: flyInIcons 1.5s ease-out forwards; }
        .icon.fb { animation-delay: 0.2s; color: #1877F2; } 
        .icon.wa { animation-delay: 0.4s; color: #25D366; font-size: 45px; } 
        .icon.yt { animation-delay: 0.6s; color: #FF0000; } 
        .icon.ig { animation-delay: 0.8s; color: #E4405F; font-size: 45px; }
        
        .logo-container { display: flex; align-items: center; gap: 15px; }
        .logo-img { width: 110px; height: 110px; object-fit: contain; border-radius: 50%; border: 4px solid gold; background: #000; }
        .logo { background: #111; color: gold; border: 4px solid gold; border-radius: 15px; padding: 15px 30px; font-size: 40px; white-space: nowrap; }
        
        .scene-1 { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10; animation: scene1Visibility 12s infinite; }
        .s1-bg { position: absolute; width: 100%; height: 100%; object-fit: cover; opacity: 0.5; background: linear-gradient(to bottom, #1a1a1a, #000); z-index: 0; }
        .player-img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; animation: s1ImageAnim 12s infinite; z-index: 1; overflow: hidden; }
        .s1-text { position: absolute; top: 250px; font-size: 90px; color: #fff; writing-mode: vertical-rl; text-shadow: 2px 2px 0px #000, 0 0 20px red; letter-spacing: 20px; text-transform: uppercase; z-index: 3; }
        .s1-text.left { left: 40px; animation: s1LeftText 12s infinite; }
        .s1-text.right { right: 40px; animation: s1RightText 12s infinite; }
        .question-box { position: absolute; top: 1100px; left: 50%; transform: translateX(-50%); color: white; font-size: 110px; text-shadow: 0 0 15px black; white-space: nowrap; animation: s1QuestionBox 12s infinite; z-index: 4; }
        
        .scene-2 { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 5; opacity: 0; animation: scene2Visibility 12s infinite; }
        .s2-bg { position: absolute; width: 100%; height: 100%; object-fit: cover; opacity: 0.6; background: #002200; }
        .s2-text { position: absolute; top: 250px; font-size: 70px; color: #00ff00; writing-mode: vertical-rl; letter-spacing: 20px; text-transform: lowercase; text-shadow: 2px 2px 5px #000; }
        .s2-text.left { left: 40px; animation: s2LeftText 12s infinite; }
        .s2-text.right { right: 40px; animation: s2RightText 12s infinite; }
        
        .next-score-box { position: absolute; top: 230px; left: 50%; transform: translateX(-50%); width: 600px; background: rgba(0, 0, 0, 0.8); border: 5px solid #00ff00; text-align: center; padding: 15px; opacity: 0; animation: s2BoxAnim 12s infinite; z-index: 3; }
        .next-score-box h2 { color: #00ff00; font-size: 50px; letter-spacing: 5px; margin-bottom: 5px; }
        .next-score-box .runs { color: #fff; font-size: 70px; text-shadow: 0 0 10px #fff; }
        
        .score-pattern { position: absolute; top: 600px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 5px; z-index: 2; }
        .pattern-title { position: absolute; top: 1400px; left: 50%; transform: translateX(-50%); color: white; font-size: 55px; letter-spacing: 15px; opacity: 0; animation: s2TitleAnim 12s infinite; z-index: 2; }
        
        .score-item { display: flex; flex-direction: column; align-items: center; opacity: 0; }
        .arrow { color: #00ff00; font-size: 60px; font-family: Arial, sans-serif; }
        .num { color: white; font-size: 65px; font-weight: bold; }
        
        .item1 { animation: s2Item1 12s infinite; } 
        .item2 { animation: s2Item2 12s infinite; } 
        .item3 { animation: s2Item3 12s infinite; } 
        .item4 { animation: s2Item4 12s infinite; } 
        
        @keyframes pulseVS { 0% { transform: scale(1); filter: drop-shadow(0px 5px 5px rgba(0,0,0,0.8)) drop-shadow(0px 0px 10px rgba(255,215,0,0.4)); } 100% { transform: scale(1.15); filter: drop-shadow(0px 5px 5px rgba(0,0,0,0.8)) drop-shadow(0px 0px 30px rgba(255,215,0,1)); } }
        @keyframes floatFlag { 0%, 100% { transform: translateY(0) scale(1); box-shadow: 0 0 15px rgba(255,255,255,0.3); } 50% { transform: translateY(-15px) scale(1.05); box-shadow: 0 15px 30px rgba(255,255,255,0.7); } }
        
        @keyframes scene1Visibility { 0%, 41.6% { opacity: 1; visibility: visible; } 42%, 100% { opacity: 0; visibility: hidden; } }
        @keyframes scene2Visibility { 0%, 41.6% { opacity: 0; visibility: hidden; } 42%, 100% { opacity: 1; visibility: visible; } }
        @keyframes headerDrop { 0% { transform: translateY(-150px); opacity: 0; } 8%, 100% { transform: translateY(0); opacity: 1; } }
        
        @keyframes s1ImageAnim { 0% { transform: scale(1.15); opacity: 0; } 10% { transform: scale(1); opacity: 1; } 41.6% { transform: scale(1.08); opacity: 1; } 42%, 100% { opacity: 0; transform: scale(1.08); } }
        @keyframes s1LeftText { 0% { transform: translateX(-200px); opacity: 0; } 8% { transform: translateX(20px); opacity: 1; } 12%, 41.6% { transform: translateX(0); opacity: 1; } 42%, 100% { opacity: 0; } }
        @keyframes s1RightText { 0% { transform: translateX(200px); opacity: 0; } 8% { transform: translateX(-20px); opacity: 1; } 12%, 41.6% { transform: translateX(0); opacity: 1; } 42%, 100% { opacity: 0; } }
        @keyframes s1QuestionBox { 0% { transform: translateX(-50%) scale(0); opacity: 0; } 10% { transform: translateX(-50%) scale(1.1); opacity: 1; } 12%, 41.6% { transform: translateX(-50%) scale(1); opacity: 1; } 42%, 100% { opacity: 0; transform: translateX(-50%) scale(1); } }

        @keyframes s2LeftText { 0%, 41.6% { transform: translateX(-150px); opacity: 0; } 45%, 100% { transform: translateX(0); opacity: 1; } }
        @keyframes s2RightText { 0%, 41.6% { transform: translateX(150px); opacity: 0; } 45%, 100% { transform: translateX(0); opacity: 1; } }
        
        @keyframes s2Item1 { 0%, 45% { opacity: 0; transform: translateY(50px); } 48%, 100% { opacity: 1; transform: translateY(0); } } 
        @keyframes s2Item2 { 0%, 48% { opacity: 0; transform: translateY(50px); } 51%, 100% { opacity: 1; transform: translateY(0); } } 
        @keyframes s2Item3 { 0%, 51% { opacity: 0; transform: translateY(50px); } 54%, 100% { opacity: 1; transform: translateY(0); } } 
        @keyframes s2Item4 { 0%, 54% { opacity: 0; transform: translateY(50px); } 57%, 100% { opacity: 1; transform: translateY(0); } } 

        @keyframes s2BoxAnim { 0%, 57% { transform: translateX(-50%) scale(0.5); opacity: 0; } 60% { transform: translateX(-50%) scale(1.05); opacity: 1; } 62%, 100% { transform: translateX(-50%) scale(1); opacity: 1; } }
        
        @keyframes s2TitleAnim { 0%, 42% { opacity: 0; letter-spacing: 50px; } 48%, 100% { opacity: 1; letter-spacing: 15px; } }

        @keyframes flyInIcons {
            0% { transform: translateX(-350px) translateY(150px) rotate(-360deg) scale(0.1); opacity: 0; }
            70% { transform: translateX(15px) translateY(-10px) rotate(15deg) scale(1.1); opacity: 1; }
            100% { transform: translateX(0) translateY(0) rotate(0deg) scale(1); opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="video-container">
        <div class="header-top">
            <div class="flag flag-ind" id="flag1">IND</div>
            <div class="vs-text">V/S</div>
            <div class="flag flag-nz" id="flag2">AUS</div>
        </div>
        
        <div class="footer">
            <div class="socials">
                <div class="icon fb"><i class="fab fa-facebook-f"></i></div>
                <div class="icon wa"><i class="fab fa-whatsapp"></i></div>
                <div class="icon yt"><i class="fab fa-youtube"></i></div>
                <div class="icon ig"><i class="fab fa-instagram"></i></div>
            </div>
            
            <div class="logo-container">
                <img src="${logoBase64}" class="logo-img" alt="CCN LOGO">
                <div class="logo">CCN LOGIC</div>
            </div>
        </div>

        <div class="scene-1">
            <div class="s1-bg"></div>
            <div class="player-img">
                <img id="bg-img" src="https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=500" style="width: 100%; height: 100%; object-fit: cover; object-position: top; transform: translateY(100px) scale(0.9); filter: brightness(0.65);">
            </div>
            <div class="s1-text left" id="p-name1">PLAYER</div>
            <div class="s1-text right" id="p-name2">NAME</div>
            <div class="question-box">Agla score kya hoga?</div>
        </div>

        <div class="scene-2">
            <div class="s2-bg"></div>
            <div class="s2-text left" id="p-name3">player</div>
            <div class="s2-text right" id="p-name4">name</div>
            
            <div class="next-score-box">
                <h2>NEXT SCORE</h2>
                <div class="runs" id="runs-txt">15~ Runs</div>
            </div>

            <div class="score-pattern">
                <div class="score-item item4"><div class="arrow">&#9650;</div><div class="num" id="pat4">45</div></div>
                <div class="score-item item3"><div class="arrow">&#9650;</div><div class="num" id="pat3">04</div></div>
                <div class="score-item item2"><div class="arrow">&#9650;</div><div class="num" id="pat2">15</div></div>
                <div class="score-item item1"><div class="arrow">&#9650;</div><div class="num" id="pat1">38</div></div>
            </div>
            <div class="pattern-title">P A T T E R N</div>
        </div>
    </div>
</body>
</html>
`;

async function startRendering() {
    const duration = 12; 
    const recordDuration = duration + 1.5; 
    const fileName = `ccn_logic_final_${Date.now()}.mp4`;

    console.log("🚀 Setup start ho raha hai...");

    try {
        const browser = await launch({
            executablePath: puppeteer.executablePath(),
            headless: true, 
            defaultViewport: { width: 1080, height: 1920 },
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox', 
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--window-size=1080,1920', 
                '--force-device-scale-factor=1',
                '--hide-scrollbars'
            ]
        });
        
        const page = await browser.newPage();
        
        console.log("⏳ HTML load ho raha hai...");
        
        const pausedHtml = myHtml.replace('</head>', '<style id="freeze-anim"> * { animation-play-state: paused !important; } </style></head>');
        await page.setContent(pausedHtml, { waitUntil: 'networkidle0', timeout: 90000 });

        console.log("🎥 Camera Action! Recording shuru...");
        const stream = await getStream(page, { audio: false, video: true, videoBitsPerSecond: 15000000, frameSize: 60 });

        ffmpeg(stream)
            .inputFormat('webm')
            .outputOptions([
                '-c:v libx264', 
                '-preset medium', 
                '-crf 20', 
                '-pix_fmt yuv420p', 
                '-r 60', 
                '-vsync cfr', 
                `-t ${recordDuration}`
            ])
            .save(`./${fileName}`)
            .on('end', async () => {
                console.log(`✅ SUCCESS! Video ban gayi: ${fileName}`);
                await browser.close();
                process.exit(0);
            })
            .on('error', async (err) => {
                console.error("❌ FFmpeg Error:", err);
                await browser.close();
                process.exit(1);
            });

        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("🎬 ACTION! Animation Unfreeze!");
        await page.evaluate(() => {
            const style = document.getElementById('freeze-anim');
            if (style) style.remove();
        });

    } catch (err) {
        console.error("❌ Crash ho gaya:", err);
        process.exit(1);
    }
}

startRendering();
