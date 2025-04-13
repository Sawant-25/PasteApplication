import React from "react";
import { useState ,useEffect} from "react";
import { useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { addToPaste } from "../redux/pasteSlice";
import { updateToPaste } from "../redux/pasteSlice";
const ViewPage = () => {
   const {id}=useParams();
   const allPastes=useSelector((state)=>state.paste.pastes);
   const paste=allPastes.filter((p)=>p._id===id)[0];
   console.log("Final paste:",paste);
   
    const [title, setTitle] = useState("");
  return (
  //   <div className="bg-[#1e1e1e] min-h-screen px-6 py-8 text-white font-mono">
  //   <div className="flex flex-row gap-7 mt-4 place-content-between">
  //     <input
  //      className="mt-5 rounded-2xl w-[80%] p-5 bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400"
  //       type="text"
  //       placeholder="enter title here"
  //       value={paste.title}
  //       disabled
  //       onChange={(e) => setTitle(e.target.value)}
  //     />
  //     {/*<button>Create My Paste</button> 
  //    THis button name is dependent on the page you visit. If you want to the updation then this button name should be edit.
  //    If you want to create new note then it should be create, in this mannner.
  //    If user is hitting the normal url then paste creation url will be render , if url contains any id along with base url then user want to do the updation, then updation UI will be render. According to it button name will be changed. */}
  //     {/* <button onClick={createPaste} className="mt-5 rounded-2xl">
  //       {pasteId ? "Update My Paste" : "Create My Paste"}
  //     </button> */}
  //   </div>

  //   <div className="flex flex-row gap-7 mt-4">
  //     <textarea
  //       className="rounded-2xl mt-4 min-w-[500px] p-5 bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400"
  //       value={paste.content}
  //       placeholder="Enter content here"
  //       onChange={(e) => setValue(e.target.value)}
  //       disabled
  //       rows={20}
  //     />
  //   </div>
  // </div>

<div className="bg-[#1e1e1e] min-h-screen px-6 py-8 text-white font-mono">
{/* Single div for each paste */}
<div className="bg-[#2a2a2a] border border-gray-600 p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
  {/* Paste Title */}
  <h2 className="text-2xl font-bold text-green-400 mb-4">{paste.title}</h2>

  {/* Paste Content */}
  <pre className="text-sm bg-[#1a1a1a] p-4 rounded text-gray-300 whitespace-pre-wrap break-words">
    {paste.content}
  </pre>

  {/* Display Created At */}
  <p className="text-xs text-gray-500 mt-4">
    Created at: {new Date(paste.createdAt).toLocaleString()}
  </p>
</div>
</div>
  )
}

export default ViewPage
