import styles from "./styles.module.css"

const MarketPlaceHeader = () => {

    const handleSubmit = (e: any) => {
        e.preventDefault
    }
    return (

        <div className={`${styles.headerCover} w-full  lg:mt-20 md:mt-16 py-20`}>
            <div className="text-white flex flex-col justify-center max-w-[400px] px-5 md:px-0 md:max-w-full items-center space-y-8 mx-auto  ">
                <div className="w-full flex flex-col space-y-2 md:items-center sm:items-start justify-center ">
                    <div className=" w-full flex flex-col mt-10 md:mt-0 items-start justify-center md:flex-row md:justify-center md:items-center ">
                        <h1 className="font-bold  text-[27px] md:text-[39px]">Put up a task.</h1>
                        <h1 className="font-bold text-[27px] md:text-[39px] ">Complete the task at hand.</h1>
                    </div>
                    <p className="lg:text-[20px] md:text-[18px] sm:text-[16px] sm:text-start font-bold">Publish a task. Complete it.</p>
                </div>



                <form onSubmit={handleSubmit} className="w-full md:w-[600px] flex flex-col items-start md:flex-row md:items-center md:space-x-2">
                    <input
                        type="text"
                        id="description"
                        placeholder="In few words, what do you need?"
                        name="description"
                        className="bg-white border-[1.5px] flex-1 rounded-xl border-[#C1BADB] text-[13px] md:text-[16px] py-[13px] px-4 text-[#C1BADB] focus:border-[#C1BADB] focus:outline-none w-full md:w-[500px]"
                    />
                    <button
                        type="submit"
                        className="bg-primary hover:bg-status-darkViolet rounded-3xl py-3 px-6 md:text-[18px] text[15px] font-bold mt-4 lg:mt-0  "
                    >
                        Add a Task
                    </button>
                </form>

            </div>
        </div >
    );
}

export default MarketPlaceHeader;