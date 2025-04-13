import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';
import toast from 'react-hot-toast';
const initialState={
    pastes:
    localStorage.getItem("pastes")
    ?  JSON.parse(localStorage.getItem("pastes")) : []
}
export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste=action.payload;
      // add a check -> paste already exist or not
      const isDuplicate = state.pastes.some(
        p => p.title.toLowerCase() === paste.title.toLowerCase()
      );
      if (isDuplicate) {
        toast.error("A paste with this title already exists!");
        return; // Stop execution if duplicate
      }
       state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully");
      // Always JSON.stringify when setting localStorage, and always JSON.parse when retrieving — never store raw arrays or objects directly.
    },
    updateToPaste: (state,action) => {
      const paste=action.payload;
      const index=state.pastes.findIndex((item)=>
        item._id === paste._id
    );
      // if index is -ve then it is not present in this state else it is present.
      if(index >=0){
        state.pastes[index]=paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        // both local storage and state will be updated.
        toast.success("Paste Updated");
      }
      
    },
    resetAllPastes: (state, action) => {
      state.pastes=[];
      // here we clear all paste
      localStorage.removeItem("pastes");
      // From local storage also all entries for pastes key will be discarded.
    },
    removeFromPaste:(state,action)=>{
   const pasteId=action.payload;
   console.log(pasteId);
   const index=state.pastes.findIndex((item)=>item._id===pasteId);
   if(index>=0){
    state.pastes.splice(index,1);
    localStorage.setItem("pastes",JSON.stringify(state.pastes));
    toast.success("Paste Deleted");
    // by writing this green tik will be appeared on the toast.
   }
    },
  }
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetAllPastes, removeFromPaste} = pasteSlice.actions

export default pasteSlice.reducer