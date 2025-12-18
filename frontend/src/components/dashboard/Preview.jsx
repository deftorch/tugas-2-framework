import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const CVDocument = React.forwardRef(({ profile }, ref) => (
  <div ref={ref}>
    <div className="grid grid-cols-12 min-h-[1120px]">

      <div className="col-span-4 bg-blue-800 text-white p-8">
        <h3 className="font-bold border-b mb-2">ABOUT ME</h3>
        <p className="text-sm">{profile?.bio}</p>
      </div>

      <div className="col-span-8 p-10">
        <h1 className="text-3xl font-bold">{profile?.full_name}</h1>
      </div>
    </div>
  </div>
));

export default function Preview({ profile }) {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "CV-Mahasiswa",
  });

  return (
    <div>
      <button onClick={handlePrint}>
        Download / Print CV
      </button>

      <CVDocument ref={componentRef} profile={profile} />
    </div>
  );
}
