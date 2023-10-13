import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Footer() {
    return (
        <div>
            <div className='bg-[#3E3C3A]'>
                <div className='py-5'>
                    <div className='w-fit mx-auto pb-3'>
                    <a href="https://www.producthunt.com/posts/json-studio?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-json&#0045;studio" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=382189&theme=light" alt="JSON&#0032;Studio - Free&#0032;tool&#0032;to&#0032;view&#0044;&#0032;convert&#0044;&#0032;compare&#0032;JSON&#0032;powered&#0032;by&#0032;ChatGPT | Product Hunt" style={{width: "250px",height:"54px"}}  width="250" height="54" /></a>
                    </div>
                    <div className='w-fit mx-auto '>

                        <Link rel="alternate" hrefLang="en" legacyBehavior passHref href='http://episyche.com/'>
                            <a rel="noreferrer" target="_blank">
                                <Image src='/Epilogo.svg' width='50' height='50' alt='episyche logo' />
                            </a>
                        </Link>
                    </div>
                    <div className='text-white'>
                        <p className='w-fit mx-auto text-sm'>Developed by</p>

                        <Link rel="alternate" hrefLang="en" legacyBehavior passHref href='http://episyche.com/'>
                            <a rel="noreferrer" target="_blank">
                                <p className="tracking-widest font-[700] text-[18px] w-fit my-2 mx-auto relative group">
                                    <span>Episyche Technologies</span>
                                    <span className="absolute -bottom-[0.5px] left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full"></span>
                                </p>
                                {/* <p className='w-fit mx-auto text-[16px] font-bold my-2 tracking-widest'>Episyche Technologies</p> */}
                            </a>
                        </Link>
                        {/* <Link hrefLang="en" legacyBehavior passHref href='http://episyche.com/'>
                            <a rel="noreferrer" target="_blank">
                                <p className='w-fit mx-auto text-[16px] font-bold my-2 tracking-widest'>Episyche Technologies</p>
                            </a>
                        </Link> */}

                        <p className='text-white w-fit mx-2 xl:mx-auto text-center'>
                            Copyright © 2022-2023 Episyche Technologies. All rights reserved.
                        </p>
                    </div>
                    <div className='flex gap-4 w-fit mx-auto pt-5'>
                        <div className='border rounded-full p-1 hover:bg-sky-400 hover:border-sky-400'>
                            <Link rel="alternate" hrefLang="en" legacyBehavior passHref href='https://twitter.com/EpisycheTech'>
                                <a rel="noreferrer" target="_blank">
                                    <Image src='/twitter.svg' width='30' alt='twitter' height='30' className='object-contain p-[4px]' />
                                </a>
                            </Link>
                        </div>
                        <div className='border rounded-full p-1 hover:bg-sky-400 hover:border-sky-400'>
                            <Link rel="alternate" hrefLang="en" legacyBehavior passHref href='https://www.linkedin.com/company/episyche/'>
                                <a rel="noreferrer" target="_blank">
                                    <Image src='/linkedin.svg' width='30' alt='linkedin' height='30' className=' object-contain p-[5px]' />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer