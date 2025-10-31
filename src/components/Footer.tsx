import logoImage from "figma:asset/290da8987c9026f76a099f1ba7c8d1651478df93.png";
import { FLOW_NETWORK } from "../lib/flow-config";

export function Footer() {
  return (
    <footer className="relative border-t-2 border-black bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-white p-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <img src={logoImage} alt="InOrOut" className="h-full w-full object-contain" />
            </div>
            <div className="text-center sm:text-left">
              <div className="text-gray-900">InOrOut</div>
              <div className="text-xs text-gray-500 sm:text-sm">© 2025 All rights reserved</div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                <div className={`h-1.5 w-1.5 rounded-full ${FLOW_NETWORK === 'mainnet' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                <span>Powered by Flow • {FLOW_NETWORK}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-6 text-sm sm:gap-10">
            <a href="/" className="text-gray-600 transition-colors hover:text-black">
              About
            </a>
            <a href="/explorer" className="text-gray-600 transition-colors hover:text-black">
              History
            </a>
            <a href="/" className="text-gray-600 transition-colors hover:text-black">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
