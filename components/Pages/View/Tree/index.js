import { useEffect, useState, useRef, Fragment, useCallback } from "react";
import { Canvas, CanvasPosition, MarkerArrow, Edge } from "reaflow";
import { v4 as uuid } from "uuid";
import CustomNodes from "./Node/CustomNodes";
import { chartToolsContext, globalRightToolsContext, jsonContext } from "../../../../contextapi/context";
import { setEdgeIds, setElement, setGraphEdges, setImageSize, setJson, setNodeIds } from "../../../../contextapi/reducertypes";
import HeightWidthCalculation from "../../../utils/nodeCalculaton";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import DialogModal from "./Popups/ChartPopup";
import { MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon, ViewfinderCircleIcon } from "@heroicons/react/24/solid";

export default function Graph({ direction }) {

    const { jsonState: { graphNodes, graphEdges, userInput }, dispatchJsonState } = jsonContext();
    const { chartToolsState: { firstNodePosition: { x, y } }, dispatchChartToolsState } = chartToolsContext();
    const { globalRightToolsState: { fullscreen } } = globalRightToolsContext();

    const wrapperRef = useRef();
    const canvasRef = useRef();

    const nodeData = userInput;

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [size, setSize] = useState({
        width: 1,
        height: 1,
    });

    let tempNodeList = [];
    let tempEdgeList = [];

    useEffect(() => {
        if (canvasRef.current.containerRef.current) {
            dispatchChartToolsState({
                type: setElement,
                payload: canvasRef.current.containerRef.current
            })

        }
    }, [canvasRef])

    useEffect(() => {
        try {
            if (JSON.parse(nodeData).length == undefined) {
                let nodeDict = {};
                var id = uuid().split('-').join('');
                nodeDict['id'] = id;
                nodeDict['data'] = {}
                nodeDict['data']['text'] = "{}"
                nodeDict['data']['parent'] = true;
                nodeDict['data']['children_count'] = 0;
                nodeDict['data']['isCollapse'] = false;
                nodeDict['data']['collapseData'] = [];
                nodeDict['height'] = 50;
                nodeDict['width'] = 50;
                tempNodeList.push(nodeDict);
                setNodes(tempNodeList);
                disCollapseChart(JSON.parse(nodeData), id);
            } else {
                let nodeDict = {};
                var id = uuid().split('-').join('');
                nodeDict['id'] = id;
                nodeDict['data'] = {}
                nodeDict['data']['text'] = "{}"
                nodeDict['data']['parent'] = true;
                nodeDict['data']['children_count'] = 0;
                nodeDict['data']['isCollapse'] = false;
                nodeDict['data']['collapseData'] = [];
                nodeDict['height'] = 50;
                nodeDict['width'] = 50;
                tempNodeList.push(nodeDict);
                setNodes(tempNodeList);
                for (let i = 0; i < JSON.parse(nodeData).length; i++) {
                    let nodeDict = {};
                    var objId = uuid().split('-').join('');
                    nodeDict['id'] = objId;

                    nodeDict['data'] = {}
                    nodeDict['data']['text'] = i
                    nodeDict['data']['parent'] = true;
                    nodeDict['data']['children_count'] = 0;
                    nodeDict['data']['isCollapse'] = false;
                    nodeDict['data']['collapseData'] = [];
                    nodeDict['height'] = 0;
                    nodeDict['width'] = 0;
                    tempNodeList.push(nodeDict);
                    setNodes(tempNodeList);

                    let edgeDict = {}
                    var edgeId = uuid().split('-').join('');
                    edgeDict['id'] = edgeId;
                    edgeDict['from'] = id;
                    edgeDict['to'] = objId;

                    tempEdgeList.push(edgeDict);
                    setEdges(tempEdgeList);
                    disCollapseChart(JSON.parse(nodeData)[i], objId)
                }
            }
        } catch (error) {
            console.log(error)
        }

    }, [nodeData]);

    const checkStringValues = (value) => {
        for (var k of value) {
            if (typeof (k) == 'object') {

            } else {
                return true
            }
        }
    }

    const disCollapseChart = (value, connectionId) => {

        if (typeof (value) == 'object') {

            let checkObject = [];
            Object.values(value).map((val) => {
                checkObject.push(val)
            })
            var status = checkStringValues(checkObject);

            if (status) {

                if (Array.isArray(value)) {
                    for (let i = 0; i < value.length; i++) {
                        let nodeDict = {};
                        var objId = uuid().split('-').join('');
                        nodeDict['id'] = objId;

                        nodeDict['data'] = {}
                        nodeDict['data']['text'] = i
                        nodeDict['data']['parent'] = true;
                        nodeDict['data']['children_count'] = 0;
                        nodeDict['data']['isCollapse'] = false;
                        nodeDict['data']['collapseData'] = [];
                        nodeDict['height'] = 0;
                        nodeDict['width'] = 0;
                        tempNodeList.push(nodeDict);
                        setNodes(tempNodeList);

                        let edgeDict = {}
                        var edgeId = uuid().split('-').join('');
                        edgeDict['id'] = edgeId;
                        edgeDict['from'] = connectionId;
                        edgeDict['to'] = objId;

                        tempEdgeList.push(edgeDict);
                        setEdges(tempEdgeList);
                        disCollapseChart(value[i], objId)
                    }
                } else {
                    let nodeDict = {};
                    var id = uuid().split('-').join('');
                    nodeDict['id'] = id;
                    nodeDict['data'] = {}
                    nodeDict['data']['text'] = []

                    Object.entries(value).map((e) => {
                        if (typeof (e[1]) == 'object') {

                            if (Array.isArray(e[1])) {
                                if (e[1].length == 0) {
                                    nodeDict.data.text.push(e)
                                } else {
                                    let nodeDict = {};
                                    var objId = uuid().split('-').join('');
                                    nodeDict['id'] = objId;

                                    nodeDict['data'] = {}
                                    nodeDict['data']['text'] = e[0]
                                    nodeDict['data']['parent'] = true;
                                    nodeDict['data']['children_count'] = e[1].length;
                                    nodeDict['data']['isCollapse'] = false;
                                    nodeDict['data']['collapseData'] = [];
                                    nodeDict['height'] = 0;
                                    nodeDict['width'] = 0;
                                    tempNodeList.push(nodeDict);
                                    setNodes(tempNodeList);

                                    let edgeDict = {}
                                    var edgeId = uuid().split('-').join('');
                                    edgeDict['id'] = edgeId;
                                    edgeDict['from'] = connectionId;
                                    edgeDict['to'] = objId;

                                    tempEdgeList.push(edgeDict);
                                    setEdges(tempEdgeList);
                                }
                            } else {
                                if (Object.entries(e[1]).length == 0) {
                                    nodeDict.data.text.push(e)
                                } else {
                                    let nodeDict = {};
                                    var objId = uuid().split('-').join('');
                                    nodeDict['id'] = objId;

                                    nodeDict['data'] = {}
                                    nodeDict['data']['text'] = e[0]
                                    nodeDict['data']['parent'] = true;
                                    nodeDict['data']['children_count'] = e[1].length;
                                    nodeDict['data']['isCollapse'] = false;
                                    nodeDict['data']['collapseData'] = [];
                                    nodeDict['height'] = 0;
                                    nodeDict['width'] = 0;
                                    tempNodeList.push(nodeDict);
                                    setNodes(tempNodeList);

                                    let edgeDict = {}
                                    var edgeId = uuid().split('-').join('');
                                    edgeDict['id'] = edgeId;
                                    edgeDict['from'] = connectionId;
                                    edgeDict['to'] = objId;

                                    tempEdgeList.push(edgeDict);
                                    setEdges(tempEdgeList);
                                }
                            }



                            disCollapseChart(e[1], objId)
                        } else {
                            nodeDict.data.text.push(e)
                        }
                    })

                    nodeDict['data']['parent'] = false;
                    nodeDict['data']['children_count'] = 0;
                    nodeDict['data']['isCollapse'] = false;
                    nodeDict['data']['collapseData'] = [];
                    nodeDict['height'] = 0;
                    nodeDict['width'] = 0;
                    tempNodeList.push(nodeDict);
                    setNodes(tempNodeList);

                    let edgeDict = {}
                    var edgeId = uuid().split('-').join('');
                    edgeDict['id'] = edgeId;
                    edgeDict['from'] = connectionId;
                    edgeDict['to'] = id;

                    tempEdgeList.push(edgeDict);
                    setEdges(tempEdgeList);
                }
            } else {
                if (Array.isArray(value)) {
                    for (let i = 0; i < value.length; i++) {
                        let nodeDict = {};
                        var objId = uuid().split('-').join('');
                        nodeDict['id'] = objId;

                        nodeDict['data'] = {}
                        nodeDict['data']['text'] = i
                        nodeDict['data']['parent'] = true;
                        nodeDict['data']['children_count'] = 0;
                        nodeDict['data']['isCollapse'] = false;
                        nodeDict['data']['collapseData'] = [];
                        nodeDict['height'] = 0;
                        nodeDict['width'] = 0;
                        tempNodeList.push(nodeDict);
                        setNodes(tempNodeList);

                        let edgeDict = {}
                        var edgeId = uuid().split('-').join('');
                        edgeDict['id'] = edgeId;
                        edgeDict['from'] = connectionId;
                        edgeDict['to'] = objId;

                        tempEdgeList.push(edgeDict);
                        setEdges(tempEdgeList);
                        disCollapseChart(value[i], objId)
                    }
                } else {

                    Object.entries(value).map((e) => {
                        if (typeof (e[1]) == 'object') {

                            if (Array.isArray(e[1])) {
                                if (e[1].length == 0) {
                                    let nodeDict = {};
                                    var objId = uuid().split('-').join('');
                                    nodeDict['id'] = objId;

                                    nodeDict['data'] = {}
                                    nodeDict['data']['text'] = [e]
                                    nodeDict['data']['parent'] = true;
                                    nodeDict['data']['children_count'] = 0;
                                    nodeDict['data']['isCollapse'] = false;
                                    nodeDict['data']['collapseData'] = [];
                                    nodeDict['height'] = 0;
                                    nodeDict['width'] = 0;
                                    tempNodeList.push(nodeDict);
                                    setNodes(tempNodeList);

                                    let edgeDict = {}
                                    var edgeId = uuid().split('-').join('');
                                    edgeDict['id'] = edgeId;
                                    edgeDict['from'] = connectionId;
                                    edgeDict['to'] = objId;

                                    tempEdgeList.push(edgeDict);
                                    setEdges(tempEdgeList);
                                } else {
                                    let nodeDict = {};
                                    var objId = uuid().split('-').join('');
                                    nodeDict['id'] = objId;

                                    nodeDict['data'] = {}
                                    nodeDict['data']['text'] = e[0]
                                    nodeDict['data']['parent'] = true;
                                    nodeDict['data']['children_count'] = e[1].length;
                                    nodeDict['data']['isCollapse'] = false;
                                    nodeDict['data']['collapseData'] = [];
                                    nodeDict['height'] = 0;
                                    nodeDict['width'] = 0;
                                    tempNodeList.push(nodeDict);
                                    setNodes(tempNodeList);

                                    let edgeDict = {}
                                    var edgeId = uuid().split('-').join('');
                                    edgeDict['id'] = edgeId;
                                    edgeDict['from'] = connectionId;
                                    edgeDict['to'] = objId;

                                    tempEdgeList.push(edgeDict);
                                    setEdges(tempEdgeList);
                                }
                            } else {
                                if (Object.entries(e[1]).length == 0) {
                                    let nodeDict = {};
                                    var objId = uuid().split('-').join('');
                                    nodeDict['id'] = objId;

                                    nodeDict['data'] = {}
                                    nodeDict['data']['text'] = [e]
                                    nodeDict['data']['parent'] = true;
                                    nodeDict['data']['children_count'] = 0;
                                    nodeDict['data']['isCollapse'] = false;
                                    nodeDict['data']['collapseData'] = [];
                                    nodeDict['height'] = 0;
                                    nodeDict['width'] = 0;
                                    tempNodeList.push(nodeDict);
                                    setNodes(tempNodeList);

                                    let edgeDict = {}
                                    var edgeId = uuid().split('-').join('');
                                    edgeDict['id'] = edgeId;
                                    edgeDict['from'] = connectionId;
                                    edgeDict['to'] = objId;

                                    tempEdgeList.push(edgeDict);
                                    setEdges(tempEdgeList);
                                } else {
                                    let nodeDict = {};
                                    var objId = uuid().split('-').join('');
                                    nodeDict['id'] = objId;

                                    nodeDict['data'] = {}
                                    nodeDict['data']['text'] = e[0]
                                    nodeDict['data']['parent'] = true;
                                    nodeDict['data']['children_count'] = e[1].length;
                                    nodeDict['data']['isCollapse'] = false;
                                    nodeDict['data']['collapseData'] = [];
                                    nodeDict['height'] = 0;
                                    nodeDict['width'] = 0;
                                    tempNodeList.push(nodeDict);
                                    setNodes(tempNodeList);

                                    let edgeDict = {}
                                    var edgeId = uuid().split('-').join('');
                                    edgeDict['id'] = edgeId;
                                    edgeDict['from'] = connectionId;
                                    edgeDict['to'] = objId;

                                    tempEdgeList.push(edgeDict);
                                    setEdges(tempEdgeList);
                                }
                            }


                        }
                        disCollapseChart(e[1], objId)
                    })
                }
            }

        } else {
            let nodeDict = {};
            var strId = uuid().split('-').join('');
            nodeDict['id'] = strId;
            nodeDict['data'] = {}
            nodeDict['data']['text'] = value
            nodeDict['data']['parent'] = false;
            nodeDict['data']['children_count'] = 0;
            nodeDict['data']['isCollapse'] = false;
            nodeDict['data']['collapseData'] = [];
            nodeDict['height'] = 0;
            nodeDict['width'] = 0;
            tempNodeList.push(nodeDict)

            let edgeDict = {}
            var edgeId = uuid().split('-').join('');
            edgeDict['id'] = edgeId;
            edgeDict['from'] = connectionId;
            edgeDict['to'] = strId;

            tempEdgeList.push(edgeDict);
            setEdges(tempEdgeList);
        }
    }

    useEffect(() => {
        var tempNodeIds = [];
        dispatchJsonState({
            type: setJson,
            payload: nodes
        })
        for (var i of nodes) {
            tempNodeIds.push(i.id)
        }
        dispatchJsonState({
            type: setNodeIds,
            payload: tempNodeIds
        })
        localStorage.setItem('json_studio_chart_nodes', JSON.stringify(nodes))
    }, [nodes])


    useEffect(() => {
        var tempEdgeIds = []
        dispatchJsonState({
            type: setGraphEdges,
            payload: edges
        })

        for (var i of edges) {
            tempEdgeIds.push(i.id)
        }
        dispatchJsonState({
            type: setEdgeIds,
            payload: tempEdgeIds
        })
        localStorage.setItem('json_studio_chart_edges', JSON.stringify(edges))
    }, [edges])

    useEffect(() => { if (wrapperRef.current) wrapperRef.current.centerView() }, [fullscreen])

    const onLayoutChange = (e) => {
        setSize({ width: e.width, height: e.height });
        dispatchChartToolsState({
            type: setImageSize,
            payload: { width: e.width, height: e.height }
        })
        // document.getElementById('resetTransform').click()
    }

    return (
        <>
            <div className="relative h-[74vh] rounded-b-lg overflow-hidden">
                <TransformWrapper
                    ref={wrapperRef}
                    wheel={{ step: 0.4 }}
                    initialScale={0.5}
                    maxScale={4}
                    minScale={0.05}
                    doubleClick={{ disabled: true }}
                    centerOnInit={true}
                    centerZoomedOut={true}

                >
                    {
                        ({ zoomIn, zoomOut, centerView }) => (
                            <Fragment>
                                <div className='absolute top-0 bg-white right-1.5 w-fit z-40 grid grid-row-1'>
                                    <button id="resetTransform" className='my-1' onClick={() => centerView(0.5)}>
                                        <ViewfinderCircleIcon className="w-7" />
                                    </button>
                                    <button className='' onClick={() => zoomIn()}>
                                        <MagnifyingGlassPlusIcon className="w-7" />
                                    </button>
                                    <button className='' onClick={() => zoomOut()}>
                                        <MagnifyingGlassMinusIcon className="w-7" />
                                    </button>
                                </div>
                                <TransformComponent
                                    wrapperStyle={{
                                        width: '100%',
                                        height: "72vh",
                                        overflow: "hidden",
                                        backgroundColor: 'white',
                                    }}
                                >
                                    <Canvas
                                        className="bg-[white]"
                                        ref={canvasRef}
                                        maxWidth={size.width}
                                        maxHeight={size.height}
                                        onLayoutChange={onLayoutChange}
                                        nodes={graphNodes}
                                        edges={graphEdges}
                                        direction={direction}
                                        zoomable={false}
                                        readonly={true}
                                        dragEdge={null}
                                        dragNode={null}
                                        fit={true}
                                        defaultPosition={CanvasPosition.CENTER}
                                        node={props => <CustomNodes {...props} />}
                                        arrow={<MarkerArrow style={{ fill: 'black' }} />}
                                        edge={<Edge className="edge" />}
                                    />
                                </TransformComponent>
                            </Fragment>
                        )}
                </TransformWrapper>

            </div>
            <HeightWidthCalculation visibility={'invisible fixed'} />
            <DialogModal />
        </>
    );
}