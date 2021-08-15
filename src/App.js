import React from 'react';
import Slider from './components/slider';
import './styles/app.scss';

const Name = () => {
    return <div className="product-name">BIG DICK IS GOOD</div>;
};

const App = () => {
    return (
        <div style={{ width: '100vw' }}>
            <Slider component={<Name />} />
        </div>
    );
};

export default App;
