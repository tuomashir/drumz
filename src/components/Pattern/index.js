import React, { useState, useEffect, useReducer } from 'react'

export default function Pattern(props) {
    const { children } = props;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { length: props.length })
    );
    return (
        <div className="Pattern">
            { childrenWithProps }
        </div>
    )
}