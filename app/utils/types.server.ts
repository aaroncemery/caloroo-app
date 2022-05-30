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
  calories: string
  protein: string
  carbohydrates: string
  fat: string
  date?: Date
  user: string
}
