import { MoreSVG, DeleteSVG, RenameSVG, CalenderFolderSVG, FolderIconSMSVG, EyeSVG } from "assets/jsx-svg";

import React,{useState,useEffect} from 'react'
export default function FolderTreeCard({folderName}){
    return <div style={{width:'100%',display:'flex'}}>
    <div style={{marginRight:5}}>
        <FolderIconSMSVG style={{ height: 20 }} />
    </div>
    <div>{folderName}</div>
    </div>
    }