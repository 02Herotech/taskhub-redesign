import Image from 'next/image'
import React from 'react'

const Logo = () => {
    return (
        <Image src="/assets/images/oloja-logo.png" alt="Oloja Logo" width={100} height={100} className='w-[100px] h-[35px]' />
    )
}

export default Logo