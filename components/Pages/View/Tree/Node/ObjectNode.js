import { chartToolsContext, modelContext } from "../../../../../contextapi/context";
import { setShow, setData } from "../../../../../contextapi/reducertypes";
import ObjectValue from "./ObjectValue";

export default function ObjectNode({ node }) {

    const { width, height, data } = node;

    const { dispatchModelState } = modelContext();
    const { chartToolsState: { searchText } } = chartToolsContext();

    const onNodeClicked = (clickedNode) => {
        var nodeDict = {}
        for (var i of clickedNode) {
            nodeDict[i[0]] = i[1]
        }
        dispatchModelState({
            type: setShow,
            payload: true
        })
        dispatchModelState({
            type: setData,
            payload: nodeDict
        })
    }

    const validateSearchText = () => {
        for(var i of data.text) {
            if((i[0].includes(searchText) || String(i[1]).includes(searchText)) && searchText != '') {
                return true
            }
        }
    }

    return (
        <foreignObject
            style={{ border: validateSearchText() ? '4px solid' : '1px solid', borderColor: validateSearchText() ? 'green' : '#C9C9C9', padding: '10px', borderRadius: '10px', overflow: "hidden", backgroundColor: '' }}
            width={width} height={height} x={0} y={0}>
            <div 
            // onClick={() => onNodeClicked(data.text)}
            >
                {
                    data.text.map((val) => (
                        <div key={val[0]} className={`flex gap-[10px] items-center`}>
                            <div className="text-[#675D5D]">{JSON.stringify(val[0]).replaceAll('"', "")} :</div>
                            <ObjectValue value={val[1]} />
                        </div>
                    ))
                }
            </div>
        </foreignObject>
    );
}