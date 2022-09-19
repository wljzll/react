

import React from 'react';
import ReactDOM from 'react-dom/client';
import Counter1 from './components/Counter1';
import Counter2 from './components/Counter2';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <Counter1 />
        <Counter2 />
    </div>
);

// ReactDOM.render(<Counter1 />, document.getElementById('root'));