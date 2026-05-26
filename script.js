const localization = {
    aboutTitle: { en: "About Me", ja: "About Me", zh: "About Me" },
    aboutText: {
        en: "Hi, and nice to meet you, I'm Ray, aka @its_um_ray. I'm a 15 year old student from Japan 🇯🇵. I'm SUPER passionate on well designed products, photography, videography, cars, specialized stationery, vibe coding and music. These are all my hobbies/extracurricular activities meant to enhance myself and gain new skills. This website is the central of all my projects and media, so feel free to look around! 👋",
        ja: "こんにちは、初めまして@its_um_rayという名前で活動している令依（れい）です。日本に住んでいる１５歳の学生です！主にデザイン性に優れたプロダクト、写真、映像、車、こだわりの筆記具、AIを用いたバイブコーディング、 tender音楽に情熱を持っています。これらはすべて、自分自身を将来のために高めて、新しいスキルを身につけるための趣味兼課外活動です。このウェブサイトは、僕のすべてのプロジェクトやメディアの拠点的な立ち位置となっています。ぜひ自由に見にいってください！👋",
        zh: "你好，很高兴认识你！我是以 @its_um_ray 的名字活跃的令依（レイ）。一名住在日本的 15 岁 student！我主要对极具设计感的产品、摄影、影像、汽车、讲究的文具、利用 AI 编程 (vibe coding) 以及音乐怀有热忱。这些全都是为了我未来提升自我、获取新技能的爱好兼课外活动。这个网站是我所有项目和社交媒体的中心据点。欢迎随便逛逛！👋"
    },
    cards: [
        { title: "Instagram", icon: "ri-instagram-line", url: "https://www.instagram.com/its_um_ray/", desc: { en: "Street photography, product shoots, and reels sometimes.", ja: "ストリートスナップ、物撮り、時々リールも。", zh: "街头摄影、静物拍摄，偶尔也发 Reels。" } },
        { title: "X (Twitter)", icon: "ri-twitter-x-line", url: "https://x.com/its_um_ray/", desc: { en: "Random thoughts, design inspiration, and daily updates.", ja: "思いついたこと、デザインのインスピレーション、つぶやきなど適当に。", zh: "随性想法、设计灵感与日常杂谈。" } },
        { title: "note", icon: "ri-pencil-line", url: "https://note.com/its_um_ray/", desc: { en: "Deep dives into my hobbies, gear reviews, and personal essays.", ja: "趣味の深掘り、ガジェットや機材のレビュー、テキストベースの記録。", zh: "兴趣深挖、数码器材测评与文字记录。" } },
        { title: "YouTube", icon: "ri-youtube-line", url: "https://www.youtube.com/@Its_um_ray", desc: { en: "Not much content yet, still working for it.", ja: "まだコンテンツはあまりないです。まだ準備中です。", zh: "还没什么内容，还在筹备中。" } },
        { title: "Spotify", icon: "ri-spotify-line", url: "YOUR_ACTUAL_SPOTIFY_LINK_HERE", desc: { en: "My own playlist that I'm listening now", ja: "今聴いてるお気に入りのプレイリスト。", zh: "我现在正在听的私房歌单。" } },
        { title: "Mercari", icon: "ri-box-3-line", url: "https://jp.mercari.com/user/profile/815155489", desc: { en: "Passing on well-loved gear, high-end stationery, and tech. Trying out reselling so might be selling random stuff lol.", ja: "こだわりのガジェット、筆記具、周辺機器などの私物整理。せどりの練習もしているので意味わからないもの出品してる可能性あり笑。", zh: "宝贝数码、高端文具 and 配件の私物整理。也在练习倒买倒卖（Reselling），所以可能会挂一些莫名其妙的东西笑。" } },
        { title: "Musescore", icon: "ri-music-2-line", url: "https://musescore.com/user/71634715", desc: { en: "My own musical arrangements, transcriptions, and compositions.", ja: "自分で作成した楽譜のアレンジ、耳コピの記録、創作物。", zh: "个人乐谱编配、听音扒谱记录与音乐创作。" } },
        { title: "GitHub", icon: "ri-github-line", url: "https://github.com/itsumray", desc: { en: "All my vibe coding stuff. Repos for my websites and random stuff.", ja: "AIを活用したバイブコーディングで制作したウェブサイトなどのコーディング拠点。", zh: "所有的氛围感编程产物。存放我的网站以及各种随机玩意的代码库。" } }
    ]
};

let currentLang = 'en';

window.addEventListener('DOMContentLoaded', () => {
    renderContent();
    document.getElementById('btn-en').classList.add('active');

    fetch('./feed.json')
        .then(res => res.json())
        .then(data => { setupMarquee(data.images); })
        .catch(() => { setupMarquee(["assets/pfp.jpg"]); });

    document.getElementById('bgMarquee').style.opacity = "1";

    setTimeout(() => {
        document.body.classList.remove('intro-active');

        // Glides from top-right down into center modal layout exactly 1.5s after page settles
        setTimeout(() => {
            document.getElementById('langOverlay').classList.remove('hidden');
            const topNav = document.getElementById('topNav');
            topNav.classList.add('visible', 'in-modal-mode');
        }, 1500);

    }, 2000);
});

function setupMarquee(images) {
    const track = document.getElementById('marqueeTrack');
    const tripleImages = [...images, ...images, ...images]; 
    track.innerHTML = tripleImages.map(img => `<img src="${img}" alt="Marquee Content">`).join('');
}

function selectLanguage(lang) {
    currentLang = lang;
    
    // Smoothly clear the dark backdrop blur
    document.getElementById('langOverlay').classList.add('hidden');
    
    // Snap out of modal layout to fly directly up to top right
    const topNav = document.getElementById('topNav');
    topNav.classList.remove('in-modal-mode');
    
    ['en', 'ja', 'zh'].forEach(l => document.getElementById(`btn-${l}`).classList.remove('active'));
    document.getElementById(`btn-${lang}`).classList.add('active');

    renderContent();
}

function renderContent() {
    document.getElementById('aboutText').innerText = localization.aboutText[currentLang];
    
    const grid = document.getElementById('linksGrid');
    grid.innerHTML = '';

    localization.cards.forEach(card => {
        const wrapper = document.createElement('div');
        wrapper.className = 'link-card-wrapper';
        wrapper.innerHTML = `
            <div class="link-card" onclick="toggleCard(this)">
                <div class="card-summary">
                    <div class="card-title-block">
                        <i class="${card.icon}"></i>
                        <span>${card.title}</span>
                    </div>
                    <span>↓</span>
                </div>
                <div class="card-detail">
                    <p>${card.desc[currentLang]}</p>
                    <a href="${card.url}" target="_blank" class="visit-btn">Launch →</a>
                </div>
            </div>
        `;
        grid.appendChild(wrapper);
    });
}

function toggleCard(cardElement) {
    const wrapper = cardElement.parentElement;
    const isExpanded = wrapper.classList.contains('expanded');
    
    document.querySelectorAll('.link-card-wrapper').forEach(w => w.classList.remove('expanded'));
    
    if (!isExpanded) {
        wrapper.classList.add('expanded');
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        killArrow();
    }
}

function killArrow() {
    const arrow = document.getElementById('guideArrow');
    if (arrow) arrow.remove();
}
