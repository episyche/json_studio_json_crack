import { LinkIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react"
import { jsonContext } from "../../contextapi/context";
import { setGraphNodes } from "../../contextapi/reducertypes";
import ObjectValue from "../Pages/View/Tree/Node/ObjectValue";

export default function HeightWidthCalculation({ visibility }) {

    const { jsonState: { data }, dispatchJsonState } = jsonContext();

    useEffect(() => {
        data.map((e) => {

            e.height = parseInt(document.getElementById('temp' + e.id).clientHeight)
            e.width = parseInt(document.getElementById('temp' + e.id).clientWidth) + 20
        })

        dispatchJsonState({
            type: setGraphNodes,
            payload: data
        })

    }, [data])


    return (
        <>
            <div className={visibility}>
                {
                    data.map((e) => {
                        if (Array.isArray(e.data.text)) {
                            return <div key={e.id} id={"temp" + e.id} className="w-fit h-fit p-[10px]">
                                {
                                    e.data.text.map((ele, index) => (
                                        <div key={ele[0] + index} className="flex gap-[10px]">
                                            <div className="text-sky-400">{JSON.stringify(ele[0]).replaceAll('"', "")} : </div>
                                            <ObjectValue value={ele[1]} />
                                        </div>
                                    ))
                                }
                            </div>
                        } else {
                            return typeof (e.data.text) == 'number' || e.data.text == '{}' ?
                                <div key={e.id} id={"temp" + e.id} className="flex items-center justify-center roundedd-full w-fit h-fit py-[10px] px-[7px]">
                                    <div>{e.data.text}</div>
                                </div> : <div key={e.id} id={"temp" + e.id} className="flex gap-[10px] w-fit h-fit p-[10px]">
                                    <div>{e.data.text}</div>
                                    <div>{'(' + e.data.children_count + ')'}</div>
                                    <LinkIcon className="w-6" />
                                </div>
                        }
                    })
                }
            </div>
        </>

    );
}