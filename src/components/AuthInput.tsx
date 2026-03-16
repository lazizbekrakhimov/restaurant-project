import { Field } from "@/icons";

interface InputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
}

const AuthInput = ({ type, placeholder, value, onChange }: InputProps) => (
    <Field>
        <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent text-sm text-black placeholder:text-black/30 outline-none transition-all duration-300 focus:placeholder:text-black/10 " />
    </Field>
);

export default AuthInput