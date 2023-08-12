type TInputProps = { className?: string; value?: string; readonly: boolean, type?: string, name: string, placeholder?: string, label?: string };

export default function Input({ name, className = "w-full", value, readonly = false, type = "text", placeholder, label }: TInputProps) {
    return (
        <div className="flex space-y-2 flex-col">
            <label className="text-gray-400  text-sm">{label}</label>
            <input
                name={name}
                className={`border-gray-400 outline-none border rounded py-1.5 px-3 text-gray-400 ${className}`}
                type={type}
                value={value}
                placeholder={placeholder}
                readOnly={readonly}
            />
        </div>
    )
}
