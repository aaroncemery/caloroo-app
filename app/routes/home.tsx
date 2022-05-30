import { requireUserID } from '~/utils/auth.server'
import type { LoaderFunction } from '@remix-run/node'
import { styled } from '@stitches/react'
import { DailyFeed } from '~/components/dailyFeed'
import { Outlet } from '@remix-run/react'

const DashboardContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '330px 1fr',
})

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserID(request)
  return null
}
export default function Home() {
  return (
    <div>
      <Outlet />
      <DashboardContainer>
        <div className="h-screen bg-slate-900">
          <div className="h-12">
            <h2 className="font-bold text-xl text-slate-50 grid place-items-center h-full">
              Daily Log
            </h2>
          </div>
          <DailyFeed />
        </div>
        <div>
          <h2 className="font-bold text-2xl h-12 flex place-items-center place-content-center bg-slate-800 text-white">
            Dashboard
          </h2>
        </div>
      </DashboardContainer>
    </div>
  )
}
