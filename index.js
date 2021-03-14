const durationInput = document.querySelector('#duration');  //input for time
const startButton = document.querySelector('#start');  //play button
const pauseButton = document.querySelector('#pause');  //pause button
const circle = document.querySelector('circle');  //circle element
const perimeter = circle.getAttribute('r') * 2 * Math.PI; //perimeter of the circle
/*stroke-dasharray is set to be equal to the perimeter initially, 
so that we can reduce the border gradually with the time */
circle.setAttribute('stroke-dasharray', perimeter);
let duration;

// creating a Timer object 
const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(totalDuration) {
        duration = totalDuration;
    },
    onTick(timeRemaining) {
        /*stroke-dashoffset puts a space on the border and gives the circle a clock-like animation while reducing the time.

        to animate the clock properly, we need to add negative values to stroke-dashoffset attribute as positive
        values would add space counter-clockwisely.

        The logic to animate the border evenly
        ******************************************
        Initially => stroke-dasharray == perimeter, stroke-dashoffset == 0
        when the clock finishes ticking => stroke-dasharray == perimeter, stroke-dashoffset == -perimeter

        so, if the perimeter is 100 and the clock has 50s to run, we need to adjust the offset by
        -1*(100/50) = -2 each second to be equal to be equal to -100 at the end

        so our logic should be like this
        if total duration is 50 seconds,
        offset at start = p*50/50-p
        offset at end = p*0/50-p, since total duration will gradually reduce, at the end we have 0 seconds to run
        */
        circle.setAttribute('stroke-dashoffset', perimeter * timeRemaining / duration - perimeter);
    },
    onComplete() {
        console.log('Timer is completed');
    }
});
