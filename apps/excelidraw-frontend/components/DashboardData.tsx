"use client"

import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../app/config";
import { AddRoom } from "./AddRooom";
import { CreateRoom } from "./CreateRoom";

type userType = {
    name: string,
    username: string,
    password: string,
    photo: string
}

export function DashboardData() {
    const [ users, setUsers ] = useState<userType | null>(null);
    const [ createRoom, setCreateRoom ] = useState(false);
    const [ addRoom, setAddRoom ] = useState(true);
    useEffect(() => {
        const getUserDetails = async () => {
            const tokenn: any = localStorage.getItem("token");
            const response = await axios.get(`${BACKEND_URL}/user/details`,{
                headers: { 'authorization': tokenn }
            });

            setUsers(response.data.user);
        }
        getUserDetails();
    },[])
    return <div style={{
        backgroundColor: "black",
        color: "white"
    }}>
        <div style={{ 
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row"
            }}>
                <div>
                    <h3> {users ? users.name : "loading"} </h3>
                </div>
            </div>
            <div style={{
                display: "flex",
            }}>
                <div style={{
                    border: "1px solid white",
                    padding: "5px 10px",
                    marginRight: "10px",
                    borderRadius: "8px",
                    cursor: "pointer"
                }}>
                    <span onClick={() =>{
                        setAddRoom(true)
                        setCreateRoom(false)
                    }}>Add an room</span>
                </div>
                <div style={{
                    border: "1px solid white",
                    padding: "5px 10px",
                    borderRadius: "8px",
                    cursor: "pointer"
                }}>
                    <span onClick={() =>{
                        setCreateRoom(true)
                        setAddRoom(false);
                        }}> Create a room </span>
                </div>
            </div>
        </div>
        <div style={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            alignItems: "center"
        }}>
           { addRoom ? <AddRoom /> : <CreateRoom /> }
        </div>
    </div>
}