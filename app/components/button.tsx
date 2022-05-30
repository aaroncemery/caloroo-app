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
  variants: {
    color: {
      jazzberry: {
        backgroundColor: 'rgb(158 0 89)',
        color: 'white',
        '&:hover': {
          backgroundColor: 'rgb(158 0 89 / .8)',
        },
      },
      tiffanyBlue: {
        backgroundColor: 'rgb(23 190 187)',
        color: 'white',
        '&:hover': {
          backgroundColor: 'rgb(23 190 187 / .8)',
        },
      },
      teal: {
        backgroundColor: 'rgb(12 124 123)',
        color: 'white',
        '&:hover': {
          backgroundColor: 'rgb(12 124 123 / .8)',
        },
      },
      gray: {
        backgroundColor: 'gainsboro',
        '&:hover': {
          backgroundColor: 'lightgray',
        },
      },
    },
    borderRadius: {
      small: {
        borderRadius: '4px',
      },
      medium: {
        borderRadius: '8px',
      },
      large: {
        borderRadius: '12px',
      },
    },
  },
})
