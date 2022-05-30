import { styled } from '@stitches/react'
import { Button } from './button'

const Overview = styled('div', {
  padding: '16px',
})

export function DailyFeed() {
  return (
    <Overview>
      <div className="px-4 flex flex-row items-center justify-between mb-4">
        <button
          type="button"
          className="material-icons text-slate-50 text-lg inline-block"
        >
          chevron_left
        </button>
        <div className="text-slate-50 text-lg font-semibold">Today</div>
        <button
          type="button"
          className="material-icons text-slate-50 text-lg inline-block"
        >
          chevron_right
        </button>
      </div>
      <Button color="teal" borderRadius="medium">
        <span className="pr-1">+</span>
        Add Entry
      </Button>
    </Overview>
  )
}
