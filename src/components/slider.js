import React, { useEffect, useRef, useState } from 'react';

const Item = ({ component, width, leftOfLast, index }) => {
    const ref = useRef(null);
    const left = useRef(index * width);

    const [leftPos, setLeftPos] = useState(left.current);

    useEffect(() => {
        const calculateLeft = () => {
            if (left.current < -width) {
                left.current = leftOfLast;
                console.log('left', left.current);
                // ref.current.style.height = '0';
                setLeftPos(left.current);
                setTimeout(calculateLeft, 2);
                return;
            }
            left.current -= 1;
            setLeftPos(left.current);
            // ref.current.style.height = 'auto';
            setTimeout(calculateLeft, 2);
        };
        console.log('left', left.current);
        // setTimeout(calculateRight, 10);
        calculateLeft();

        return () => {
            clearTimeout(calculateLeft);
        };
    }, [leftOfLast, width]);

    return (
        <div style={{ left: leftPos, top: 0 }} ref={ref} className="slider-item">
            {component}
        </div>
    );
};

const Slider = ({ component }) => {
    const compRef = useRef(null);
    const containerRef = useRef(null);
    const visibleRef = useRef(null);

    const [width, setWidth] = useState(0);

    const [items, setItems] = useState([]);

    const buildSliderItems = () => {
        const borderItems = 2;
        const count = Math.floor(visibleRef.current.getBoundingClientRect().width / width);
        console.log('len', visibleRef.current.getBoundingClientRect().width, width);
        const result = [];
        const leftOfLast = (count + borderItems) * width - width;
        for (let i = 0; i < count + borderItems; i++) {
            result.push(<Item component={component} width={width} key={i} index={i} leftOfLast={leftOfLast} />);
        }
        console.log(result);
        return result;
    };

    useEffect(() => {
        console.log('widt', compRef.current.getBoundingClientRect());
        setWidth(compRef.current.getBoundingClientRect().width);
    }, []);

    return (
        <div className="slider" ref={visibleRef}>
            <div className="slider-container" ref={containerRef}>
                {!width ? (
                    <div style={{ width: 'auto' }} className="slider-item" ref={compRef}>
                        {component}
                    </div>
                ) : (
                    buildSliderItems()
                )}
            </div>
        </div>
    );
};

export default Slider;
