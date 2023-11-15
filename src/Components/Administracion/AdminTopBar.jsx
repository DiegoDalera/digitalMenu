import './AdminTopBar.css'
import { useContext } from 'react';
import { ProductsContext } from '../Hooks/ProductsContext'


const AdminTopBar = () => {

  const { isAuthenticated, handleLogout } = useContext(ProductsContext);
  
  
  return (
    <div className='admintopBar'>
      {isAuthenticated ? (
        <>
          <span>Administrador Logueado</span>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </>
      ) : (
        <span>No Autenticado</span>
      )}
    </div>
  )
}

export default AdminTopBar;
