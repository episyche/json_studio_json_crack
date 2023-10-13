import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { setData, setShow } from '../../../../../contextapi/reducertypes';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { modelContext } from '../../../../../contextapi/context';

export default function DialogModal() {

    const { modelState: { isShow, data }, dispatchModelState } = modelContext();

    function closeModal() {
        
        dispatchModelState({
            type: setShow,
            payload: false
        })
        dispatchModelState({
            type: setData,
            payload: undefined
        })
    }

    return (
        <>
            <Transition appear show={isShow} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-fit transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Node Content
                                    </Dialog.Title>
                                    <div className='mt-[25px] rounded-md bg-gray-200 p-[10px] w-[400px] '>
                                        {
                                            data ? Object.entries(data).map((e) => (
                                                <div key={e} className='flex gap-[10px]'>
                                                    <span>{JSON.stringify(e[0])}</span>
                                                    <span>:</span>
                                                    <span className='break-all'>{
                                                        typeof(e[1]) == 'string' ? JSON.stringify(e[1]) : e[1]
                                                    }</span>
                                                </div>
                                            )) : ''
                                        }
                                    </div>
                                    <div className='mt-[20px] flex justify-between'>
                                        <CopyToClipboard text={data} className="w-fit h-fit  bg-indigo-600 text-white p-[10px] font-600 rounded-md"
                                            onCopy={() => closeModal()}>
                                            <span>Copy to clipboard</span>
                                        </CopyToClipboard>
                                        <button className="w-fit outline-none border-none focus-none h-fit bg-indigo-600 text-white p-[10px] font-600 rounded-md" onClick={closeModal}>Close</button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
