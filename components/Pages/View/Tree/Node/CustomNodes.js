import { Node, Label, Port } from "reaflow";
import { chartToolsContext } from "../../../../../contextapi/context";
import ObjectNode from "./ObjectNode";
import TextNode from "./TextNode";

export default function CustomNodes(nodeProps) {
    const { text, data } = nodeProps.properties;

    const { dispatchChartToolsState } = chartToolsContext();

    return (
        <Node  {...nodeProps}
            style={{ stroke: '#475872', fill: 'white', strokeWidth: 0, borderRadius: '10px', overflow: "hidden", }}
            label={<Label style={{ fill: 'black' }} />}
            port={<Port style={{ fill: 'blue', stroke: 'white' }} rx={10} ry={10} />}
        >
            {({ node, x, y }) => {
                if (Array.isArray(data.text)) {
                    return <ObjectNode node={node} />
                } else {
                    return <TextNode node={node} />
                }
            }}
        </Node>
    );
}