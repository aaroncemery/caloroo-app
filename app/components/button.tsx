import { styled } from '@stitches/react'

export const Button = styled('button', {
  width: '100%',
  backgroundColor: 'black',
  borderRadius: '9999px',
  fontSize: '16px',
  color: 'white',
  fontWeight: '600',
  marginTop: '8px',
  padding: '12px',
  transitionProperty: 'background-color',
  transitionTimingFunction: 'ease-in-out',
  transitionDuration: '300ms',
  '&:hover': {
    backgroundColor: 'rgb(30 41 59 / var(--tw-bg-opacity))',
    cursor: 'pointer',
  },
})
