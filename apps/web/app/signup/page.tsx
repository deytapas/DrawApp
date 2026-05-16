"use client"

import axios from "axios";
import { useRef } from "react"
import { BACKEND_URL,FONTEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function signup() {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const nRef = useRef<HTMLInputElement>(null);
    const route = useRouter();

    async function insertData() {
         const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const name = nRef.current?.value;

        if (!email || !password || !name) {
            alert("All fields required");
            return;
        }
        try{
            const result = await axios.post(`${BACKEND_URL}/signup`, {
                username: emailRef.current?.value,
                password: passwordRef.current?.value,
                name: nRef.current?.value
            })

            if(result.data.userId != undefined) {
                route.push(`${FONTEND_URL}/signin`);
            } else {
                alert(result.data.message);
            }
        } catch(e) {
            console.log(e);
        }
    }

    return <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100vh',
        backgroundColor: "black" 
    }}>
        <div style={{
            border:"1px solid white",
            padding:"10px",
            borderRadius:"5px",
            display:"flex",
            flexDirection: "column",
        }}>
            <div style={{
                display:"flex",
                padding: "5px",
                color: "white",
                textAlign: 'center',
                justifyContent: "center"
            }}>
                Sign Up
            </div>
           <input ref={emailRef} style={{
            marginBottom: "5px"
           }} type="text"  placeholder="Enter Email" />
           <input ref={nRef} style={{
            marginBottom: "5px"
           }} type="text"  placeholder="Enter Name" />
           <input ref={passwordRef} style={{
            marginBottom: "5px"
           }} type="password"  placeholder="Enter password" />

           <div style={{
            display: "flex",
            justifyContent:"center"
           }}>
            <div style={{
                border: "1px solid",
                padding: "5px 10px",
                backgroundColor: "white",
                color: "black",
                cursor:"pointer"
            }} onClick={insertData}>
                Sign Up
            </div>
           </div>
        </div>
    </div>
}