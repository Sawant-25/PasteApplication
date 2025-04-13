import React from "react";
import { useState ,useEffect} from "react";
import { useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { addToPaste } from "../redux/pasteSlice";
import { updateToPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  // to get the id from the url to hit that UI, we use useParams()
  const pasteId = searchParams.get("pasteId");
const dispatch=useDispatch();
const allPastes=useSelector((state)=> state.paste.pastes);

 // when edit btn is clicked it will load home page again,to edit the content, to show the content of that paste, we write this below code
    // while redirected from the Pastes route to home route pasteId will change, that's the reason it will not show the content of that paste, 
    // but for edit option to show the content for updation,we need to provide the old content.
    // when pasteId changes, then check pasteId exist or not,if yes then from all Pastes find the appropriate paste based on the comparison of id.
    // Then title and content will be shown of that paste
    // 
    useEffect(()=>{
      if(pasteId){
        const paste=allPastes.find((p)=>p._id===pasteId);
        setTitle(paste.title);
        setValue(paste.content);
      }
    },[pasteId])
  function createPaste() {
    if (!title.trim() || !value.trim()) {
      toast("⚠️ Please fill in both the title and content before submitting.");
      return;
    }
    const paste={
      title:title,
      content:value,
      _id:pasteId || Date.now().toString(36),
      // if id is present, then it will take this id, else it will create the id based the current date in the form of string and pickup any random characters of this as id.
      createdAt:new Date().toISOString(),
    }
   
    // this information will be stored in local storage to retrieve in future and show as the list of pastes you created.
    if(pasteId){
// if available means, it is created and now you want to update it. Then we dispatch the action from the reducers
// here we dispatch the action of addToPaste from the reducer.
dispatch(updateToPaste(paste));

    }
    else{
// if not present, then create the new paste.
dispatch(addToPaste(paste));
    }

    // after creation or updation clear the textfield
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="p-8 min-h-screen bg-[#0f0f0f] text-white font-mono">
      <div  className="flex items-center gap-4 mb-4">
        <input
         className="flex-1 bg-[#1e1e1e] text-white p-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/*<button>Create My Paste</button> 
       THis button name is dependent on the page you visit. If you want to the updation then this button name should be edit.
       If you want to create new note then it should be create, in this mannner.
       If user is hitting the normal url then paste creation url will be render , if url contains any id along with base url then user want to do the updation, then updation UI will be render. According to it button name will be changed. */}
        <button onClick={createPaste}
        className="bg-blue-600 hover:bg-blue-700 transition-all px-6 py-3 rounded-lg font-semibold"
         >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="relative bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-700">
      <div className="flex items-center px-4 py-2 bg-[#2e2e2e] border-b border-gray-600">
      <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
      <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
      <span className="w-3 h-3 rounded-full bg-green-500"></span>
    </div>
        <textarea
          className="w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] 
          bg-transparent text-white px-4 py-2 font-mono text-sm resize-none 
          focus:outline-none"
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={34}
        />
      </div>
    </div>
  );
};

export default Home;
