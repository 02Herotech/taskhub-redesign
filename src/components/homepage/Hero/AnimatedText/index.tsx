import { ReactTyped } from 'react-typed';

const AnimatedText: React.FC = () => {
    return (
        <h1 className="font-clashSemiBold text-center xl:text-[40px] max-lg:my-5 text-[32px] text-[#140B31]">
            Every immigrant needs a{' '}
            <span className="w-full overflow-hidden">
                <span
                    className={`text-[#E58C06]`}
                >
                    <ReactTyped
                        strings={["Product", "Service", "Provider"]}
                        loop
                        typeSpeed={250}
                        backSpeed={100}
                    />
                </span>
            </span>
        </h1>
    );
};

export default AnimatedText