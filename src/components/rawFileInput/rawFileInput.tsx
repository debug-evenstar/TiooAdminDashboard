import { ChangeEvent } from "react";

export default function RawFileInput({setSelection}: any){
    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files?.[0];
      setSelection(file || null);
    }
  
	return (
          <input type="file" onChange={handleFileSelect}  accept=".png,.jpg,.jpeg,.bmp,.tga,.webp" name="name" className="mt-1 outline-none rounded text-xs w-full px-3 py-1.5 border" />
	);
}