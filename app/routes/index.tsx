import { requireUserID } from '~/utils/auth.server'
import type { LoaderFunction } from '@remix-run/node'

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserID(request)
  return null
}
export default function Index() {
  return (
    <div className="h-screen w-full bg-slate-50">
      <div className="h-12 bg-black">
        <h2 className="font-bold text-xl text-slate-50 grid place-items-center h-full">
          Caloroo
        </h2>
      </div>
    </div>
  )
}
