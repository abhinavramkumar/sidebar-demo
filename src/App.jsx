import React, { useState } from 'react'
import Sidebar from './Sidebar'

const testItems = [
  {
    name: "ONE",
    children: [{
      name: "ONE - A",
      children: [{
        name: "ONE A 1",
        children: [{
          name: "ONE A 1 - 1",
          href: "/item-3"
        },
        {
          name: "ONE A 1 - 2",
          href: "/item-4"
        }]
      },
      {
        name: "ONE B",
        href: "/item-3"
      },
      {
        name: "ONE C",
        href: "/item-4"
      }]
    }]

  },
  {
    name: "TWO",
    children: [{
      name: "TWO A",
      children: [
        {
          name: "TWO A 1",
          href: "/item-1"
        },
        {
          name: "TWO A 2",
          href: "/item-2"
        },
        {
          name: "TWO A 3",
          href: "/item-3"
        },
      ]
    }]
  },
]

function App() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      position: "relative"
    }}>
      <button onClick={() => setOpen(prevState => !prevState)}>Toggle Navbar</button>
      <Sidebar styles={{
        container: "w-1/4 absolute top-0 left-0",
        accordion: {
          button: "block w-full border-none rounded-none hover:bg-gray-100 text-left",
          container: "overflow-x-auto",
          summary: ""
        }
      }} open={open} setOpen={() => setOpen(prevState => !prevState)} items={testItems} />
    </div>
  )
}

export default App
