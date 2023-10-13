import Head from "next/head";
import Image from 'next/image'

const json_val = `{
    "employees": {
        "employee": [
            {
                "name": "William",
                "age": "43",
                "location": "New York, NY",
                "interests": {
                    "interest": [
                        "music",
                        "hiking",
                        "reading"
                    ]
                },
                "profession": {
                    "title": "Software Engineer",
                    "company": "Google"
                }
            },
            {
                "name": "Jane Doe",
                "age": "27",
                "location": "Los Angeles, CA",
                "interests": {
                    "interest": [
                        "surfing",
                        "yoga",
                        "traveling"
                    ]
                },
                "profession": {
                    "title": "Graphic Designer",
                    "company": "Apple"
                }
            }
        ]
    }
  }`

import dynamic from 'next/dynamic'
const AceEditor = dynamic(() => import("react-ace"), {
  ssr: false
})

export default function Content() {
  return (
    <>
      <Head>
        <title>JSON Crack Viewer - Crackes your JSON data into small usable informations.</title>
        <meta name="description" content="JSON Studio helps you Visualize the JSON in easily readable manner, JSON Crack feature provided by JSON Studio helps to view and export the JSON data into Images as well." />
        <meta name='keywords' content="json crack viewer,json tree viewer, json crack viewer online, json tree structure, json crack, json tree, json studio, json formatter" />F
      </Head>
      <div>
        <div className="py-4">
          {/*#FF3D00  */}
          <h1 className="text-[24px] text-black font-bold w-fit mx-auto">JSON Crack Viewer</h1>
        </div>
        <div className="text-[#675D5D]">
          <div className="py-4">
            <div className="flex flex-col gap-4 xl:flex xl:mx-[150px] my-6 mx-4">
              <h2 className="font-bold py-2 text-black">JSON Studio is a free online tool to crack the JSON data structure and view it.</h2>
              {/* <p>JSON Studio is a <span className="font-bold">free online tool to view JSON Data in Tree Format.</span></p> */}
              <p><span className="font-bold">Crack View:</span></p>
              <p>A JSON Crack view is a graphical representation of a hierarchy of data, with a set of nested items that can be expanded or collapsed to show or hide their children. It is often used to display a file system on a computer, or to represent the structure of a database or other information about a parent-child relationship.</p>
              <p>JSON Data:</p>
              <div className="w-[90%] xl:w-[600px]  h-[90%] overflow-hidden">
                <AceEditor
                  readOnly={true}
                  mode="json"
                  theme="github"
                  fontSize={16}
                  value={json_val}
                />
              </div>
              <p>Crack View of the JSON Data:</p>
              <div className="">
                <Image src="/json_studio_chart_view_png.png" width="8980" height="2727" alt="Crack_view_json_data" />
              </div>
              <p>In this JSON Crack view, the root node has two children (Child 1 and Child 2), and each of those children has two sub-children. The JSON Crack view allows the user to expand or collapse each node to show or hide its children, which can be useful for navigating and organizing large amounts of data. JSON Crack viewer can be used by </p>
            </div>
          </div>
          {/* <hr /> */}

          <div className="bg-[#F9E7E2] py-4">
            <div className="flex flex-col gap-4 xl:flex xl:mx-[150px] my-6 mx-4">
              <p className="font-bold py-2 text-black">Common Use cases of JSON Crack View tool:</p>
              <ul className="list-disc pl-10">
                <li>A JSON Crack viewer can be useful for sharing a JSON document with others, as it provides a clear and easy-to-understand representation of the data</li>
                <li>A JSON Cracker can be used to analyze and explore the contents of a JSON document, for example, by searching for specific values or patterns.</li>
                <li>A JSON Crack view can make it easier to understand the structure of a JSON document, especially if it is large or complex.</li>
              </ul>
            </div>
          </div>
          {/* <hr /> */}

          <div className="py-4">
            <div className="flex flex-col gap-4 xl:flex xl:mx-[150px] my-6 mx-4">
              <p className="font-bold py-2 text-black">Features of JSON Crack Viewer:</p>
              <ul className="list-disc pl-10">
                <li>JSON Studio Crack Viewer has an exclusive feature to export JSON structure data to Images.</li>
                <li>With the<span className="font-bold italic">JSON crack viewer tool</span>, you can easily decode the structure of any Complex JSON and understand the connection between the parent JSON Node and Child JSON Node.</li>
                <li>JSON Studio provides a unique feature to share the JSON Structure as an Image to skype, slack, and Microsoft Teams.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}