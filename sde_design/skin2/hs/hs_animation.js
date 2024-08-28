const header = document.querySelector('#header .header');
const wrap = document.getElementById('brandWr'); // 보일 영역
const container = document.getElementsByClassName('brandSec');

const scrollElements = document.querySelectorAll(".ani_load");
const delays = document.querySelectorAll('.tran_delay');

if (delays.length > 0) {
    for (let delay of delays) {
        const anis = delay.querySelectorAll('.ani_load');
        anis.forEach((ani, idx) => {
            ani.style.transitionDelay = `${(idx * 1.5) / 10}s`
        });
    }
}

const fadeKeyFrame = [
    {opacity: 0},
    {opacity: 0.5},
    {opacity: 1}
];
const bttKeyFrame = [
    {opacity: 0, transform: "translate(0, 50px)"},
    {opacity: 0.5},
    {opacity: 1, transform: "translate(0, 0)"}
];
const aniOpt = {
    delay: 0,
    duration: 500,
    easing: "ease-in",
    fill: "forwards"
};

window.onload = () => {
    const sec01 = wrap.querySelector('.sec01');
    const sec01ani01 = sec01.querySelector('.ani01');
    const sec01ani02 = sec01.querySelector('.ani02');
    const sec01ani03 = sec01.querySelector('.ani03');
    const sec01ani04 = sec01.querySelector('.ani04');
    const sec01ani05 = sec01.querySelector('.ani05');

    const fillKeyFrame = [
        {height: 0, opacity: 1},
        {height: '50%', opacity: 1},
        {height: '100%', opacity: 1}
    ];

    sec01ani01.animate(bttKeyFrame, aniOpt).onfinish = () => {
        sec01ani02.animate(bttKeyFrame, aniOpt).onfinish = () => {
            sec01ani03.animate(fadeKeyFrame, aniOpt).onfinish = () => {
                sec01ani04.animate(fillKeyFrame, aniOpt).onfinish = () => {
                    sec01ani05.animate(bttKeyFrame, aniOpt)
                };
            };
        };
    };
};

window.onscroll = function(){
    const aniLoads = document.querySelectorAll('.ani_load');
    aniLoads.forEach(function(aniLoad){
        const otop = window.pageYOffset + aniLoad.getBoundingClientRect().top;
        const wtop = window.scrollY + (window.innerHeight * 0.8);

        if (wtop > otop) {
            aniLoad.classList.add("play");
        } else {
            aniLoad.classList.remove("play");
        }

    });
};