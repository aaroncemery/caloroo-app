import React from 'react'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full bg-white">
      <div className="w-full h-12 bg-black fixed top-0 left-0 opacity-90">
        <h2 className="font-bold text-xl text-slate-50 grid place-items-center h-full">
          Caloroo
        </h2>
      </div>
      {children}
    </div>
  )
}
