import { LinkIcon } from '@heroicons/react/24/solid';
import { jsonContext, chartToolsContext } from '../../../../../contextapi/context';
import { setJson, setEdgeIds, setGraphEdges, setNodeIds } from '../../../../../contextapi/reducertypes';

export default function TextNode({ node }) {
    const { width, height, data } = node;

    const { jsonState: { graphNodes, nodeIds, edgeIds }, dispatchJsonState } = jsonContext();
    const { chartToolsState: { searchText, childrenCount, nodeExpandButton } } = chartToolsContext();

    const hideShowChildrens = (nodeData) => {
        for (var i of graphNodes) {
            if (i.id == nodeData.id) {
                if (!(nodeData.data.isCollapse)) {
                    var value = hideConnectedEdges(i.id)
                    var newNodesList = [];
                    let getNodeItem = JSON.parse(localStorage.getItem('json_studio_chart_nodes'));
                    for (var j of getNodeItem) {
                        if (value.nodeIds.includes(j.id)) {
                            newNodesList.push(j)
                        }
                    }
                    for (var j of newNodesList) {
                        if (j.id == nodeData.id) {
                            j.data.isCollapse = true
                        }
                    }
                    dispatchJsonState({
                        type: setJson,
                        payload: newNodesList
                    })
                    var newEdgesList = [];
                    let getEdgeItem = JSON.parse(localStorage.getItem('json_studio_chart_edges'))
                    for (var j of getEdgeItem) {
                        if (value.edgeIds.includes(j.id)) {
                            newEdgesList.push(j)
                        }
                    }
                    dispatchJsonState({
                        type: setGraphEdges,
                        payload: newEdgesList
                    })

                } else {
                    var value = showConnectedEdges(i.id)
                    var newNodesList = [];
                    let getNodeItem = JSON.parse(localStorage.getItem('json_studio_chart_nodes'));
                    for (var j of getNodeItem) {
                        if (value.nodeIds.includes(j.id)) {
                            newNodesList.push(j)
                        }
                    }
                    for (var j of newNodesList) {
                        if (j.id == nodeData.id) {
                            j.data.isCollapse = false;
                        }
                    }
                    dispatchJsonState({
                        type: setJson,
                        payload: newNodesList
                    })
                    var newEdgesList = [];
                    let getEdgeItem = JSON.parse(localStorage.getItem('json_studio_chart_edges'))
                    for (var i of getEdgeItem) {
                        if (value.edgeIds.includes(i.id)) {
                            newEdgesList.push(i)
                        }
                    }
                    dispatchJsonState({
                        type: setGraphEdges,
                        payload: newEdgesList
                    })
                }
            }
        }
    }

    const hideConnectedEdges = (nodeId) => {
        let getItem = JSON.parse(localStorage.getItem('json_studio_chart_edges'))
        for (var i of getItem) {
            if (i.from == nodeId) {
                var connectedNode = hideConnectedNodes(i.to);
                if (connectedNode) {
                    hideConnectedEdges(connectedNode.id)

                    if (nodeIds.includes(connectedNode.id)) {
                        var newNodeIds = nodeIds;
                        newNodeIds.splice(newNodeIds.indexOf(connectedNode.id), 1)
                        dispatchJsonState({
                            type: setNodeIds,
                            payload: newNodeIds
                        })
                    }
                }

                if (edgeIds.includes(i.id)) {
                    var newEdgeIds = edgeIds;
                    newEdgeIds.splice(newEdgeIds.indexOf(i.id), 1)
                    dispatchJsonState({
                        type: setEdgeIds,
                        payload: newEdgeIds
                    })
                }


            }
        }
        return { nodeIds, edgeIds }
    }

    const showConnectedEdges = (nodeId) => {

        let getItem = JSON.parse(localStorage.getItem('json_studio_chart_edges'))
        for (var i of getItem) {
            if (i.from == nodeId) {
                var connectedNode = showConnectedNodes(i.to);
                showConnectedEdges(connectedNode.id)
                if (!(nodeIds.includes(connectedNode.id))) {
                    var newNodeIds = nodeIds;
                    newNodeIds.push(connectedNode.id);
                    dispatchJsonState({
                        type: setNodeIds,
                        payload: newNodeIds
                    })
                }
                if (!(edgeIds.includes(i.id))) {
                    var newEdgeIds = edgeIds;
                    newEdgeIds.push(i.id)
                    dispatchJsonState({
                        type: setEdgeIds,
                        payload: newEdgeIds
                    })
                }
            }
        }
        return { nodeIds, edgeIds }
    }

    const hideConnectedNodes = (nodeId) => {
        let getNodeItem = JSON.parse(localStorage.getItem('json_studio_chart_nodes'));
        for (var i of getNodeItem) {
            if (i.id == nodeId) {
                // document.getElementById('ref-1-node-' + i.id).style.display = 'none'
                return i
            }
        }
    }

    const showConnectedNodes = (nodeId) => {
        let getNodeItem = JSON.parse(localStorage.getItem('json_studio_chart_nodes'));
        for (var i of getNodeItem) {
            if (i.id == nodeId) {
                // document.getElementById('ref-1-node-' + i.id).style.display = 'block'
                return i
            }
        }
    }

    // const validateSearchText = () => {
    //     if (data.text.includes(searchText) && searchText != '') {
    //         return true
    //     }
    // }

    // return <foreignObject
    //     style={{ border: '1px solid', borderColor: '#C9C9C9', padding: '10px', borderRadius: '10px', overflow: "hidden", backgroundColor: '#' }
    //     }
    //     width={width} height={height} x={0} y={0} >
    //     <div className='flex justify-between items-center -mt-[3px]'>
    //         <div className='flex w-fit mx-auto'>
    //             <span className={`${data.parent ? 'text-blue-900' : 'text-teal-900'}`}>{data.text}</span>
    //             <span className={`${data.parent && data.children_count > 0 && childrenCount ? 'block' : 'hidden'} text-black ml-[10px]`}>{'(' + data.children_count + ')'}</span>
    //         </div>
    //         <LinkIcon onClick={() => hideShowChildrens(node)} className={`${data.parent && data.children_count > 0 && nodeExpandButton ? 'block' : 'hidden'} w-6 text-[#FC0A0A]`} />
    //     </div>
    // </foreignObject >

    return typeof (data.text) == 'number' || data.text == '{}' ? 
        <foreignObject
            style={{ border: '1px solid', borderColor: '#C9C9C9', padding: '10px', borderRadius: '20px', overflow: "hidden", backgroundColor: '#' }
            }
            width={width} height={height} x={0} y={0} >
                <div className='rounded-full flex items-center justify-center'>
                    {data.text}
                </div>
        </foreignObject>
        :
        <foreignObject
            style={{ border: '1px solid', borderColor: '#C9C9C9', padding: '10px', borderRadius: '10px', overflow: "hidden", backgroundColor: '#' }
            }
            width={width} height={height} x={0} y={0} >
            <div className='flex justify-between items-center -mt-[3px]'>
                <div className='flex w-fit mx-auto'>
                    <span className={`${data.parent ? 'text-blue-900' : 'text-teal-900'}`}>{data.text}</span>
                    <span className={`${data.parent && data.children_count > 0 && childrenCount ? 'block' : 'hidden'} text-black ml-[10px]`}>{'(' + data.children_count + ')'}</span>
                </div>
                <LinkIcon onClick={() => hideShowChildrens(node)} className={`${data.parent && data.children_count > 0 && nodeExpandButton ? 'block' : 'hidden'} w-6 text-[#FC0A0A]`} />
            </div>
        </foreignObject >
}