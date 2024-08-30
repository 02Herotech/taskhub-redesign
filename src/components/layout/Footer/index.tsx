import NewsLetter from '@/components/newsletter'

const Footer = () => {

    return (
        <footer className='h-[600px] relative '>
            <div className='h-[600px] bg-[#895404]'>Footer</div>



            <div className='absolute lg:-top-24 -top-44 w-full   overflow-hidden'>
                <NewsLetter />
            </div>
        </footer>
    )
}

export default Footer