import React from 'react';

export default function Beat(props) {
    const style = {
        Beat: {
            background: '',
            border: '2px solid black',
            borderRadius: '26px',
            cursor: 'pointer',
            height: '50px',
            transition: '0.3s',
            width: '50px',
        }
    }
    if (props.playing) {
        style.Beat.background = 'yellow';
    }
    else if (props.active) {
        style.Beat.background = 'red';
    }
    else {
        style.Beat.background = 'white';
    }
    return (
        <div style={style.Beat} onClick={props.onClick}></div>
    )
}