import React, { useState, useEffect } from 'react';
import Beat from '../Beat'

const styles = {
    Track: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}

export default function Track(props) {
    const [beats, setBeats] = useState(
        [...Array(props.length)].map((val, i) => {
            return {
                beat: i+1,
                active: false,
            }
        })
    );

    const [currentBeat, setCurrentBeat] = useState(0);

    let playSource = props.createSource();
    useEffect(() => {
        const removeListener = props.clock.registerListener((currentBeat, time) => {
            setCurrentBeat(currentBeat);
            if (!beats[currentBeat].active) {
                return;
            }
            playSource(time);
            // Create source for next sound in advance
            playSource = props.createSource();
        });

        return () => {
            removeListener();
        }
    }, [props.key]);

    function toggleBeat(beat) {
        beats[beat-1].active = !beats[beat-1].active;
        setBeats(beats);
    }

    return (
        <div style={styles.Track}>
            { beats.map(beat => <Beat key={props.id + beat.beat} active={beat.active} playing={currentBeat===beat.beat} onClick={() => toggleBeat(beat.beat)} />) }
        </div>
    )
}