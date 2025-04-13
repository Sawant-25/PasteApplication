import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import {
  Pencil,
  Eye,
  Trash,
  Copy,
  Share2,
  Search
} from "lucide-react";

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(pastes);
  const dispatch = useDispatch();
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }
  return (
    <div className="px-6 py-8 bg-[#1e1e1e] min-h-screen text-white font-mono">
      <input
        className="p-3 rounded-xl w-full max-w-xl bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        type="search"
        placeholder="🔍 Search Paste by Title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-6 mt-8">
        {filteredData.length > 0 ?(
          filteredData.map((paste) => (
          
              <div
              key={paste._id}
              className="bg-[#2a2a2a] border border-gray-600 p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-200"
            >
               <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-green-400 mb-2">{paste.title}</h2>
              <div className="flex flex-wrap gap-4 mb-2">
                <NavLink
                  to={`/?pasteId=${paste._id}`}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-lg text-sm"
                >
                   <Pencil size={16} /><span>Edit</span>
                </NavLink>
                <NavLink
                  to={`/pastes/${paste._id}`}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded-lg text-sm"
                >
                   <Eye size={16} /> <span>View</span>
                </NavLink>
                <button
                  onClick={() => handleDelete(paste._id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg text-sm"
                >
                  <Trash size={16} /> <span>Delete</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to clipboard!");
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 px-4 py-1 rounded-lg text-sm"
                >
                  <Copy size={16} /><span>Copy</span>
                </button>
                <button
                  onClick={() => {
                    const shareUrl = `${window.location.origin}/?pasteId=${paste._id}`;
                    navigator.clipboard.writeText(shareUrl);
                    toast.success("Shareable link copied!");
                  }}
                  className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-lg text-sm"
                >
                  <Share2 size={16} /><span>Share</span>
                </button>
              </div>
              </div>
              <pre className="text-sm bg-[#1a1a1a] p-4 rounded text-gray-300 whitespace-pre-wrap break-words mb-4">
                {paste.content}
              </pre>
                {/* <div>{paste.title}</div>
                <div>{paste.content}</div> */}
                {/* <div className="flex flex-row gap-4 place-content-evenly">
                  <button>
                    <NavLink to={`/?pasteId=${paste?._id}`}>Edit</NavLink>
                  </button>
                  <button>
                    <NavLink to={`/pastes/${paste?._id}`}>View</NavLink>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => {
                      const shareUrl = `${window.location.origin}/?pasteId=${paste?._id}`;
                      navigator.clipboard.writeText(shareUrl);
                      toast.success("Shareable link copied!");
                    }}
                  >
                    Share
                  </button>
                </div> */}
                

          <p className="text-xs text-gray-500">
                Created at: {new Date(paste.createdAt).toLocaleString()}
              </p>
            </div>
          ) )
            ): searchTerm.trim() ? (
              <p className="text-gray-400 mt-10 text-center">No pastes found for your search.</p>
            ) : (
              <p className="text-gray-400 mt-10 text-center">No pastes available. Start by adding your paste!</p>
            )}
      </div>
    </div>
  );
};

export default Pastes;
