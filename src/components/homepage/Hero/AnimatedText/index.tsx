import React, { useEffect, useRef, useState } from 'react'

const AnimatedText: React.FC = () => {
    const [text, setText] = useState<string>('Product');
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setText(prevText => prevText === 'Product' ? 'Service' : 'Product');
                setIsAnimating(false);
            }, 500);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <h1 className="font-clashSemiBold text-center xl:text-[40px] max-lg:my-5 text-[32px] text-[#140B31]">
            Every immigrant needs a{' '}
            <span className="w-full overflow-hidden">
                <span
                    className={`text-[#E58C06] transition-all duration-500 ease-in-out
            ${isAnimating ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
          `}
                >
                    {text}
                </span>
            </span>
        </h1>
    );
};

export default AnimatedText