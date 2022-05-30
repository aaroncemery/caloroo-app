import { Modal } from '~/components/modal'
import { FormField } from '~/components/form-field'
import { useState } from 'react'
import { Button } from '~/components/button'
import { useActionData, useLoaderData } from '@remix-run/react'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import { createEntry } from '~/utils/entry.server'
import { getUser, requireUserID } from '~/utils/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request)
  return json({ user })
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const title = form.get('title')
  const calories = form.get('calories')
  const protein = form.get('protein')
  const carbohydrates = form.get('carbohydrates')
  const fat = form.get('fat')
  const user = await requireUserID(request)

  if (
    typeof title !== 'string' ||
    typeof calories !== 'string' ||
    typeof protein !== 'string' ||
    typeof carbohydrates !== 'string' ||
    typeof fat !== 'string'
  ) {
    return json({ error: 'Invalid Form Data' }, { status: 400 })
  }

  await createEntry({
    title,
    calories,
    protein,
    carbohydrates,
    fat,
    user,
  })
  return redirect('/home')
}

export default function FoodEntryModal() {
  const actionData = useActionData()
  const [formError] = useState(actionData?.error || '')
  const [formData, setFormData] = useState({
    title: actionData?.fields?.title || '',
    calories: actionData?.fields?.calories || '',
    protein: actionData?.fields?.protein || '',
    carbohydrates: actionData?.fields?.carbohydrates || '',
    fat: actionData?.fields?.fat || '',
  })
  const { user } = useLoaderData()

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string | number
  ) => {
    setFormData(form => ({
      ...form,
      [field]: event.target.value,
    }))
  }
  return (
    <Modal isOpen={true}>
      <h2 className="text-xl font-bold text-center">Entry Details</h2>
      <div>{formError}</div>
      <form method="post">
        <FormField
          htmlFor="title"
          label="Title"
          value={formData.title}
          onChange={e => handleInputChange(e, 'title')}
        />
        <FormField
          htmlFor="calories"
          type="number"
          label="Calories"
          value={formData.calories}
          onChange={e => handleInputChange(e, 'calories')}
        />
        <FormField
          htmlFor="protein"
          type="number"
          label="Protein"
          value={formData.protein}
          onChange={e => handleInputChange(e, 'protein')}
        />
        <FormField
          htmlFor="carbohydrates"
          type="number"
          label="Carbohydrates"
          value={formData.carbohydrates}
          onChange={e => handleInputChange(e, 'carbohydrates')}
        />
        <FormField
          htmlFor="fat"
          type="number"
          label="Fat"
          value={formData.fat}
          onChange={e => handleInputChange(e, 'fat')}
        />
        <Button type="submit" color="teal" borderRadius="medium">
          Add Entry
        </Button>
      </form>
    </Modal>
  )
}
