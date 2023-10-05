type TInputProps = { className?: string; value?: string; handler?: any, readonly?: boolean, type?: string, name: string, placeholder?: string };

export default function NairaInput({ name, className, value, handler, readonly = false, type = "text", placeholder }: TInputProps) {
    return (
        <div
            className={`flex border-gray-200 flex items-center outline-none border rounded text-gray-400 ${readonly? 'bg-gray-100 border-0':''} ${className}`}>
            <span className="pl-4 pr-1 ">₦</span>
            <input
                name={name}
                className={`outline-none bg-transparent w-full `}
                type={type}
                onChange={handler}
                value={value}
                placeholder={placeholder}
                readOnly={readonly}
            />
        </div>
    )
}
