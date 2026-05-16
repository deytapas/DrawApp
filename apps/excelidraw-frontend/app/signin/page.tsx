"use client"

import { useRef } from "react";
import { BACKEND_URL, FONTEND_URL } from "../config";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function signin() {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const route = useRouter();

    async function checkUser() {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value

        if (!email || !password) {
            alert("All fields required");
            return;
        }
        try{
            const result = await axios.post(`${BACKEND_URL}/signin`, {
                username: emailRef.current?.value,
                password: passwordRef.current?.value,
            })

            if(result.data.token != undefined) {
                localStorage.setItem("token", result.data.token)
                route.push(`${FONTEND_URL}/dashboard`);
            } else {
                alert(result.data.message);
            }
        } catch(e) {
            console.log(e);
            
            alert("Incorrect username and password");
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
            color: "white",
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
                Sign in
            </div>
           <input ref={emailRef} style={{
            marginBottom: "5px",
            borderBottom: "1px solid white",
            outline: "none"
           }} type="text"  placeholder="Enter Email" />
           <input ref={passwordRef} style={{
            marginBottom: "5px",
            borderBottom: "1px solid white",
            outline: "none"
           }} type="password"  placeholder="Enter password" />

           <div style={{
            display: "flex",
            justifyContent:"center"
           }}>
            <div onClick={checkUser} style={{
                border: "1px solid",
                padding: "5px 10px",
                backgroundColor: "white",
                color: "black",
                cursor:"pointer"
            }}>
                log in
            </div>
           </div>
        </div>
    </div>
}