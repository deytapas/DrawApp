"use client";

import { useRouter } from "next/navigation"

export default function Home() {

  const router = useRouter();
  return <div style={{
    padding: "5px 100px"
  }}>

    <div style={{
      display:"flex",
      justifyContent: "space-between"
    }}>
      <div>

      </div>
      <div style={{
        display:"flex"
      }}>
        <div style={{
          padding: "5px 10px",
          cursor: 'pointer'
        }} onClick={() => {
          router.push(`/signup`)
        }}>Signup</div>
        <div style={{
          padding: "5px 10px",
          cursor: 'pointer'
        }} onClick={() => {
          router.push(`/signin`)
        }}>Sign in</div>
      </div>
    </div>

  </div>
}

