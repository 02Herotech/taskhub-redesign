import styles from "./styles.module.css"

const MarketPlaceHeader = () => {

    const handleSubmit = (e: any) => {
        e.preventDefault
    }
    return (

        <div className={`${styles.headerCover} w-full lg:mt-20 md:mt-16 py-20`}>
            <div className="text-white flex flex-col lg:items-center md:items-center sm:items-start md:justify-center sm:justify-start h-auto space-y-8 px-4 lg:px-0 sm:mt-10">
                <div className="flex flex-col space-y-2 md:justify-center sm:justify-start lg:items-center sm:items-start sm:text-left">
                    <div className="flex lg:flex-row md:flex-row sm:flex-col md:justifiy-center sm:justifiy-start">
                        <h1 className="font-bold xl:text-[39px] lg:text-[35px] md:text-[35px] sm:text-[35px] sm:text-left ">Put up a task.</h1>
                        <h1 className="font-bold xl:text-[39px] lg:text-[35px] md:text-[35px] sm:text-[35px] sm:text-left ">Complete the task at hand.</h1>
                    </div>
                    <p className="lg:text-[20px] md:text-[18px] sm:text-[18px] sm:text-start font-bold">Publish a task. Complete it.</p>
                </div>


                <form onSubmit={handleSubmit} className="w-full max-w-[700px] flex flex-col items-start md:flex-col lg:flex-row lg:items-center lg:space-x-2">
                    <input
                        type="text"
                        id="description"
                        placeholder="In few words, what do you need?"
                        name="description"
                        className="bg-white border-[1.5px] flex-1 rounded-xl border-[#C1BADB] text-[16px] py-[13px] px-4 text-[#C1BADB] focus:border-[#C1BADB] focus:outline-none xl:w-[600px] lg:w-[500px] md:w-[450px] sm:w-[400px]"
                    />
                    <button
                        type="submit"
                        className="bg-primary hover:bg-status-darkViolet rounded-3xl py-3 px-6 lg:text-[18px] sm:text[13px] md:text[15px] font-bold mt-4 lg:mt-0 lg:w-auto "
                    >
                        Add a Task
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MarketPlaceHeader;