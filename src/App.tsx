//Toast
import { ToastContainer } from "react-toastify"

//Components
import DraftEditor from "./components/DraftEditor"


function App() {

  return (

    <div className="h-screen flex justify-center items-center ">

      <ToastContainer
        theme="colored" position="bottom-left" autoClose={2000} closeOnClick={true}
      />

      <DraftEditor />

    </div>
  )
}

export default App
