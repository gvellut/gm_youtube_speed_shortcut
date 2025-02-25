// ==UserScript==
// @name         Easier video speed setting
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  It's all in the title
// @author       RaresGeo
// @match        *://www.youtube.com/*
// @grant        none
// ==/UserScript==

(() => {
    let speed = 1;
    const hotkeys = {
        DECREASE: "KeyZ",
        RESET: "KeyX",
        INCREASE: "KeyC",
        MAX: "KeyV",
    };


    const setSpeed = (speed) => {
        let videos = document.getElementsByClassName("html5-main-video");
        for (let i = 0; i < videos.length; i++) {
            videos[i].playbackRate = speed;
        }
        console.log(`New speed is ${speed}x`);
    };

    const afterNavigate = () => {
        if ("/watch" === location.pathname) {
            setSpeed(speed);
        }
    };

    (document.body || document.documentElement).addEventListener(
        "transitionend",
        function (/*TransitionEvent*/ event) {
            if (event.propertyName === "transform" && event.target.id === "progress") {
                afterNavigate();
            }
        },
        true
    );

    document.onkeydown = function (e) {
        if (e.ctrlKey && e.shiftKey && Object.values(hotkeys).includes(e.code)) {
            switch (e.code) {
                case hotkeys.DECREASE:
                    speed -= 0.25;
                    speed = speed <= 0.1 ? 0.1 : speed;
                    break;
                case hotkeys.RESET:
                    speed = 1;
                    break;
                case hotkeys.INCREASE:
                    speed = 1.75;
                    break;
                case hotkeys.MAX:
                    speed = 2;
                    break;
            }

            if (speed !== null) {
                setSpeed(speed);
            }
        }
    };

    // After page load
    afterNavigate();
})();