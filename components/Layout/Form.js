import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'

function Form() {

    // for popup
    const [open, setOpen] = useState(false)

    //for text editor
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);
    const [heading1, setHeading1] = useState(false);
    const [heading2, setHeading2] = useState(false);
    const [heading3, setHeading3] = useState(false);
    const [highlite, setHighlite] = useState(false);
    const [bulletList, setBulletList] = useState(false);

    const BoldFunction = () => {
        document.getElementById("comment").focus();
        if (bold) {
            setBold(false);
        } else {
            setBold(true);
        }
    };

    const ItalicFunction = () => {
        document.getElementById("comment").focus();
        if (italic) {
            setItalic(false);
        } else {
            setItalic(true);
        }
    };

    const UnderlineFunction = () => {
        document.getElementById("comment").focus();
        if (underline) {
            setUnderline(false);
        } else {
            setUnderline(true);
        }
    };

    const HeadingFunction = (tag) => {
        document.getElementById("comment").focus();
        if (tag === "h1") {
            if (heading1) {
                setHeading1(false);
                document.execCommand("fontSize", false, "3");
            } else {
                setHeading1(true);
                setHeading2(false);
                setHeading3(false);
                document.execCommand("fontSize", false, "6");
            }
        } else if (tag === "h2") {
            if (heading2) {
                setHeading2(false);
                document.execCommand("fontSize", false, "3");
            } else {
                setHeading1(false);
                setHeading2(true);
                setHeading3(false);
                document.execCommand("fontSize", false, "5");
            }
        } else if (tag === "h3") {
            if (heading3) {
                setHeading3(false);
                document.execCommand("fontSize", false, "3");
            } else {
                setHeading1(false);
                setHeading2(false);
                setHeading3(true);
                document.execCommand("fontSize", false, "4");
            }
        }
    };

    const HighliteFunction = () => {
        document.getElementById("comment").focus();
        if (highlite) {
            setHighlite(false);
            if (!document.execCommand("hiliteColor", false, "white")) {
                document.execCommand("backColor", false, "white");
            }
        } else {
            setHighlite(true);
            if (!document.execCommand("hiliteColor", false, "orange")) {
                document.execCommand("backColor", false, "orange");
            }
        }
    };

    const BulletListFunction = () => {
        document.getElementById("comment").focus();
        if (bulletList) {
            setBulletList(false);
        } else {
            setBulletList(true);
            var createOrderList = document.createElement("ul");
            createOrderList.className = "list-disc";
            createOrderList.style.marginLeft = "12px";
            var createLI = document.createElement("li");
            createOrderList.appendChild(createLI);
            var createDIV = document.createElement("div");
            createDIV.appendChild(createOrderList);
            PasteList(createDIV.innerHTML);
        }
    };

    const PasteList = (insertHtml) => {
        var sel, range;
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                // Range.createContextualFragment() would be useful here but is
                // non-standard and not supported in all browsers (IE9, for one)

                var el = document.createElement("div");
                el.innerHTML = insertHtml;

                var frag = document.createDocumentFragment(),
                    node,
                    lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);

                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if (document.selection && document.selection.type != "Control") {
            // IE < 9
            document.selection.createRange().pasteHTML(html);
        }
    };

    // send FeedBack to BE
    function sendFeedBack() {
        let comment = document.getElementById('comment').innerText
        if (comment.length > 1) {
            //fetch url in post method?
            fetch("https://api.episyche.com/feedback/", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: comment,
                })
            })
                .then((response) => {
                    if (response.status == 200) {
                        document.getElementById('comment').innerHTML = ''
                        setOpen(true)
                        setTimeout(function () {
                            setOpen(false)
                        }, 2000)
                    }
                });
        }
        else {
            
        }
    }

    return (
        <div className="">
            <div className="pb-8 ">
                <div className=" w-6/12  mx-auto hidden md:block">
                    <div className="text-gray-500 my-8">
                        <p className="text-xl w-fit mx-auto font-bold text-black">FeedBack</p>
                    </div>
                    <div className="w-full">
                        <div className="rounded-xl border border-gray-300 w-full border  mx-auto px-3">
                            <div className="flex justify-between py-2 border-b-2">
                                <div className="h-fit my-auto flex gap-3 ">
                                    <div className="">
                                        <div className="flex">
                                            <abbr title="bold">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        document.execCommand("bold");
                                                        BoldFunction();
                                                    }}
                                                    className={`${bold
                                                        ? "bg-[#081F34] text-white"
                                                        : "bg-white text-gray-500"
                                                        } rounded-md w-9 cursor-pointer text-center font-medium text-xl hover:bg-[#081F34] hover:text-white`}
                                                >
                                                    B
                                                </button>
                                            </abbr>
                                            <abbr title="italic">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        document.execCommand("italic");
                                                        ItalicFunction();
                                                    }}
                                                    className={`${italic
                                                        ? "bg-[#081F34] text-white"
                                                        : "bg-white text-gray-500"
                                                        } rounded-md w-9 cursor-pointer text-center italic text-xl hover:bg-[#081F34] hover:text-white`}
                                                >
                                                    I
                                                </button>
                                            </abbr>
                                            <abbr title="underline">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        document.execCommand("underline");
                                                        UnderlineFunction();
                                                    }}
                                                    className={`${underline
                                                        ? "bg-[#081F34] text-white"
                                                        : "bg-white text-gray-500"
                                                        } rounded-md  w-9 cursor-pointer text-center underline text-xl hover:bg-[#081F34] hover:text-white`}
                                                >
                                                    U
                                                </button>
                                            </abbr>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="flex gap-3">
                                            <abbr title="H1">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        HeadingFunction("h1");
                                                    }}
                                                    className={`${heading1
                                                        ? "bg-[#081F34] text-white"
                                                        : "bg-white text-gray-500"
                                                        } rounded-md w-9 cursor-pointer text-center font-medium text-xl hover:bg-[#081F34] hover:text-white`}
                                                >
                                                    H1
                                                </button>
                                            </abbr>
                                            <abbr title="H2">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        HeadingFunction("h2");
                                                    }}
                                                    className={`${heading2
                                                        ? "bg-[#081F34] text-white"
                                                        : "bg-white text-gray-500"
                                                        } rounded-md w-9 cursor-pointer text-center font-medium text-xl hover:bg-[#081F34] hover:text-white`}
                                                >
                                                    H2
                                                </button>
                                            </abbr>
                                            <abbr title="H3">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        HeadingFunction("h3");
                                                    }}
                                                    className={`${heading3
                                                        ? "bg-[#081F34] text-white"
                                                        : "bg-white text-gray-500"
                                                        } rounded-md  w-9 cursor-pointer text-center font-medium text-xl hover:bg-[#081F34] hover:text-white`}
                                                >
                                                    H3
                                                </button>
                                            </abbr>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="flex gap-3">
                                            <abbr title="highlite">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        HighliteFunction();
                                                    }}
                                                    className={`${highlite
                                                        ? "bg-[#081F34] text-white"
                                                        : "bg-white text-gray-500"
                                                        } rounded-md w-9 cursor-pointer text-center font-medium text-xl hover:bg-[#081F34] hover:text-white`}
                                                >
                                                    A
                                                </button>
                                            </abbr>
                                            <abbr title="bullet-points">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        BulletListFunction();
                                                    }}
                                                    className={`${bulletList
                                                        ? "bg-[#081F34] text-white"
                                                        : "bg-white text-gray-500"
                                                        } rounded-md w-9 cursor-pointer text-center font-medium text-xl hover:bg-[#081F34] hover:text-white`}
                                                >
                                                    <ListBulletIcon className="w-7" />
                                                </button>
                                            </abbr>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="py-0  my-auto" onClick={(e) => sendPost(e)}>
                                    <button className="bg-[#021B41] font-bold border text-white h-fit w-fit px-6 py-1.5 rounded">
                                        Post
                                    </button>
                                </div> */}
                            </div>
                            <div
                                // onClick={() => postInput()}
                                id="comment"
                                contentEditable
                                className=" min-h-[150px] text-[20px] text-gray-500 outline-none mx-auto my-3"
                            ></div>
                        </div>
                    </div>
                </div>
                <div onClick={() => sendFeedBack()} className="hidden md:block transform w-fit transition duration-500 mx-auto hover:scale-110 mt-8">
                    <button className="border bg-black  text-white px-4 py-1 rounded font-bold">Submit</button>
                </div>
            </div>

            {/* For Pop Up */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900">
                                                 FeedBack
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-md text-gray-500">
                                                Successfuly Submited
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                  
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

        </div>
    )
}

export default Form