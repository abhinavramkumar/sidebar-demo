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
  const [count, setCount] = useState(0)

  return (
    <div style={{
      height: "100vh",
      width: "100vw"
    }}>
      <Sidebar open={false} setOpen={() => { }} items={testItems}>

      </Sidebar>
    </div>
  )
}

export default App
