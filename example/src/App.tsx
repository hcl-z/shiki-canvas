import { useEffect, useRef } from 'react'
import { renderToCanvas } from '../..'
import './App.css'
function App() {
  const ref=useRef<HTMLCanvasElement>(null)
  useEffect(()=>{
    if(!ref.current) return
    renderToCanvas(ref.current,{code:'const a=1',lang:'javascript',theme:'catppuccin-macchiato'},{padding:[10,20]})
  },[])

  return (
    <>
      <canvas ref={ref} id='canvas' style={{width:'100px',height:'100px'}}></canvas>
    </>
  )
}

export default App
