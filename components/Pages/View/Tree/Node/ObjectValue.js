export default function ObjectValue({ value }) {
    if(typeof(value) == 'string') {
        return <span className="text-[#2739DD]">{JSON.stringify(value)}</span>
    } else if (typeof(value) == 'number') {
        return <span className="text-[#2FAF62]">{value}</span>
    } else if (typeof(value) == 'boolean') {
        return <span className="text-[#FC0A0A]">{String(value)}</span>
    } else if (typeof(value) == 'object') {
        return <span className="text-[#FC7900]">{JSON.stringify(value)}</span>
    }
}