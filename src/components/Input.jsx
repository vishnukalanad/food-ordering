export default function Input({label, id, ...props}) {
    return <p className="flex gap-2 justify-between mt-3">
        <label htmlFor={id} className="text-sm">{label}</label>
        <input className="border border-gray-300 px-[10px] py-[8px] rounded-md w-[250px] text-sm" id={id} name={id} required {...props} />
    </p>
}