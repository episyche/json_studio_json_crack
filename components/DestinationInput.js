// import React from 'react'
// import "ace-builds";
// import "ace-builds/webpack-resolver";
// import AceEditor from "react-ace";

// import "ace-builds/src-noconflict/mode-yaml";
// import "ace-builds/src-noconflict/mode-xml";
// import "ace-builds/src-noconflict/mode-json";
// import "ace-builds/src-noconflict/mode-text";
// import "ace-builds/src-noconflict/theme-github";
// import "ace-builds/src-noconflict/ext-language_tools";

// function DestinationInput({ datastate, mode, value }) {


//     if (mode == 'json') {
//         if (value) {
//             if (value !== 'null') {
//                 try {
//                     var parse = JSON.parse(value)
//                     var FormatJson = JSON.stringify(parse, null, 4)
//                     localStorage.setItem('DestinationJson', JSON.stringify(FormatJson))
//                 }
//                 catch (err) {
//                     if (err.message !== 'Unexpected end of JSON input') {
//                         var pp = { error: err.message }
//                         var FormatJson = JSON.stringify(pp)
//                     }
//                     else {
//                         FormatJson = ''
//                     }
//                 }
//             }
//             else {
//                 FormatJson = ''
//             }

//         }
//         else {
//             FormatJson = ''
//         }
//     }
//     else {
//         var FormatJson = value
//     }

//     return (
//         <div>
//             <div className=''>
//                 <AceEditor
//                     placeholder=""
//                     mode={mode}
//                     onChange={datastate}
//                     theme="github"
//                     fontSize={16}
//                     value={FormatJson}
//                     setOptions={{
//                         wrap: true,
//                         useWorker: false
//                     }}
//                 />
//             </div>
//         </div>
//     )
// }

// export default DestinationInput