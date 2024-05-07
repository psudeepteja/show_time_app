"use client"
import React ,{useState} from 'react'
import { MaterialSymbolsLocationOn } from "@/icons/location";
import { MaterialSymbolsAccountCircle } from "@/icons/login";
import { FluentEmojiFlatPopcorn } from "@/icons/popcorn";
import { useRouter } from "next/navigation";
// import Location from "../Location/Location";

export default function Header() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex py-4 px-8 sm:px-16 text-orange-100 justify-between items-center border-b shadow-gray-50">
      <div className="flex font-mono text-2xl	cursor-pointer" onClick={() => { router.push('/') }}>
        Show <FluentEmojiFlatPopcorn /> Time{" "}
      </div>
      <div className="flex gap-4 items-center text-black text-sm md:text-base">
        <div onClick={() => router.push('/cinemas/nellore')} className="cursor-pointer">Cinemas</div>
        <div className="flex" onClick={()=> setIsOpen(true)}>
          <span className="pt-0.5 md:pt-1">
            {" "}
            <MaterialSymbolsLocationOn />{" "}
          </span>{" "}
          <span className="text-black">
            {/* <Location isOpen={isOpen} /> */}
            Nellore
          </span>
        </div>
        <div className="text-orange-100">
          <MaterialSymbolsAccountCircle />
        </div>
      </div>
    </div>
  );
}
