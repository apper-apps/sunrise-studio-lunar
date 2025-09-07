import Label from "@/components/atoms/Label"
import Input from "@/components/atoms/Input"

const FormField = ({ 
  label, 
  error, 
  required,
  className = "",
  ...inputProps 
}) => {
  return (
    <div className={className}>
      <Label required={required}>{label}</Label>
      <Input error={error} {...inputProps} />
      {error && (
        <p className="mt-1 text-sm text-coral-400">{error}</p>
      )}
    </div>
  )
}

export default FormField