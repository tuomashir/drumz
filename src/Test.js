import React, { useState } from 'react'

export default function test() {
    const [val, setVal] = useState('moi');
setTimeout(() => setVal('jou'), 2000);
    return (
        <div>{val}</div>
    )
}