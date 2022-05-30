export interface RegisterForm {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface LoginForm {
  email: string
  password: string
}

export interface AddEntryForm {
  title: string
  units?: string
  calories: number
  protein: number
  carbohydrates: number
  fat: number
  date?: Date
}
