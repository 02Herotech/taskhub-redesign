import styles from "./styles.module.css"

const MarketPlaceHeader = () => {

    const handleSubmit = (e: any) => {
        e.preventDefault
    }
    return (

        <div className={`${styles.headerCover} w-full mt-20 py-20`}>
            <div className="text-white flex items-center flex-col justify-center h-[200px]  space-y-7">
                <div className="flex flex-col space-y-2 justify-center items-center">
                    <h1 className="font-bold text-[24px]">Put up a task. Complete the task at hand.</h1>
                    <p className="text-[14px]">Publish a task. Complete it.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <input type="text"
                        id="description"
                        placeholder="In few words, what do you need?"
                        name="description"
                        className="bg-white border-[1.5px] rounded-xl border-[#C1BADB] text-[10px] py-[10px] px-4 w-[400px] text-[#C1BADB] focus:border-[#C1BADB] focus:outline-none"
                    />

                    <button
                        type="submit"
                        className="bg-purpleBase hover:bg-purpleHover rounded-3xl py-2 px-4 text-[12px] ml-2 focus:outline-none"
                    >
                        Add a Task
                    </button>
                </form>
            </div>

        </div>
    );
}

export default MarketPlaceHeader;