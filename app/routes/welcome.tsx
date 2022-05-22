import { Layout } from '~/components/layout'
import { FormField } from '~/components/form-field'
import React, { useEffect, useState, useRef } from 'react'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  validateEmail,
  validatePassword,
  validateName,
} from '~/utils/validators.server'
import { login, register } from '~/utils/auth.server'
import { useActionData } from '@remix-run/react'
import { getUser } from '~/utils/auth.server'
import { Button } from '~/components/button'
import { keyframes, styled } from '@stitches/react'

const AnimateBackground = keyframes({
  '0%': {
    backgroundPosition: '9% 0%',
  },
  '50%': {
    backgroundPosition: '92% 100%',
  },
  '100%': {
    backgroundPosition: '9% 0%',
  },
})

const Background = styled('div', {
  background: 'linear-gradient(198deg, tomato, coral, blueviolet)',
  backgroundSize: '600% 600%',

  animation: `${AnimateBackground} 48s ease infinite`,
})

export const loader: LoaderFunction = async ({ request }) => {
  return (await getUser(request)) ? redirect('/') : null
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const action = form.get('_action')
  const email = form.get('email')
  const password = form.get('password')
  let firstName = form.get('firstName')
  let lastName = form.get('lastName')

  if (
    typeof action !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    return json({ error: 'Invalid Form Data', form: action }, { status: 400 })
  }

  if (
    action === 'register' &&
    (typeof firstName !== 'string' || typeof lastName !== 'string')
  ) {
    return json({ error: 'Invalid Form Data', form: action }, { status: 400 })
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action === 'register'
      ? {
          firstName: validateName((firstName as string) || ''),
          lastName: validateName((lastName as string) || ''),
        }
      : {}),
  }

  if (Object.values(errors).some(Boolean))
    return json(
      {
        errors,
        fields: { email, password, firstName, lastName },
        form: action,
      },
      { status: 400 }
    )

  switch (action) {
    case 'login': {
      return await login({ email, password })
    }
    case 'register': {
      firstName = firstName as string
      lastName = lastName as string
      return await register({ email, password, firstName, lastName })
    }
    default:
      return json({ error: 'Invalid Form Data' }, { status: 400 })
  }
}
export default function Welcome() {
  const actionData = useActionData()
  const [formError, setFormError] = useState(actionData?.error || '')
  const [errors, setErrors] = useState(actionData?.errors || '')
  const firstLoad = useRef(true)

  const [action, setAction] = useState('login')
  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || '',
    password: actionData?.fields?.password || '',
    firstName: actionData?.fields?.firstName || '',
    lastName: actionData?.fields?.lastName || '',
  })

  useEffect(() => {
    // Clear the form if we switch forms
    if (!firstLoad.current) {
      const newState = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      }
      setErrors(newState)
      setFormError('')
      setFormData(newState)
    }
  }, [action])

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError('')
    }
  }, [formData])

  useEffect(() => {
    firstLoad.current = false
  }, [])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData(form => ({
      ...form,
      [field]: event.target.value,
    }))
  }
  return (
    <Layout>
      <Background className="h-full flex justify-center items-center flex-col gap-y-4">
        <div className="bg-white rounded-lg py-6 px-4 w-96 shadow-lg border border-slate-200">
          <h2 className="text-2xl font-extrabold text-slate-600 pb-6">
            {action === 'login'
              ? 'Log in To Continue'
              : 'Sign Up To Get Started'}
          </h2>
          <form method="post">
            <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
              {formError}
            </div>
            <FormField
              htmlFor="email"
              label="Email"
              value={formData.email}
              onChange={e => handleInputChange(e, 'email')}
              error={errors?.email}
            />
            <FormField
              htmlFor="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={e => handleInputChange(e, 'password')}
              error={errors?.password}
            />

            {action !== 'login' ? (
              <>
                <FormField
                  htmlFor="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={e => handleInputChange(e, 'firstName')}
                  error={errors?.firstName}
                />
                <FormField
                  htmlFor="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={e => handleInputChange(e, 'lastName')}
                  error={errors?.lastName}
                />
              </>
            ) : null}

            <div className="w-full text-center">
              <Button type="submit" name="_action" value={action}>
                {action === 'login' ? 'Log In' : 'Sign Up'}
              </Button>
              <div className="text-base text-slate-800 font-normal mt-6">
                {action === 'login'
                  ? `Don't have an account?`
                  : 'Already have an account?'}
                <button
                  type="button"
                  onClick={() =>
                    setAction(action == 'login' ? 'register' : 'login')
                  }
                  className="inline-block text-base text-blue-500 font-normal pl-1"
                >
                  {action === 'login' ? 'Sign Up' : 'Log In'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Background>
      <div className="bg-slate-100 w-full">
        <h2>Text here</h2>
      </div>
    </Layout>
  )
}
