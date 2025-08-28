import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import TypingView from "./pages/TypingView"
import ResultsView from "./pages/ResultsView"
import NotFound from "./pages/NotFound"

function App() {

  return (
    <BrowserRouter>
      <div className="min-h-dvh bg-blue-950 m-0 p-0">
        <Header></Header>
        <Routes>
          <Route element={<TypingView/>} path="/"/>
          <Route element={<ResultsView/>} path="/result/:id"/>
          <Route element={<NotFound/>} path="*"/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
