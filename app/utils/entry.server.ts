import { prisma } from './prisma.server'
import type { AddEntryForm } from './types.server'

export const createEntry = async (entry: AddEntryForm) => {
  const newEntry = await prisma.foodEntry.create({
    data: {
      title: entry.title,
      foodValues: {
        calories: entry.calories,
        protein: entry.protein,
        carbohydrates: entry.carbohydrates,
        fat: entry.fat,
      },
    },
  })
  return { id: newEntry.id, title: entry.title }
}
