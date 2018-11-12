import React, { useState, useEffect, useReducer } from 'react'

export default function Player(props) {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <div className="Pattern">
            {props.children}
        </div>
    )
}