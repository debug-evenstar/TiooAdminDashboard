
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/ReactToastify.min.css'

import './toast.css';
export default function Notification() {
  return (
    <ToastContainer 
        position="top-right"
        autoClose={3000} // Duration in milliseconds
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover    
        theme="light"       
        progressClassName="bg-main"
        progressStyle={{backgroundColor: '#5A51E6'}}
    />
  )
}


export const notify = {
    success: (message:string) => {
      toast.success(message);
    },
    error: (message:string) => {
      toast.error(message);
    },
    info: (message:string) => {
      toast.info(message);
    },
    // You can add more notification types (warning, etc.) as needed
  };