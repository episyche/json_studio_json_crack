import { chartToolsContext, globalRightToolsContext, jsonContext } from "../contextapi/context";
// import { chartToolsContext, globalRightToolsContext, jsonContext } from ".././contextapi/context";
import Header from "../components/Layout/Header";
import SourceTopOptionOne from "../components/Options/LeftTopBar/SourceTopOptionOne";
import DesTopOptionOne from "../components/Options/RightTopBar/DesTopOptionOne";
import dynamic from "next/dynamic";
import ChartTools from "../components/Pages/View/Tree/Options/index";
import { LstorageUpdate } from "../contextapi/context"
import { lclstgValue } from "../contextapi/reducertypes";
import Content from "../components/Pages/View/Tree/Options/Content";
const Graph = dynamic(() => import('../components/Pages/View/Tree'), { ssr: false });
const SourceInput = dynamic(() => import("../components/SourceInput"), { ssr: false });
import Footer from "../components/Layout/Footer";
import Form from "../components/Layout/Form";

import { useState, useEffect } from "react";
import { setUserInput } from "../contextapi/reducertypes";

export default function TreeView() {
  const { chartToolsState: { direction, firstNodePosition: { x } }, dispatchChartToolsState } = chartToolsContext();
  const { globalRightToolsState: { fullscreen, inputScreen } } = globalRightToolsContext();
  const { lclStorage: { Updatejson }, dispatchlclStorage } = LstorageUpdate()
  const [check, setCheck] = useState('none');
  const [jsondata, setJsonData] = useState(null);
  const { jsonState: { userInput }, dispatchJsonState } = jsonContext();


  useEffect(() => {
    setJsonData(JSON.parse(localStorage.getItem("JSON_Data")))
  }, [Updatejson])

  useEffect(() => {
    if (jsondata != null) {
      localStorage.setItem("JSON_Data", JSON.stringify(jsondata))
      dispatchJsonState({ type: setUserInput, payload: jsondata })
    }
    setJsonData(JSON.parse(localStorage.getItem("JSON_Data")))
  }, [jsondata])

  //For Upload JSON and read
  useEffect(() => {
    var importedFile = document.getElementById('uploadFile');
    if (importedFile) {
      importedFile.addEventListener('change', function () {
        var imported_Json_File = document.getElementById('uploadFile').files[0]
        try {
          // var fileContent = JSON.parse(importedFile.value);
          let reader = new FileReader();
          reader.readAsText(imported_Json_File);
          reader.onload = function () {
            let data = JSON.parse(reader.result);
            var pp = JSON.stringify(data)
            localStorage.setItem("JSON_Data", JSON.stringify(pp, null, 2))
            setJsonData(JSON.stringify(data))
          };
        }
        catch (e) {
          console.log("error", e)
        }

      })
    }
  }, [])

  // For format 
  useEffect(() => {
    var Format = document.getElementById("Format")
    var FormatMob = document.getElementById("FormatMob")
    var Minify = document.getElementById('Minify')
    var MinifyMob = document.getElementById('MinifyMob')
    if (Format) {
      Format.addEventListener('click', function () {
        if (Format) {
          if (check === 'none' || check === 'Minify') {
            var lcl = localStorage.getItem("JSON_Data")
            var parse = JSON.parse(lcl)
            var FormatJson = JSON.stringify(JSON.parse(parse), null, 4)
            dispatchlclStorage({ type: lclstgValue, payload: FormatJson })
            setJsonData(FormatJson)
            setCheck('Format')
          }
        }
      })
    }
    if (FormatMob) {
      FormatMob.addEventListener('click', function () {
        if (FormatMob) {
          if (check === 'none' || check === 'Minify') {
            setCheck('Format')
          }
        }
      })
    }

    if (Minify) {
      Minify.addEventListener('click', function () {

        if (Format) {
          if (check === 'none' || check === 'Format') {
            setCheck('Minify')
          }

        }
      })
    }
    if (MinifyMob) {
      MinifyMob.addEventListener('click', function () {

        if (MinifyMob) {
          if (check === 'none' || check === 'Format') {
            setCheck('Minify')
          }

        }
      })
    }
  }, [])


  const finalPl = (e) => {
    setJsonData(e)
    localStorage.setItem("JSON_Data", JSON.stringify(e))
  }

  return (
    <>
      <div className='p-0 m-0 h-[100vh]'>
        <div>
          <Header />
        </div>
        <div className="border border-[#FFF8F8] bg-[#FFF8F8]">
          <div className={`xl:flex xl:mx-[20px] gap-6 my-6 mx-auto`}>
            <div className={`${fullscreen ? 'hidden' : 'block'} ${inputScreen ? 'w-[100%]' : 'xl:w-[45%]'} mx-2 xl:mx-0 border rounded-t-lg`}>
              <SourceTopOptionOne />
              <SourceInput mode={'json'} datastate={finalPl} val={jsondata} check={check} />
            </div>
            <div className={`${fullscreen || inputScreen ? 'hidden' : 'block'} h-fit m-auto xl:w-[8%]`}>
          
            </div>
            <div className={`${fullscreen ? 'xl:w-[100%]' : 'xl:w-[44%]'} ${inputScreen ? 'hidden' : 'block'} mx-2 xl:mx-0 border rounded-t-lg`}>
              <div className="flex items-center h-[49px] justify-between bg-[#BCBCBC]  rounded-t-lg">
                <div>
                <ChartTools />

                </div>
                <div className="mr-[10px]">
                  <DesTopOptionOne />
                </div>
              </div>
              <div className=" h-fit bg-white">
                {direction === "RIGHT" ? <Graph direction={"RIGHT"} /> : ''}
                {direction === "DOWN" ? <Graph direction={"DOWN"} /> : ''}
                {direction === "UP" ? <Graph direction={"UP"} /> : ''}
                {direction === "LEFT" ? <Graph direction={"LEFT"} /> : ''}
              </div>
            </div>
          </div>
        </div>
        <div>
          <Content />
        </div>
        <div>
          <Form />
        </div>
        <div>
          <Footer />
        </div>
      </div>

    </>
  );
}