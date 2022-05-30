import { useEffect, useState } from 'react'
import { styled } from '@stitches/react'

const Input = styled('input', {
  width: '100%',
  padding: '12px',
  borderRadius: '12px',
  boxShadow: '0 0 2px rgb(148 163 184)',
  transition: 'all 150ms ease',
  '&:focus': {
    outlineColor: 'black',
    '&~label': {
      transform: 'translateY(-34px) scale(0.9)',
    },
  },
  '&~label': {
    position: 'absolute',
    color: 'black',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '1.25',
    backgroundColor: 'white',
    left: '16px',
    padding: '0 4px',
    top: '50%',
    transform: 'translateY(-50%)',
    transformOrigin: 'left',
    transitionProperty: 'translate scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: '150ms',
  },
  '&::placeholder': {
    color: 'transparent',
  },
  '&:not(:placeholder-shown)': {
    '&~label': {
      transform: 'translateY(-34px)  scale(0.9)',
    },
  },
  '&.error': {
    outlineColor: 'red',
    boxShadow: '0 0 1px hsl(0, 100%, 50%)',
    '&~label': {
      color: 'red',
    },
  },
})

interface FormFieldProps {
  htmlFor: string
  label: string
  type?: string
  value: any
  onChange?: (...args: any) => any
  error?: string
}

export function FormField({
  htmlFor,
  label,
  type = 'text',
  value,
  onChange = () => {},
  error = '',
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error)

  useEffect(() => {
    setErrorText(error)
  }, [error])

  return (
    <div className="relative my-4">
      <Input
        onChange={e => {
          onChange(e)
          setErrorText('')
        }}
        type={type}
        id={htmlFor}
        name={htmlFor}
        value={value}
        placeholder={htmlFor}
        autoComplete="off"
        className={errorText ? 'error' : ''}
      />
      <label htmlFor={htmlFor}>{errorText || label}</label>
    </div>
  )
}
