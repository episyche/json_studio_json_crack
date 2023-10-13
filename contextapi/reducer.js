import { setUserInput, setInputscreen, setFirstNodePosition, setImageSize, setElement, setJson, setFullscreen, clearJson, setGraphNodes, setDirection, setData, setShow, setGraphEdges, setSearchText, setNodeExpandButton, setChildrenCount, setEdgeIds, setNodeIds, lclstgValue, PopUpValue } from "./reducertypes";

export const jsonReducer = (state, action) => {
    switch (action.type) {
        case setJson:
            state.data = action.payload
            return { ...state }
        case clearJson:
            state.data = {}
            return { ...state }
        case setGraphNodes:
            state.graphNodes = action.payload
            return { ...state }
        case setGraphEdges:
            state.graphEdges = action.payload
            return { ...state }
        case setEdgeIds:
            state.edgeIds = action.payload
            return { ...state }
        case setNodeIds:
            state.nodeIds = action.payload
            return { ...state }
        case setUserInput:
            state.userInput = action.payload
            return { ...state }
        default:
            return state;
    }
}

export const modelReducer = (state, action) => {
    switch (action.type) {
        case setShow:
            state.isShow = action.payload
            return { ...state }
        case setData:
            state.data = action.payload
            return { ...state }
        default:
            return state;
    }
}

export const chartToolsReducer = (state, action) => {
    switch (action.type) {
        case setDirection:
            state.direction = action.payload
            return { ...state }
        case setNodeExpandButton:
            state.nodeExpandButton = action.payload
            return { ...state }
        case setChildrenCount:
            state.childrenCount = action.payload
            return { ...state }
        case setSearchText:
            state.searchText = action.payload
            return { ...state }
        case setElement:
            state.element = action.payload
            return { ...state }
        case setFirstNodePosition:
            state.firstNodePosition.x = action.payload.x
            state.firstNodePosition.y = action.payload.y
            return { ...state }
        case setImageSize:
            state.image.width = action.payload.width
            state.image.height = action.payload.height
            return { ...state }
        default:
            return state;
    }
}

export const globalRightToolsReducer = (state, action) => {
    switch (action.type) {
        case setFullscreen:
            if (action.payload) {
                state.fullscreen = false
            } else {
                state.fullscreen = true
            }

            return { ...state }
        case setInputscreen:
            if (action.payload) {
                state.inputScreen = false
            } else {
                state.inputScreen = true
            }

            return { ...state }
        default:
            return state;
    }
}

export const urlUpdateJSON = (state, action) => {
    switch (action.type) {
        case lclstgValue:
            state.Updatejson = action.payload
            return { ...state }
        default:
            return state;
    }
}

export const PopUpShow = (state, action) => {
    switch (action.type){
        case PopUpValue: 
            
            state.messages = action.payload.messages
            state.keywords = action.payload.keywords
            return { ...state }
        default:
            return state
    }
}