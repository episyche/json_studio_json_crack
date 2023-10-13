import { ArrowPathIcon,ViewfinderCircleIcon, ChevronDownIcon, Cog8ToothIcon, LinkIcon, ArrowDownTrayIcon, DocumentTextIcon, MagnifyingGlassPlusIcon, SquaresPlusIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import { chartToolsContext } from "../../../../../contextapi/context";
import { downloadImageAsJPEG, downloadImageAsPNG, downloadImageAsSVG } from '../../../../utils/downloadElement';
import { setDirection, setSearchText, setChildrenCount, setNodeExpandButton } from "../../../../../contextapi/reducertypes";

export default function ChartTools() {

    const { chartToolsState: { childrenCount, nodeExpandButton, element, image }, dispatchChartToolsState } = chartToolsContext();

    const [toolPopup, setToolPopup] = useState('');
    const [hoverElement, setHoverElement] = useState()

    const [canvasCollapse, setCanvasCollapse] = useState(false);

    return (
        <div className='flex gap-[3px] md:gap-[8px] w-[90%] mx-auto items-center'>
            <div className='relative'>
                <button onClick={() => {
                    if (toolPopup == 'download') {
                        setToolPopup('');
                    } else {
                        setToolPopup('download')
                    }
                }} className={`${toolPopup == 'download' ? 'bg-black text-white' : 'bg-white text-black'} outline-none font-bold border-none focus-none rounded flex gap-1 p-0.5 px-1 hover:bg-black hover:text-white`}><ArrowDownTrayIcon className='h-5' /><p className="font-bold text-[14px] my-auto">Download</p></button>
                <div className={`${toolPopup == 'download' ? 'block' : 'hidden'} absolute left-2`}>
                    <Image src="/Polygon 1.svg" width={15} height={15} alt='drop' />
                </div>
                <div className={`${toolPopup == 'download' ? 'block' : 'hidden'} absolute border border-[#DCD7D7] shadow-[#DCD7D7] shadow-md top-[37px] left-0 z-50 bg-white overflow-hidden`}>
                    <button className="pt-[5px] px-[10px] border-gray-400 w-[120px] hover:text-white  text-left hover:bg-[#BCBCBC] flex gap-[10px]" onClick={(e) => { e.preventDefault(); downloadImageAsPNG(element, image); }}>
                        <div className="mt-[2px] -ml-[3px]">
                            <Image src="/png-file 1.svg" width={30} height={20} alt='png' />
                        </div>
                        <p className='pb-[5px]   w-full -ml-[4px]'>PNG</p>
                    </button>
                    <button className="pt-[5px] px-[10px] border-gray-400 w-[120px] hover:text-white  text-left hover:bg-[#BCBCBC] flex gap-[10px]" onClick={(e) => { e.preventDefault(); downloadImageAsJPEG(element, image); }}>
                        <div className="mt-[2px]">
                            <Image src="/jpg-file 1.svg" width={20} height={25} alt='jpeg' />
                        </div>
                        <p className='pb-[5px]  w-full'>JPEG</p>
                    </button>
                    <button className="pt-[5px] px-[10px] border-gray-400 w-[120px] hover:text-white  text-left hover:bg-[#BCBCBC] flex gap-[10px]" onClick={(e) => { e.preventDefault(); downloadImageAsSVG(element); }}>
                        <div className="mt-[2px]">
                            <Image src="/svg-file 1.svg" width={20} height={25} alt='svg' />
                        </div>
                        <p className='pb-[5px] w-full'>SVG</p>
                    </button>
                </div>
            </div>

            <div className="relative">
                <button onMouseOver={() => setHoverElement('hovDirection')} onMouseLeave={() => setHoverElement('')} onClick={() => {
                    if (toolPopup == 'rotate') {
                        setToolPopup('')
                    } else {
                        setToolPopup('rotate')
                    }
                }} className={`${toolPopup == 'rotate' ? 'bg-black text-white' : 'bg-white text-black'} outline-none border-none focus-none rounded flex gap-[5px] p-0.5 hover:bg-black hover:text-white`}>
                    <div>
                        {toolPopup == 'rotate' || hoverElement == 'hovDirection' ?
                            <Image src="/DownWhite.png" width={20} height={35} alt='direction' /> :
                            <Image src="/DownBlack.png" width={20} height={35} alt='direction' />}
                    </div>
                    <p className="text-[14px] font-bold my-auto">Directions</p>
                </button>
                <div className={`${toolPopup == 'rotate' ? 'block' : 'hidden'} absolute left-2`}>
                    <Image src="/Polygon 1.svg" width={15} height={15} alt='drop' />
                </div>
                <div className={`${toolPopup == 'rotate' ? 'block' : 'hidden'} absolute border border-[#DCD7D7] shadow-[#DCD7D7] shadow-md top-[37px] left-0 z-50 bg-white overflow-hidden`}>
                    <button onMouseOver={() => setHoverElement('Right')} onMouseLeave={() => setHoverElement('')} id="rightdirection" className="pt-[5px] px-[10px] border-gray-400 w-[120px] hover:text-white  text-left hover:bg-[#434343] flex gap-[10px]" onClick={() => { dispatchChartToolsState({ type: setDirection, payload: 'RIGHT' }); setToolPopup('') }}>
                        <div className="mt-1">
                            {hoverElement == 'Right' ?
                                <Image src="/RightWhite.png" width={30} height={30} alt='right' />
                                :
                                <Image src="/RightBlack.png" width={30} height={30} alt='right' />
                            }
                        </div>
                        <p className=' w-full pb-[5px]'>Right</p>
                    </button>
                    <button onMouseOver={() => setHoverElement('Down')} onMouseLeave={() => setHoverElement('')} id="downdirection" className="pt-[5px] px-[10px] border-gray-400 w-[120px] hover:text-white  text-left hover:bg-[#434343] flex gap-[10px]" onClick={() => { dispatchChartToolsState({ type: setDirection, payload: 'DOWN' }); setToolPopup('') }}>
                        <div className=" mt-1">
                            {hoverElement == 'Down' ?
                                <Image src="/DownWhite.png" width={30} height={30} alt='down' />
                                :
                                <Image src="/DownBlack.png" width={30} height={30} alt='down' />}
                        </div>
                        <p className=' w-full pb-[5px]'>Down</p>
                    </button>
                    <button onMouseOver={() => setHoverElement('left')} onMouseLeave={() => setHoverElement('')} className="pt-[5px] px-[10px] border-gray-400 w-[120px] hover:text-white  text-left hover:bg-[#434343] flex gap-[10px]" onClick={() => { dispatchChartToolsState({ type: setDirection, payload: 'LEFT' }); setToolPopup('') }}>
                        <div className="rotate-90 mt-1">
                             {hoverElement == 'left' ?
                            <Image src="/DownWhite.png" width={30} height={30} alt='left' />
                            :
                            <Image src="/DownBlack.png" width={30} height={30} alt='left' />}
                        </div>
                        <p className=' w-full pb-[5px]'>Left</p>
                    </button>
                    <button onMouseOver={() => setHoverElement('Up')} onMouseLeave={() => setHoverElement('')} className="pt-[5px] px-[10px] border-gray-400 w-[120px] hover:text-white  text-left hover:bg-[#434343] flex gap-[10px]" onClick={() => { dispatchChartToolsState({ type: setDirection, payload: 'UP' }); setToolPopup('') }}>
                        <div className="rotate-180 mt-1">
                             {hoverElement == 'Up' ?
                            <Image src="/DownWhite.png" width={30} height={30} alt='up' />
                            :
                            <Image src="/DownBlack.png" width={30} height={30} alt='up' />}
                        </div>
                        <p className='w-full pb-[5px]'>Up</p>
                    </button>
                </div>
            </div>

            <div className="relative">
                <button onClick={() => {
                    if (toolPopup == 'settings') {
                        setToolPopup('')
                    } else {
                        setToolPopup('settings')
                    }
                }} className='bg-white shadow text-black rounded flex gap-[5px] p-0.5 hover:bg-black hover:text-white'>
                    <Cog8ToothIcon className='h-5 ' />
                    <p className="text-[14px] font-bold my-auto">Settings</p>
                </button>
                <div className={`${toolPopup == 'settings' ? 'block' : 'hidden'} absolute left-2`}>
                    <Image src="/Polygon 1.svg" width={15} height={15} alt='drop' />
                </div>
                <div className={`${toolPopup == 'settings' ? 'block' : 'hidden'} absolute border border-[#DCD7D7] shadow-[#DCD7D7] shadow-md top-[37px] left-0 z-50 bg-white overflow-hidden`}>
                    <button
                        onClick={() => {
                            if (childrenCount) {
                                dispatchChartToolsState({ type: setChildrenCount, payload: false })
                                setToolPopup('')
                            } else {
                                dispatchChartToolsState({ type: setChildrenCount, payload: true })
                                setToolPopup('')
                            }
                        }}
                        className="pt-[5px] px-[10px] border-gray-400 w-[200px] hover:text-white  text-left hover:bg-[#434343] flex gap-[10px]">
                        <div className="">
                            <ViewfinderCircleIcon className="h-5"/>
                        </div>
                        <p className=' w-full pb-[5px] ml-1'>Children Count</p>
                    </button>

                    <button
                        onClick={() => {
                            if (nodeExpandButton) {
                                dispatchChartToolsState({ type: setNodeExpandButton, payload: false })
                            } else {
                                dispatchChartToolsState({ type: setNodeExpandButton, payload: true })
                            }
                            setToolPopup('');
                        }}
                        className="pt-[5px] px-[10px] border-gray-400 w-[200px] hover:text-white  text-left hover:bg-[#434343] flex gap-[10px]">
                        <LinkIcon className="w-5 mt-1" />
                        <p className='w-full pb-[5px] ml-2'>Expand Icon</p>
                    </button>
                </div>
            </div>

        </div>
    );
}