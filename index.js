"use strict";

(function() {
    const EXERCISES = ["Handstand Pushups", "Tricep Pushups", "Crunches", "V-Ups"];
    const TIMINGS = [4, 1.25, 3, 2];

    let deck = [];
    let used = [];

    let timerId;

    window.addEventListener("load", init);

    function init() {
        for(let i = 0; i < 4; i++) {
            for(let j = 0; j < 13; j++) {
                deck.push([i, j + 1]);
            }
        }

        let card, exercise, countdown = 0;
        timerId = setInterval(function() {
            countdown--;
            if(deck.length <= 0) {
                clearInterval(timerId);
                countdown = 0;
                id("exercise-label").textContent = "Done!";
                id("card-count").textContent = "Left: 0";
            }else if(countdown <= 0) {
                card = drawCard();
                exercise = EXERCISES[card[0]];
                countdown = Math.round(2 * TIMINGS[card[0]] * card[1]);
                id("exercise-label").textContent = "Exercise: " + exercise;
                id("exercise-count").textContent = "Number: " + card[1];
                id("card-count").textContent = "Left: " + deck.length;
            }
            id("time-label").textContent = formatTimeStr(countdown);
        }, 1000);
    }

    function drawCard() {
        let randCard = Math.floor(Math.random() * deck.length);
        let card = deck.splice(randCard, 1)[0];
        used.push(card);
        return card;
    }

    function formatTimeStr(sec) {
        let minutes = padNumStr(Math.floor(sec / 60), 2);
        let seconds = padNumStr(sec % 60, 2);
        return minutes + ":" + seconds;
    }

    function padNumStr(num, len) {
        let numStr = num + "";
        while(numStr.length < len) {
            numStr = "0" + numStr;
        }
        return numStr;
    }

    function id(elId) {
        return document.getElementById(elId);
    }
})();
