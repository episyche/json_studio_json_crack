import { createContext, useReducer, useContext, useState } from "react";
import { jsonReducer, modelReducer, chartToolsReducer, globalRightToolsReducer, urlUpdateJSON, PopUpShow } from "./reducer";

const json = createContext();
const model = createContext();
const chartTools = createContext();
const rightGlobalTools = createContext();
const SourceData = createContext();
const PopUpData = createContext();


export const LeftJson = createContext(null)
export const RightJSON = createContext(null)
export const PackageRef = createContext(null)
export const UpdateLeft = createContext(null)
export const UpdateRight = createContext(null)


const GlobalContext = ({ children }) => {


    const [leftData, setLeftData] = useState([])
    const [RightData, setRightData] = useState([])
    const [useref, setuseref] = useState()
    const [leftUpdate, setleftUpdate] = useState()
    const [rightUpdate, setrightUpdate] = useState()



    const [jsonState, dispatchJsonState] = useReducer(jsonReducer, {
        data: [],
        graphNodes: [],
        graphEdges: [],
        edgeIds: [],
        nodeIds: [],
        userInput: JSON.stringify([]),
    });


    const [modelState, dispatchModelState] = useReducer(modelReducer, {
        isShow: false,
        data: undefined
    });

    const [chartToolsState, dispatchChartToolsState] = useReducer(chartToolsReducer, {
        direction: "RIGHT",
        nodeExpandButton: true,
        childrenCount: true,
        searchText: '',
        element: null,
        firstNodePosition: {
            x: 0,
            y: 0
        },
        image: {
            width: 0,
            height: 0
        }
    });

    const [globalRightToolsState, dispatchGlobalRightToolsState] = useReducer(globalRightToolsReducer, {
        fullscreen: false,
        inputScreen: false
    });

    const [lclStorage, dispatchlclStorage] = useReducer(urlUpdateJSON, {
        Updatejson: "empty"
    })

    const [message, setMessage] = useReducer(PopUpShow, {
        messages: '',
        keywords: '',
    })


    return (
        <>
            <json.Provider value={{ jsonState, dispatchJsonState }}>
                <model.Provider value={{ modelState, dispatchModelState }}>
                    <chartTools.Provider value={{ chartToolsState, dispatchChartToolsState }}>
                        <rightGlobalTools.Provider value={{ globalRightToolsState, dispatchGlobalRightToolsState }}>
                            <SourceData.Provider value={{ lclStorage, dispatchlclStorage }}>
                                <LeftJson.Provider value={{ leftData, setLeftData }}>
                                    <RightJSON.Provider value={{ RightData, setRightData }}>
                                        <PackageRef.Provider value={{ useref, setuseref }}>
                                            <UpdateLeft.Provider value={{ leftUpdate, setleftUpdate }}>
                                                <UpdateRight.Provider value={{ rightUpdate, setrightUpdate }}>
                                                    <PopUpData.Provider value={{ message, setMessage }}>
                                                        {children}
                                                    </PopUpData.Provider>
                                                </UpdateRight.Provider>
                                            </UpdateLeft.Provider>
                                        </PackageRef.Provider>
                                    </RightJSON.Provider>
                                </LeftJson.Provider>
                            </SourceData.Provider>
                        </rightGlobalTools.Provider>
                    </chartTools.Provider>
                </model.Provider>
            </json.Provider>
        </>
    );
}

export default GlobalContext;

export const jsonContext = () => {
    return useContext(json);
}

export const modelContext = () => {
    return useContext(model);
}

export const chartToolsContext = () => {
    return useContext(chartTools);
}

export const globalRightToolsContext = () => {
    return useContext(rightGlobalTools);
}
export const LstorageUpdate = () => {
    return useContext(SourceData)
}

export const PopUpDataShow = () => {
    return useContext(PopUpData)

}