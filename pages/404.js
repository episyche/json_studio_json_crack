import React from 'react'

import Header from '../components/Layout/Header'

function ErrorPage() {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div className='my-auto my-56  w-fit mx-auto'>
                <div className='w-fit mx-auto'>
                    <p className='text-[50px] text-gray-500 font-[600]'>404</p>
                </div>
                <div className='w-fit mx-auto'>
                    <h1 className='text-[35px] text-gray-500'>Page not found</h1>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage