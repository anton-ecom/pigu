import { Link } from "react-router";

export function CallToAction({size}: {size?: number }) {
  return (
       <div       
        className={`relative  bg-gradient-to-br from-[#1B45B4]  to-[#1C2792]  h-[${size || 500}px] w-full  flex flex-col items-center justify-center bg-cover px-4`}
      >    
        <div className="flex flex-col items-center  space-y-6">
          <div className="md:text-[50px] font-bold mb-10 text-white text-4xl text-center ">
            Start growing your marketplace channel today
          </div>

          <div className="flex md:flex-row flex-col md:space-x-2 space-y-4 md:space-y-0 w-full md:justify-center">
            <button type="button" className="btn btn-outline-white btn-pill w-full md:w-auto">
              Request Demo
            </button>

            <button type="button" className="btn btn-black btn-pill ">
              Schedule free call
            </button>
          </div>
        </div>
      </div>
  );
}
