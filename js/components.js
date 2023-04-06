const navbar = function () {
    return {
        open: false,
        entries: [
            { name: 'home', targetSection: '#home' },
            { name: 'about', targetSection: '#about' },
            { name: 'skills', targetSection: '#skills' },
            { name: 'experience', targetSection: '#experience' },
            { name: 'contact', targetSection: '#contact' },
        ],
    };
};
window.$navbar = navbar;

const home = function () {
    let $refs;

    return {
        setup(refs) {
            $refs = refs;
        },
        async fireworks(durationInSeconds) {
            const duration = durationInSeconds * 1000;
            const end = Date.now() + duration;

            (function frame() {
                // launch a few confetti from the left edge
                window.confetti({
                    particleCount: 7,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                });
                // and launch a few from the right edge
                window.confetti({
                    particleCount: 7,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                });

                // keep going until we are out of time
                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            })();
        },
        // Based on:
        // https://stackoverflow.com/a/30358006/2251135
        play() {
            this.showVideo = true;
            $refs.youtubeEmbeddedVideo.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        },
        hide() {
            this.showVideo = false;
            $refs.youtubeEmbeddedVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        },
        showVideo: false,
    };
};
window.$home = home;

const skills = function () {
    return {
        languages: [
            {
                name: 'HTML',
                image: './images/html5.svg',
                description:
                    'HTML is essential for creating web content with a wide range of applications, constantly evolving to meet changing needs and remaining vital.',
            },
            {
                name: 'CSS',
                image: './images/css.svg',
                description: 'CSS is critical for creating visually appealing and consistent web designs across devices and platforms.',
            },
            {
                name: 'JavaScript',
                image: './images/js.svg',
                description:
                    'JavaScript has grown to become one of the most popular programming languages in the world, with a large and active developer community.',
            },
        ],
        async load() {
            const res = await fetch('https://nextjs-red-six-46.vercel.app/api/wakatime/petersud', { method: 'GET' });
            const stats = await res.json();
            const { data } = stats;
            const languagesIWant = ['HTML', 'CSS', 'JavaScript'];
            const languageStatsList = data.languages.filter(l => languagesIWant.indexOf(l.name) !== -1);
            for (let i = 0; i < languageStatsList.length; i++) {
                const languageStats = languageStatsList[i];
                const targetLanguage = this.languages.find(l => l.name === languageStats.name);
                targetLanguage.hours = languageStats.hours;
                targetLanguage.decimal = languageStats.decimal;
            }
        },
        progress(language) {
            const percentage = (language.decimal / 320) * 100;
            return `${percentage}%`;
        },
    };
};
window.$skills = skills;

const experience = function () {
    return {
        entries: [
            {
                place: 'Cyber Club in Ensign College',
                date: 'Jun 2022 - On-going',
                description: `
                <p>
                    I am currently enrolled in Cyber Club at Ensign College in Salt Lake City, UT, with a focus on cybersecurity and vulnerability testing.
                    I have gained valuable hands-on experience in project implementation, troubleshooting technical issues,
                    and collaboration on cybersecurity projects. Furthermore, I am dedicated to conducting thorough research and analysis to develop
                    effective strategies for defense and prevention against cybersecurity threats and emerging trends.
                </p>
                `,
            },
            {
                place: 'Premier Truck Group',
                date: 'Jan 2019 - Jan 2023',
                description: `
                <p>
                    At PTG in West Valley, UT, I worked as a Dispatch Operator, where I maintain and update detailed records of calls,
                    prepare documentation, and assign personnel using CDK software.
                    I closely monitor the dispatch board to prioritize over 50 daily calls and facilitate
                    communication between customers and field personnel. Additionally, I investigate and resolve customer or shipper complaints.
                </p>
                `,
            },
            {
                place: 'Military Police of Ceará',
                date: 'Set 2010 - Aug 2018',
                description: `
                <p>
                    As a diligent security officer, I ensured 24/7 force protection at base entry points, thoroughly reviewing identifications, searching vehicles, and verifying deliveries before granting entrance to secure areas.
                    I also took task of setting up new computers and mobile devices in accordance with internal policies, ensuring the safety and security of the police department's data.
                    I always made sure to bring a smile to my Police Office mates' faces while planning, scheduling, and supervising their work.
                </p>
                `,
            },
        ],
    };
};

window.$experience = experience;
