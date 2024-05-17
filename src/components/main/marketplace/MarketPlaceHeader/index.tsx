import styles from "./styles.module.css"

const MarketPlaceHeader = () => {

    const handleSubmit = (e: any) => {
        e.preventDefault
    }
    return (

        <div className={`${styles.headerCover} w-full mt-20 py-[70px]`}>
            <div className="text-white flex items-center flex-col justify-center h-[200px]  space-y-8">
                <div className="flex flex-col space-y-2 justify-center items-center">
                    <h1 className="font-bold text-[39px]">Put up a task. Complete the task at hand.</h1>
                    <p className="text-[20px] font-bold">Publish a task. Complete it.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <input type="text"
                        id="description"
                        placeholder="In few words, what do you need?"
                        name="description"
                        className="bg-white border-[1.5px] rounded-xl border-[#C1BADB] text-[16px] py-[13px] px-4 w-[600px] text-[#C1BADB] focus:border-[#C1BADB] focus:outline-none"
                    />

                    <button
                        type="submit"
                        className="bg-primary hover:bg-status-darkViolet  rounded-3xl py-3 px-6 text-[18px] font-bold ml-2 focus:outline-none"
                    >
                        Add a Task
                    </button>
                </form>
            </div>

        </div>
    );
}

export default MarketPlaceHeader;