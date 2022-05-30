import { json } from '@remix-run/node'
import { prisma } from './prisma.server'
import type { AddEntryForm } from './types.server'

export const createEntry = async (entry: AddEntryForm) => {
  console.log('in entry server')

  return prisma.foodEntry.create({
    data: {
      title: entry.title,
      foodValues: {
        calories: entry.calories,
        protein: entry.protein,
        carbohydrates: entry.carbohydrates,
        fat: entry.fat,
      },
      user: {
        connect: {
          id: entry.user,
        },
      },
    },
  })
}

export const getUserEntries = async (userId: string) => {
  const entries = await prisma.foodEntry.findMany({
    where: { userId: userId },
  })

  if (entries.length === 0) {
    return json({ message: 'No entries yet.' })
  }

  return entries
}
