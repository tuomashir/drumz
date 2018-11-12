export default class Clock {
    intervalTime = 100;
    tempo = 90;
    listeners = [];
    isPlaying = false;
    current16thNote;
    nextNoteTime = 0.0;
    noteResolution = 0;
    scheduleAheadTime = 0.1;
    noteLength = 0.05;
    swing = 0;
    constructor(audioContext) {
        this.audioContext = audioContext;
    }

    start() {
        this.isPlaying = true;
        this.current16thNote = 15;
        this.nextNoteTime = this.audioContext.currentTime;
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.schedule();
        }, this.intervalTime);
    }

    stop() {
        this.isPlaying = false;
        clearInterval(this.interval);
    }

    nextNote() {
        // Advance current note and time by a 16th note...
        const secondsPerBeat = 60.0 / this.tempo;    // Notice this picks up the CURRENT
                                            // tempo value to calculate beat length.
        this.nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time

        this.current16thNote++;    // Advance the beat number, wrap to zero
        if (this.current16thNote === 16) {
            this.current16thNote = 0;
        }
    }

    schedule() {
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime ) {
            this.nextNote();
            // Calculate swing
            let nextNoteWithSwing = this.nextNoteTime;
            if (this.swing > 0 && (this.current16thNote+1) % 2 === 0) {
                nextNoteWithSwing += this.swing / 10 * 0.25 * 60.0 / this.tempo;
            }
            this.listeners.map(listener => {
                listener.call(
                    undefined,
                    this.current16thNote,
                    nextNoteWithSwing,
                )
            });
        }
    }

    registerListener(listener) {
        if (!this.listeners.includes(listener)) {
            this.listeners.push(listener);
        }
        return () => {
            this.listeners.splice(this.listeners.indexOf(listener), 1);
        }
    }

    setTempo(tempo) {
        this.tempo = tempo;
    }

    getTempo() {
        return this.tempo;
    }

    setSwing(swing) {
        this.swing = swing;
    }

    getSwing() {
        return this.swing;
    }
}