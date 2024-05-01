"use client"
import React from 'react'
import { HashLoader } from 'react-spinners'

export default function Loading() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <HashLoader color="#EB5017" />
        </div>
    )
}
