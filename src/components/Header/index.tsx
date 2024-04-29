import { MaterialSymbolsLocationOn } from "@/icons/location";
import { MaterialSymbolsAccountCircle } from "@/icons/login";
import { FluentEmojiFlatPopcorn } from "@/icons/popcorn";

export default function Header() {
  return (
    <div className="flex py-4 px-8 sm:px-16 text-orange-100 justify-between items-center border-b shadow-gray-50">
      <div className="flex font-mono text-2xl	">
        Show <FluentEmojiFlatPopcorn /> Time{" "}
      </div>
      <div className="flex gap-4 items-center text-black text-sm md:text-base">
        <div>Cinemas</div>
        <div className="flex ">
          <span className="pt-1">
            {" "}
            <MaterialSymbolsLocationOn />{" "}
          </span>{" "}
          <span className="text-black ">Nellore</span>
        </div>
        <div className="text-orange-100">
          <MaterialSymbolsAccountCircle />
        </div>
      </div>
    </div>
  );
}
