import React, { useEffect, useState } from 'react'
import "ace-builds";
import "ace-builds/webpack-resolver";
import AceEditor from "react-ace";
import { v4 as uuid } from "uuid"
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { globalRightToolsContext, LstorageUpdate } from '../contextapi/context';
import { lclstgValue } from '../contextapi/reducertypes';
import { useRef } from 'react';

function SourceInput({ mode, datastate, val, value, check }) {

   

    const [input, setInput] = useState()
    const [formatJson, setFormatJson] = useState(value)
    const [newjson, setNewJson] = useState(val)

    const { globalRightToolsState: { fullscreen } } = globalRightToolsContext();
    const { lclStorage: { Updatejson }, dispatchlclStorage } = LstorageUpdate()
    var pathname = window.location.pathname


    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    useEffect(() => {
        if (pathname == '/convert/XML-to-JSON-Converter') {
            var listOfXml = []
            try {
                listOfXml = JSON.parse(localStorage.getItem("history_xml_list"))
            }
            catch (error) {

                listOfXml = []
            }

            if (input) {
                listOfXml = []
                var oldXmlData = JSON.parse(localStorage.getItem("history_xml_list"))
                if (oldXmlData) {
                    for (let k = 0; k < oldXmlData.length; k++) {
                        var old_xml = {}
                        var xmlObj = oldXmlData[k]['data'];
                        var copy = input;
                        if (!(xmlObj === copy)) {
                            var xml_uuid_1 = uuid()
                            old_xml['name'] = oldXmlData[k]['name'];
                            old_xml['id'] = xml_uuid_1
                            old_xml['data'] = xmlObj
                            old_xml['date'] = oldXmlData[k]['date'];
                            old_xml['time'] = oldXmlData[k]['time'];
                            listOfXml.push(old_xml)
                        }
                    }
                    if (listOfXml.length > 9) {
                        listOfXml.shift()
                    }
                }
                var xmlData = {}
                var xml_uuid = uuid()
                let name;
                try {
                    name = input.split('>')[1] + '>'

                }
                catch (e) {
                    xmlData['name'] = null
                }

                xmlData['name'] = name
                xmlData['id'] = xml_uuid;
                xmlData['data'] = input
                var dateXml = new Date()
                xmlData['date'] = dateXml.getDate() + '-' + months[dateXml.getMonth()] + '-' + dateXml.getFullYear()
                xmlData['time'] = dateXml.getHours() + ':' + dateXml.getMinutes()
                // xmlData['time'] = new Date()
                listOfXml.push(xmlData)
            }
            localStorage.setItem("history_xml_list", JSON.stringify(listOfXml))
        }

        else if (pathname == '/convert/YAML-to-JSON-Converter') {
            var list_of_yaml = []
            try {
                list_of_yaml = JSON.parse(localStorage.getItem("history_yaml_list"))
            }
            catch (error) {

                list_of_yaml = []
            }

            if (input) {
                list_of_yaml = []
                var old_yaml_data = JSON.parse(localStorage.getItem("history_yaml_list"))
                if (old_yaml_data) {
                    for (let k = 0; k < old_yaml_data.length; k++) {
                        var old_yaml = {}
                        var yaml_object = old_yaml_data[k]['data'];
                        var copy = input;
                        if (!(yaml_object === copy)) {
                            var yaml_uuid_1 = uuid()
                            old_yaml['name'] = old_yaml_data[k]['name'];
                            old_yaml['id'] = yaml_uuid_1
                            old_yaml['data'] = yaml_object
                            old_yaml['date'] = old_yaml_data[k]['date'];
                            old_yaml['time'] = old_yaml_data[k]['time'];
                            list_of_yaml.push(old_yaml)
                        }
                    }
                    if (list_of_yaml.length > 9) {
                        list_of_yaml.shift()
                    }
                }
                var yaml_data = {}
                var yaml_uuid = uuid()
                let yaml_name;
                try {
                    yaml_name = input.split('\n')[0]

                }
                catch (e) {
                    yaml_data['name'] = null
                }
                // yaml_data['name'] = "yaml";    
                yaml_data['name'] = yaml_name
                yaml_data['id'] = yaml_uuid;
                yaml_data['data'] = input
                var dateYaml = new Date()
                yaml_data['date'] = dateYaml.getDate() + '-' + months[dateYaml.getMonth()] + '-' + dateYaml.getFullYear()
                yaml_data['time'] = dateYaml.getHours() + ':' + dateYaml.getMinutes()
                // yaml_data['time'] = new Date()
                list_of_yaml.push(yaml_data)
            }
            localStorage.setItem("history_yaml_list", JSON.stringify(list_of_yaml))
        }

        else {
            var list_of_json = []
            try {
                list_of_json = JSON.parse(localStorage.getItem("history_list"))

            }
            catch (error) {

                list_of_json = []
            }

            if (input) {
                list_of_json = []
                var old_data = JSON.parse(localStorage.getItem("history_list"))
                if (old_data) {
                    for (let k = 0; k < old_data.length; k++) {
                        var old_json = {}
                        var object = old_data[k]['data'];
                        var copy = input;
                        if (!(object === copy)) {
                            var history_uuid_1 = uuid()
                            old_json['name'] = old_data[k]['name'];
                            old_json['id'] = history_uuid_1
                            old_json['data'] = object
                            old_json['date'] = old_data[k]['date'];
                            old_json['time'] = old_data[k]['time'];
                            list_of_json.push(old_json)
                        }
                    }
                    if (list_of_json.length > 9) {
                        list_of_json.shift()
                    }
                }
                var json_form = {}
                var history_uuid = uuid()
                try {
                    Object.entries(JSON.parse(input)).map((e) => {
                        json_form['name'] = e[0]
                    })
                }
                catch (e) {
                    json_form['name'] = null
                }
                json_form['id'] = history_uuid;
                json_form['data'] = input
                var dateJson = new Date()
                json_form['date'] = dateJson.getDate() + '-' + months[dateJson.getMonth()] + '-' + dateJson.getFullYear()
                json_form['time'] = dateJson.getHours() + ':' + dateJson.getMinutes()
                list_of_json.push(json_form)
            }
            localStorage.setItem("history_list", JSON.stringify(list_of_json))
        }
    }, [input])



    // useEffect(() => {
    //     if (mode === 'json') {

    //         if (check === 'Format') {
    //             if (mode == 'json') {
    //                 if (value) {
    //                     try {
    //                         var parse = JSON.parse(value)
    //                         var FormatJson = JSON.stringify(parse, null, 4)
    //                         setFormatJson(FormatJson)
    //                         localStorage.setItem('JSON_Data', JSON.stringify(FormatJson))
    //                     }
    //                     catch (err) {
    //                         console.log("error", err)
    //                         var pp = { error: err.message }
    //                         var FormatJson = JSON.stringify(pp)
    //                     }
    //                 }
    //                 else {
    //                     setFormatJson("")
    //                 }
    //             }
    //         }
    //         else if (check === "Minify") {
    //             if (mode == 'json') {
    //                 if (value) {
    //                     try {
    //                         var minify_data = localStorage.getItem('JSON_Data')
    //                         if (minify_data) {
    //                             var FormatJson = JSON.parse(minify_data)
    //                             setFormatJson(FormatJson)
    //                         }
    //                     }
    //                     catch (err) {
    //                         var pp = { error: err.message }
    //                         var FormatJson = JSON.stringify(pp)

    //                     }
    //                 }
    //                 else {
    //                     setFormatJson("")
    //                 }
    //             }
    //         }
    //         else {
    //             // setFormatJson(val)
    //             var dap = JSON.stringify(val)

    //             console.log("val1")

    //             // var data_One = JSON.stringify(value)
    //             // if (data_One) {
    //             //     setFormatJson(JSON.parse(data_One))
    //             // }
    //         }

    //     }
    //     else {
    //         setFormatJson(value)
    //     }

    //     if (mode == 'csv') {
    //         localStorage.setItem('CSV_Data', value)
    //     }

    // }, [val, check])

    return (
        <div className={`${fullscreen ? "hidden" : "block"} w-[100%]`}>
            <div className=' rounded-b-lg'>
                <AceEditor
                    name='testOne'
                    placeholder=""
                    mode={mode}
                    theme="github"
                    onChange={datastate}
                    fontSize={16}
                    value={val}
                    // value={FormatJson}
                    setOptions={{
                        wrap: true,
                        useWorker: false
                    }}
                    onPaste={setInput}

                />

            </div>
        </div>
    )
}

export default SourceInput

