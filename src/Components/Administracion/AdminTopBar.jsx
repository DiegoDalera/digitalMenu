import './AdminTopBar.css'
import { useContext } from 'react';
import { ProductsContext } from '../Hooks/ProductsContext'
import { IoMdExit } from "react-icons/io";


const AdminTopBar = () => {

  const { isAuthenticated, handleLogout } = useContext(ProductsContext);
  
  
  return (
    <div className='admintopBar'>
      {isAuthenticated ? (
        <>
          <span>Administrador Logueado</span>
          <button className='logout' onClick={handleLogout}><IoMdExit background-color="black"  color="white" fontSize="2.5em" /></button>
        </>
      ) : (
        <span>No Autenticado</span>
      )}
    </div>
  )
}

export default AdminTopBar;
