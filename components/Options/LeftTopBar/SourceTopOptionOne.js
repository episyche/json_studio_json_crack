import React, { useState, useEffect } from 'react'
import { XCircleIcon, ArrowUpTrayIcon, BookmarkSquareIcon, MinusCircleIcon, ArrowsPointingOutIcon, ArrowDownTrayIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { ArrowTrendingDownIcon, DocumentTextIcon, CogIcon, LinkIcon } from '@heroicons/react/24/solid';
import Router from 'next/router';
import { globalRightToolsContext, LstorageUpdate, PopUpDataShow } from '../../../contextapi/context';
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router';
import { setInputscreen, lclstgValue, PopUpValue } from '../../../contextapi/reducertypes';
import GreenPop from "../../PopUp/GreenPop"
import RedPop from "../../PopUp/RedPop"
import Credentials from 'next-auth/providers/credentials';


const history = [{ history: '15:30 employees' }, { history: '15:15 employees' }, { history: '12:15 notes' }, { history: '12:15 responses' }]

function SourceTopOptionOne() {

    const { globalRightToolsState: { fullscreen, inputScreen }, dispatchGlobalRightToolsState } = globalRightToolsContext();
    const { message: { messages, keywords }, setMessage } = PopUpDataShow();
    const { lclStorage: { Updatejson }, dispatchlclStorage } = LstorageUpdate()

    var router = useRouter()

    const [menuValue, setMenuValue] = useState('')
    const [history, setHistory] = useState()
    const [JsonModify, setJsonModify] = useState('')
    const [inputVal, setInputval] = useState()
    const [urlpath, setUrlPath] = useState()



    useEffect(() => {
        var urlpath = window.location.pathname

        setUrlPath(urlpath)
    }, [])



    useEffect(() => {
        var JsonMod = localStorage.getItem('JsonModify')
        var JsonData = localStorage.getItem('JSON_Data')

        try {
            if (JsonData.length > 2) {
                if (JsonMod) {
                    setJsonModify(JsonMod)
                }
            }
        }
        catch (err) {
            // console.log("error", err)
        }

    }, [JsonModify])

    const showDropDown = (value) => {


        if (value == 'Format') {
            setJsonModify('Format')
            localStorage.setItem("JsonModify", 'Format')
        }
        if (value == 'Minify') {
            localStorage.setItem("JsonModify", 'Minify')
            setJsonModify('Minify')
        }
        if (value == 'Download' || value == 'copy') {
            { value == menuValue ? setMenuValue('') : setMenuValue(value) }
            setTimeout(function () {
                setMenuValue('')
            }, 2500)

            if (value == 'copy') {
                CopyToJson()
            }
        }

        else {
            { value == menuValue ? setMenuValue('') : setMenuValue(value) }
        }

    }





    //For Minify
    useEffect(() => {
        var Minify = document.getElementById('Minify')
        var MinifyMob = document.getElementById('MinifyMob')

        if (Minify) {
            Minify.addEventListener('click', function () {
                try {
                    var jsonObj = JSON.parse(localStorage.getItem("JSON_Data"))
                    var minified = JSON.stringify(JSON.parse(jsonObj));
                    setInputval(minified)
                    dispatchlclStorage({ type: lclstgValue, payload: JSON.stringify(minified) })
                    localStorage.setItem("JSON_Data", JSON.stringify(minified))
                }
                catch (e) {
                    console.log("error", e)
                }


            })
        }


        if (MinifyMob) {
            MinifyMob.addEventListener('click', function () {
                try {
                    var jsonObj = JSON.parse(localStorage.getItem("JSON_Data"))
                    var minified = JSON.stringify(JSON.parse(jsonObj));
                    setInputval(minified)
                    dispatchlclStorage({ type: lclstgValue, payload: JSON.stringify(minified) })
                    localStorage.setItem("JSON_Data", JSON.stringify(minified))
                }
                catch (e) {
                    console.log("error", e)
                }


            })
        }
    }, [Updatejson])

    //For DownLoad and Format JSON
    useEffect(() => {
        var download_btn = document.getElementById('input-download')
        if (download_btn) {
            download_btn.addEventListener('click', DownloadFile)
        }
        var CopyJson = document.getElementById('CopyJson')
        if (CopyJson) {
            CopyJson.addEventListener('click', CopyToJson)
        }
    }, [])

    const DownloadFile = () => {
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

    };

    //For copy JSON
    const CopyToJson = () => {
        const content = localStorage.getItem("JSON_Data")
        const content_two = JSON.parse(content)
        var inp = document.createElement('textarea');
        document.body.appendChild(inp)
        inp.value = content_two
        inp.select();
        document.execCommand('copy', false);
        inp.remove();

    }








    return (
        <div className={`${fullscreen ? "hidden" : "block"}`}>
            <div className='relative'>
                <div className=' bg-[#BCBCBC] py-3 rounded-t-lg'>
                    <div className='flex justify-between w-[96%] mx-auto '>
                        <div className='flex gap-2'>
                            <div className=''>
                                <div onClick={() => showDropDown('Upload')} className={`${menuValue == 'Upload' ? 'bg-black text-white' : 'bg-white'} flex py-0.5 px-1 gap-1 hover:bg-black hover:text-white cursor-pointer rounded shadow-[0_4px_4px_rgba(0,0,0,0.25)]`}>
                                    <ArrowUpTrayIcon className='h-5 my-auto' />
                                    <span className='font-bold text-[14px] my-auto'>Upload</span>
                                </div>
                            </div>

                            <div id='input-download' onClick={() => showDropDown('Download')} className={`${menuValue == 'Download' ? 'bg-black text-white' : 'bg-white'} hidden     sm:flex flex gap-1 px-1 hover:bg-black hover:text-white cursor-pointer rounded shadow-[0_4px_4px_rgba(0,0,0,0.25)]`}>
                                <ArrowDownTrayIcon className='h-5 my-auto' />
                                <span className='font-bold text-[14px] my-auto '>Download</span>
                            </div>

                            {/* for mobile view OPtion */}
                            <div className='relative sm:hidden'>
                                <div id='input-download' onClick={() => showDropDown('OptionsMob')} className={`${menuValue == 'OptionsMob' ? 'bg-black text-white' : 'bg-white'} sm:hidden flex gap-1 px-1 py-0.5 hover:bg-black hover:text-white cursor-pointer rounded shadow-[0_4px_4px_rgba(0,0,0,0.25)]`}>
                                    <CogIcon className='h-5 my-auto' />
                                    <p className='font-bold text-[14px] my-auto '>Options</p>
                                </div>

                                <div className={`${menuValue !== 'OptionsMob' ? 'hidden' : 'absolute  z-10 bg-white'}`}>
                                    <div className='border'>
                                        <div className='text-black'>
                                            <div id='FormatMob' onClick={() => showDropDown('Format')} className='hover:bg-[#434343] hover:text-white px-4 py-0.5 cursor-pointer'>
                                                <span>Format</span>
                                            </div>
                                            <div id='MinifyMob' onClick={() => showDropDown('Minify')} className='hover:bg-[#434343] hover:text-white px-4 py-0.5 cursor-pointer'>
                                                <span>Minify</span>
                                            </div>
                                            <div id='CopyJson' onClick={() => showDropDown('copy')} className='hover:bg-[#434343] hover:text-white px-4 py-0.5 cursor-pointer'>
                                                <span>Copy</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div id='CopyJson' onClick={() => showDropDown('copy')} className={`${menuValue == 'copy' ? " bg-black text-white " : " bg-white"} hidden sm:flex flex  flex-row gap-1 px-1 hover:bg-black hover:text-white cursor-pointer rounded shadow-[0_4px_4px_rgba(0,0,0,0.25)]`}>
                                <DocumentDuplicateIcon className='h-5 my-auto' />
                                <span className='font-bold text-[14px] my-auto'>Copy</span>
                            </div>
                            <div id='CopyJson' onClick={() => showDropDown('Others')} className={`${menuValue == 'Others' ? " bg-black text-white " : " bg-white"} hidden sm:flex flex  flex-row gap-1 px-1 hover:bg-black hover:text-white cursor-pointer rounded shadow-[0_4px_4px_rgba(0,0,0,0.25)]`}>
                                <DocumentDuplicateIcon className='h-5 my-auto' />
                                <span className='font-bold text-[14px] my-auto'>Others</span>
                            </div>

                        </div>
                        <div>
                            <span className='hidden' id='sourceMin' title='minimize' ><MinusCircleIcon className='h-6' /></span>
                            <p onClick={() => {
                                dispatchGlobalRightToolsState({
                                    type: setInputscreen,
                                    payload: inputScreen
                                })
                            }} className='' id='sourceMax' title='maximize' ><ArrowsPointingOutIcon className='hidden md:block h-6' /></p>
                        </div>
                    </div>
                </div>

                {/* For Upload File */}
                <div className={menuValue == 'Upload' ? '-mt-3 ml-4 absolute z-10' : 'hidden'}>
                    <Image src='/leftBarOption/Polygon.svg' width="16" height='16' alt='drop' />
                    <div >
                        <div className='bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] py-1'>
                            <div>
                                <div id='fileDropDownBtn' onClick={() => setMenuValue('')} className='flex group hover:bg-[#434343] hover:text-white pl-2 pr-4 py-1.5'>

                                    <label htmlFor='uploadFile' className='flex gap-1'>

                                        <DocumentTextIcon className='h-5 pr-2' />
                                        <span className='text-black group-hover:text-white '>File</span>
                                    </label>
                                    <input type='file' accept='.json , .csv , .xml , .yaml' id='uploadFile' className='hidden' />
                                </div>
                            </div>
                            {/* <hr className='ml-8 w-[50px] border-[#BCA8A8]  bg-[#BCA8A8]' /> */}
                            <div id='urlDropDownBtn' onClick={() => setMenuValue('')} className='group hover:bg-[#434343] hover:text-white flex pl-2 pr-4 py-1.5'>
                                <LinkIcon className='h-5' />
                                <span className='cursor-pointer text-black group-hover:text-white  pl-3 '>URL</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* For Others */}
                <div className={menuValue == 'Others' ? '-mt-3 ml-[280px] absolute z-10' : 'hidden'}>
                    <Image src='/leftBarOption/Polygon.svg' width="16" height='16' alt='drop' />
                    <div >
                        <div className='bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] py-1'>
                            <div>
                                <div id='Format' onClick={() => setMenuValue('Format')} className='flex group hover:bg-[#434343] hover:text-white pl-2 pr-4 py-1.5'>
                                    {/* <LinkIcon className='h-5' /> */}
                                    <span className="font-bold my-auto  pl-1 my-auto  text-black group-hover:text-white text-[16px] h-fit -mt-[3px]">{'{ }'}</span>
                                    {/* <p className="font-bold px-1 text-[14px]  my-auto">Format</p> */}
                                    <span className='cursor-pointer text-black group-hover:text-white  pl-3 '>Format</span>
                                    {/* <label htmlFor='uploadFile' className='flex gap-1'>
                                        <DocumentTextIcon className='h-5 pr-2' />
                                        <p className='text-[#785959] group-hover:text-white font-bold text-[14px]'>File</p>
                                    </label>
                                    <input type='file' accept='.json , .csv , .xml , .yaml' id='uploadFile' className='hidden' /> */}
                                </div>
                            </div>
                            {/* <hr className='ml-8 w-[50px] border-[#BCA8A8]  bg-[#BCA8A8]' /> */}
                            <div id='Minify' onClick={() => setMenuValue('Minify')} className='group hover:bg-[#434343] hover:text-white flex pl-2 pr-4 py-1.5'>
                                <LinkIcon className='h-5 text-black group-hover:text-white' />
                                <p className='cursor-pointer text-black group-hover:text-white  pl-3 '>Minify</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>



            <div>
                <GreenPop />
                <RedPop />
            </div>
        </div>
    )
}

export default SourceTopOptionOne