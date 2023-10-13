import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { ShareIcon, Squares2X2Icon, TableCellsIcon, MinusCircleIcon, ArrowsPointingOutIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { globalRightToolsContext } from '../../../contextapi/context';
import { setFullscreen } from '../../../contextapi/reducertypes';

import {
    EmailShareButton,
    EmailIcon,
} from 'next-share'
import Link from 'next/link';



function DesTopOptionOne() {
    const { globalRightToolsState: { fullscreen }, dispatchGlobalRightToolsState } = globalRightToolsContext();

    const router = useRouter()
    const [urlpath, seturlpath] = useState(router.pathname)
    const [menuValue, setMenuValue] = useState('')

    const showDropDown = (value) => {
        if (value == 'Download') {
            { value == menuValue ? setMenuValue('') : setMenuValue(value) }
            setTimeout(function () {
                setMenuValue('')
            }, 2500)
        }
        if (value == 'Copy') {
          
            if (urlpath === '/' || urlpath === '/view/json-crack-viewer' || urlpath === '/view/json-db-viewer' || urlpath === '/view/json-grid-viewer') {
                CopyToJson()
            }
            else if (urlpath === '/convert/CSV-to-JSON-Converter') {
                const content = JSON.parse(localStorage.getItem("CSV_JSON_Data"))
                var inp = document.createElement('textarea');
                document.body.appendChild(inp)
                inp.value = content
                inp.select();
                document.execCommand('copy', false);
                inp.remove();
            }

            else {
                const content = JSON.parse(localStorage.getItem("result"))
               
                var inp = document.createElement('textarea');
                document.body.appendChild(inp)
                inp.value = content
                inp.select();
                document.execCommand('copy', false);
                inp.remove();
            }


            { value == menuValue ? setMenuValue('') : setMenuValue(value) }
            setTimeout(function () {
                setMenuValue('')
            }, 2500)
        }

        else {
            { value == menuValue ? setMenuValue('') : setMenuValue(value) }
        }
    }

    //For copy JSON
    const CopyToJson = () => {
        const contentJS = localStorage.getItem("DestinationJson")
        const content_two = JSON.parse(contentJS)
        var inp = document.createElement('textarea');
        document.body.appendChild(inp)
        inp.value = content_two
        
        inp.select();
        document.execCommand('copy', false);
        inp.remove();
    }

    //For DownLoad and Format JSON
    useEffect(() => {
        var download_btn = document.getElementById('output-download')
        if (download_btn) {

            download_btn.addEventListener('click', DownloadFile)
        }
    }, [])

    const DownloadFile = () => {
      
        var pathName = window.location.pathname
        if (pathName === '/') {
            const link = document.createElement("a");
            const content = localStorage.getItem("JSON_Data")
            if (content) {
                const content_two = JSON.parse(content)
                const file = new Blob([content_two], { type: 'text/plain' });
                link.href = URL.createObjectURL(file);
                link.download = "sample.json";
                link.click();
                URL.revokeObjectURL(link.href);
            }
        }
    };

    const [shareDataJson, setShareDataJson] = useState('')

    useEffect(() => { shareData() }, [shareDataJson])

    function shareData() {

        if (urlpath === '/' || urlpath === '/view/json-crack-viewer' || urlpath === '/view/json-db-viewer' || urlpath === '/view/json-grid-viewer') {

            var shareStorage = localStorage.getItem("JSON_Data")
            if (shareStorage) {
                try {

                    var parse = JSON.parse(shareStorage)
                    var FormatJson = JSON.stringify(parse, null, 4)
                    setShareDataJson(parse)

                }
                catch (err) {

                }
            }
        }
        else {
            var shareStorage = localStorage.getItem("result")
            if (shareStorage) {
                try {
                    const content = JSON.parse(localStorage.getItem("result"))
                    // var parse = JSON.parse(shareStorage)
                    // var FormatJson = JSON.stringify(parse, null, 4)
                    setShareDataJson(content)

                }
                catch (err) {

                }
            }
        }
    }



    return (
        <div>
            <div className='relative'>
                <div className=' bg-[#BCBCBC] py-3 rounded-t-lg'>
                    <div className='flex justify-between w-[96%] mx-auto'>

                       

                        

                        {urlpath === "/view/json-crack-viewer" ?
                            <>
                                <div className='hidden' id='distMin' title='minimize' ><MinusCircleIcon className='h-6' /></div>
                                <div onClick={() => {
                                    dispatchGlobalRightToolsState({
                                        type: setFullscreen,
                                        payload: fullscreen
                                    })
                                }} className='' id='distMax' title='maximize'><ArrowsPointingOutIcon className='hidden md:block h-6 -mt-0.5' /></div>
                            </>
                            : null}

                        
                    </div>

                    {urlpath === "/" || urlpath === "/jsonformatter" || urlpath === "/" || urlpath === "/convert" || urlpath === '/convert/JSON-to-CSV-Converter' || urlpath === '/convert/CSV-to-JSON-Converter' || urlpath === '/convert/JSON-to-YAML-Converter' || urlpath === '/convert/YAML-to-JSON-Converter' || urlpath === '/convert/XML-to-JSON-Converter' || urlpath === '/convert/JSON-to-XML-Converter' || urlpath === '/convert/JSON-to-TEXT-Converter' || urlpath === '/convert/TEXT-to-JSON-Converter' ?
                        <div className='flex justify-between w-[96%] mx-auto'>
                            <div className='flex gap-2'>
                                <div className='' >
                                    <div id='output-download' onClick={() => showDropDown('Download')} className={`${menuValue == 'Download' ? 'bg-black text-white' : 'bg-white'} flex px-1 py-0.5 gap-1 cursor-pointer hover:bg-black hover:text-white rounded shadow-[0_4px_4px_rgba(0,0,0,0.25)]`}>
                                        <ArrowDownTrayIcon className='h-5 w-5' />
                                        <p className='font-bold text-[14px] my-auto'>Download</p>
                                    </div>
                                </div>
                                <div onClick={() => { showDropDown('Share'); shareData() }} className={`${menuValue == 'Share' ? 'bg-black text-white' : 'bg-white'} flex px-1 hover:bg-black hover:text-white cursor-pointer rounded shadow-[0_4px_4px_rgba(0,0,0,0.25)]`}>
                                    <ShareIcon className='h-5 my-auto' />
                                    <p className='font-bold pl-1 text-[14px] my-auto'>Share</p>
                                </div>
                                <div onClick={() => { showDropDown('Copy'); shareData() }} className={`${menuValue == 'Copy' ? 'bg-black text-white' : 'bg-white'} flex px-1 hover:bg-black hover:text-white cursor-pointer rounded shadow-[0_4px_4px_rgba(0,0,0,0.25)]`}>
                                    <DocumentDuplicateIcon className='h-5 my-auto' />
                                    <p className='font-bold pl-1 text-[14px] my-auto'>Copy</p>
                                </div>
                                {/* <div onClick={() => showDropDown('Others')} className={`${menuValue == 'Others' ? 'bg-black text-white' : 'bg-white'} flex gap-1 px-1 cursor-pointer  rounded shadow-[0_4px_4px_rgba(0,0,0,0.25)]`}>
                                    <Squares2X2Icon className='h-5 my-auto' />
                                    <p className='font-bold text-[14px] my-auto'>Others</p>
                                </div> */}
                            </div>
                            <div>
                                <p className='hidden' id='sourceMin' title='minimize' ><MinusCircleIcon className='h-6' /></p>
                                <p className='' id='sourceMax' title='maximize' onClick={() => {
                                    dispatchGlobalRightToolsState({
                                        type: setFullscreen,
                                        payload: fullscreen
                                    })
                                }}  ><ArrowsPointingOutIcon className='hidden md:block h-6' /></p>
                            </div>
                        </div>
                        : null}
                </div>

                {urlpath == '/view/json-crack-viewer' || urlpath == '/view/json-db-viewer' || urlpath == '/view/json-grid-viewer' ?
                    <div className={menuValue == 'Download' ? '-mt-3 ml-[22px] absolute z-10' : 'hidden'}>
                        <Image src='/leftBarOption/Polygon.svg' width="16" height='16' alt='drop' />
                        <div>
                            <div className='bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] py-1'>
                                <div className='flex py-1.5 pl-2 pr-4 hover:bg-gray-300 cursor-pointer'>
                                    <Image src='/leftBarOption/JPG.svg' width="15" height='15' className='object-contain' alt='jpg' />
                                    <p className='px-4 text-[#785959]  font-bold text-[14px]'>JPG</p>
                                </div>
                                <hr className='w-[60%] mx-auto ml-8' />
                                <div className='flex py-1.5 pl-1.5 hover:bg-gray-300 cursor-pointer'>
                                    <Image src='/leftBarOption/png.svg' width="20" height='20' className='object-contain' alt='png' />
                                    <p className='px-3 text-[#785959] font-bold text-[14px]'>PNG</p>
                                </div>
                                <hr className='w-[60%] mx-auto ml-8' />
                                <div className='flex  py-1.5 pl-2 hover:bg-gray-300 cursor-pointer'>
                                    <Image src='/leftBarOption/svg.svg' width="15" height='16' className='object-contain' alt='svg' />
                                    <p className='px-4 text-[#785959] font-bold text-[14px]'>SVG</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ""}

                <div className={menuValue == 'Share' ? '-mt-3 ml-[122px] absolute z-10' : 'hidden'}>
                    <Image src='/leftBarOption/Polygon.svg' width="16" height='16' alt='drop' />
                    <div>
                        <div className='bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
                            <div className='group flex py-1.5 pl-2 pr-4 hover:bg-[#434343] cursor-pointer'>
                                <div className="flex gap-[10px] items-center">
                                    <Image src="/msTeams.svg" width={20} height={20} alt='microsoft' className='ml-1 object-contain' />
                                    <Link rel="alternate" hrefLang="en" legacyBehavior passHref href={`https://teams.microsoft.com/share?href=${'https://jsonstudio.io'}&msgText=${shareDataJson}`}>
                                        <a rel="noreferrer" target="_blank">
                                            <p className='group-hover:text-white ml-1'>MS Teams </p>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            {/* <hr className='w-[60%] mx-auto ml-8' /> */}
                            <div className='group flex py-1.5 pl-1.5 hover:bg-[#434343] cursor-pointer'>
                                <div className="flex gap-[10px] items-center" >
                                    <Image src="/skype.svg" width={20} height={20} alt='skype' className='ml-[6px] object-contain' />
                                    <Link rel="alternate" hrefLang="en" legacyBehavior passHref href={`https://web.skype.com/share?url=${'https://jsonstudio.io'}&source=button&text=${shareDataJson}`}>
                                        <a rel="noreferrer" target="_blank">
                                            <p className='group-hover:text-white ml-1'>Skype</p>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            {/* <hr className='w-[60%] mx-auto ml-8' /> */}
                            <div className='group  flex py-1.5 pl-2 hover:bg-[#434343] cursor-pointer'>
                                <EmailShareButton
                                    url={'https://jsonstudio.io'}
                                    subject={'JSON'}
                                    body={`${shareDataJson}`}
                                    style={{ display: 'flex', gap: '10px' }}
                                >
                                    {/* <EmailIcon size={22} round /> */}
                                    <Image src="/maila.png" width={20} height={20} alt='mail' className='ml-1 object-contain' />
                                    <p className='group-hover:text-white ml-1'>Email</p>
                                </EmailShareButton>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div >
    )
}

export default DesTopOptionOne