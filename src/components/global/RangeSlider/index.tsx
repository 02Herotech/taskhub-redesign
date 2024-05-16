import React, { useState } from 'react';

const RangeSlider = ({ initialMinPrice = 1000, initialMaxPrice = 7000, step = 100 }) => {
    const [minprice, setMinPrice] = useState(initialMinPrice);
    const [maxprice, setMaxPrice] = useState(initialMaxPrice);
    const [minthumb, setMinThumb] = useState(0);
    const [maxthumb, setMaxThumb] = useState(0);

    const min = 100;
    const max = 10000;

    const mintrigger = () => {
        const newMinPrice = Math.min(minprice, maxprice - 500);
        setMinPrice(newMinPrice);
        setMinThumb(((newMinPrice - min) / (max - min)) * 100);
    };

    const maxtrigger = () => {
        const newMaxPrice = Math.max(maxprice, minprice + 500);
        setMaxPrice(newMaxPrice);
        setMaxThumb(100 - (((newMaxPrice - min) / (max - min)) * 100));
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="relative max-w-xl w-full">
                <div>
                    <input
                        type="range"
                        step={step}
                        min={min}
                        max={max}
                        onInput={mintrigger}
                        value={minprice}
                        className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
                    />

                    <input
                        type="range"
                        step={step}
                        min={min}
                        max={max}
                        onInput={maxtrigger}
                        value={maxprice}
                        className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
                    />

                    <div className="relative z-10 h-2">
                        <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>
                        <div
                            className="absolute z-20 top-0 bottom-0 rounded-md bg-green-300"
                            style={{ right: `${maxthumb}%`, left: `${minthumb}%` }}
                        ></div>
                        <div
                            className="absolute z-30 w-6 h-6 top-0 left-0 bg-green-300 rounded-full -mt-2 -ml-1"
                            style={{ left: `${minthumb}%` }}
                        ></div>
                        <div
                            className="absolute z-30 w-6 h-6 top-0 right-0 bg-green-300 rounded-full -mt-2 -mr-3"
                            style={{ right: `${maxthumb}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex justify-between items-center py-5">
                    <div>
                        <input
                            type="text"
                            maxLength={5}
                            onInput={mintrigger}
                            value={minprice}
                            className="px-3 py-2 border border-gray-200 rounded w-24 text-center"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            maxLength={5}
                            onInput={maxtrigger}
                            value={maxprice}
                            className="px-3 py-2 border border-gray-200 rounded w-24 text-center"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RangeSlider;
