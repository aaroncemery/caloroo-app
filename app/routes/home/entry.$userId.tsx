import { Modal } from '~/components/modal'
import { FormField } from '~/components/form-field'
import { useState } from 'react'
import { Button } from '~/components/button'
import { useActionData } from '@remix-run/react'
import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { createEntry } from '~/utils/entry.server'

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const title = form.get('title')
  const calories = form.get('calories')
  const protein = form.get('protein')
  const carbohydrates = form.get('carbohydrates')
  const fat = form.get('fat')

  if (
    typeof title !== 'string' ||
    typeof calories !== 'number' ||
    typeof protein !== 'number' ||
    typeof carbohydrates !== 'number' ||
    typeof fat !== 'number'
  ) {
    return json({ error: 'Invalid Form Data' }, { status: 400 })
  }

  return await createEntry({ title, calories, protein, carbohydrates, fat })
}

export default function FoodEntryModal() {
  const actionData = useActionData()
  const [formData, setFormData] = useState({
    title: actionData?.fields?.title || '',
    calories: actionData?.fields?.calories || '',
    protein: actionData?.fields?.protein || '',
    carbohydrates: actionData?.fields?.carbohydrates || '',
    fat: actionData?.fields?.fat || '',
  })

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
    <Modal isOpen={true}>
      <h2 className="text-xl font-bold text-center">Entry Details</h2>
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
          htmlFor="carbs"
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
        <Button color="teal" borderRadius="medium">
          Add Entry
        </Button>
      </form>
    </Modal>
  )
}
