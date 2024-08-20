import React from 'react'
import HubBackground from "../../../../public/assets/images/homepage/hub/hub-bg.jpeg";

const MiniNavbar = () => {
    const links = [{
        link: 'matketplace',
        label: 'Marketplace'
    },
    {
        link: 'BusinessHub',
        label: 'BusinessHub'
    },
    {
        link: 'Shop',
        label: 'Rent a shop'
    }
    ]
}
const Hub = () => {
    return (
        <div
            className=' min-h-screen bg-cover bg-center'
            style={{
                backgroundImage: `url(${HubBackground.src})`,
            }}
        >



            <div className='w-[85%] mx-auto'>

          


            </div>


        </div>
    )
}

export default Hub