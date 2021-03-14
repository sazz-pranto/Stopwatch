class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        //these callbacks are optional, so checking if they are being passed with the instance
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }
    
    // arrow function has been used for start(), pause() and tick() to set the value of this to the instance of the Timer class 
    start = () => {
        //onStart method helps animate the clock properly informing the remaining time
        if (this.onStart) {
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.interval = setInterval(this.tick, 20);
    }

    pause = () => {
        clearInterval(this.interval);
    }

    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            //setter function is being called when timeRemaining is being updated (at the left)
            //getter is being called when value is needed to set a new value (at the right of the assignment operator)
            this.timeRemaining = this.timeRemaining - .02;  //no need to call this.timeRemaining() with parentheses as set and get allows it to use as a property of this object
            //onTick method helps animate the clock properly informing the remaining time
            if (this.onTick) {
                this.onTick(this.timeRemaining);
            }
        }
    }

    get timeRemaining() {
        //getting the remaining time from the input element
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        /*sending the time to the input element after reducing the elapsed time(each second, reduced in milliseconds)
        with the help of setInterval() in tick() method*/
        this.durationInput.value = time.toFixed(2);
    }
}