import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { MagnifyingGlassIcon, Bars3Icon, UserCircleIcon, ArrowLeftOnRectangleIcon, BriefcaseIcon } from '@heroicons/react/24/outline'
import { Web_url } from '../Config/WebUrl';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';


function Header() {

    var router = useRouter()
    const [borderchange, setBorderchange] = useState('');



    useEffect(() => {
        var pathName = window.location.pathname

        if (pathName == '/' || pathName == '/view/json-grid-viewer' || pathName == '/view/json-db-viewer' || pathName == '/view/json-crack-viewer' || pathName == '/view/json-crack-viewer') {
            setBorderchange('view')
        } else if (pathName == '/json-diff-checker') {
            setBorderchange('json-diff-checker')
        }
        else if (pathName == '/workspace') {
            setBorderchange('')
        }
        else if (pathName == '/samples' || pathName.split('/')[1] == 'samples') {
            setBorderchange('samples')
        }
        else if (pathName.split('/')[1] == 'convert') {
            setBorderchange('convert')
        }
        else {
        }

    }, [borderchange])

   

    

    return (
        <div>
            <div className='bg-[#0E0D0D]'>
                <div className='flex justify-between mx-[8px] md:mx-[20px] py-4'>
                    <div className=''>
                        <Link rel="alternate" href={Web_url + "/"} hrefLang="en">
                            <div className='h-fit w-fit border border-[#AA9C9C] font-[700] text-[20px] px-1.5 py-1'>
                                <div className=''>
                                    <p className='text-white'> <span className='bg-[#FF450B] px-2 mr-2'>JSON</span>STUDIO  </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='hidden sm:block my-auto md:w-[440px]'>
                        <div className='flex  gap-4 text-white text-[20px] font-[700]'>
                            <div className={borderchange == 'view' ? 'border-b-2' : ''}>
                                <Link rel="canonical" hrefLang="en" legacyBehavior href={Web_url + '/'}><div>
                                    <p className='cursor-pointer'> View</p>
                                </div>
                                </Link>
                            </div>
                            <div onClick={() => router.push('https://jsonstudio.io/convert/JSON-to-CSV-Converter')} className={borderchange == 'convert' ? 'border-b-2' : '' + 'cursor-pointer'}>
                                {/* <Link rel="alternate" hrefLang="en" legacyBehavior href="/convert/JSON-to-CSV"><div className='cursor-pointer' ><p>Convert</p></div></Link> */}
                                <div className='cursor-pointer' ><p>Convert</p></div>
                            </div>
                            <div className={borderchange == 'json-diff-checker' ? 'border-b-2' : '' + 'cursor-pointer'}>
                                <Link legacyBehavior href="https://jsonstudio.io/json-diff-checker"><a><div className='cursor-pointer' >Difference</div></a></Link>
                            </div>
                            <div className={borderchange == 'samples' ? 'border-b-2' : '' + 'cursor-pointer'}>
                                <Link legacyBehavior href="https://jsonstudio.io/samples"><a><div className='cursor-pointer' >Samples</div></a></Link>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4 my-auto'>
                    
                    </div>

            



                </div>
            </div>
        </div >
    )
}

export default Header