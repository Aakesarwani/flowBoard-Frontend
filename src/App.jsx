import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './css/custom-scrollbar.css'
import CssBaseLine from '@mui/material/CssBaseline'
import { ThemeProvider ,createTheme} from '@mui/material/styles'
import AppLayout from "./components/layout/AppLayout.jsx"
import AuthLayout from "./components/layout/AuthLayout.jsx";
import {BrowserRouter, Route,Routes} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Board from "./pages/Board.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import { dark } from '@mui/material/styles/createPalette'

function App() {

  const theme=createTheme({
    palette:{mode:'dark'}
  })
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseLine/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout/>}>
            <Route path ='login' element={<Login/>}/>
            <Route path='signup' element={<Signup/>}/>
          </Route>
          <Route path='/' element={<AppLayout/>}>
            <Route index element={<Home/>}/>
            <Route path='boards' element={<Home/>}/>
            <Route path='boards/:boardId' element={<Board/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
