import './admin.scss';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAppContext } from '/src/context/context.jsx';
import { useAdminGuard } from '/src/services/adminTools.js';
import Loader from '../loader/loader.jsx';

function Admin() {
  const { user } = useAppContext();
  const { loading, isAdmin } = useAdminGuard();
  const navigate = useNavigate();

useEffect(() => {
  if (user === null) return;
  if (!user) {
    navigate('/myAccount');
    return;
  }
}, [user]);


  if (loading) return (
  
  <div className='center main'>
      <Loader />
  </div>

  );

   if (isAdmin) return (
    <div className='main flex-column'>
      <p className='heading'>Panel del Admin</p>
      <div className='function-container'>
        <div className='card-container'><div className='card'><Link to={"/admin/products"}><div className='card2'><p className='p'>Productos</p></div></Link></div></div>
        <div className='card-container'><div className='card'><Link><div className='card2'><p className='p'>Usuarios</p></div></Link></div></div>
        <div className='card-container'><div className='card'><Link><div className='card2'><p className='p'>Promociones</p></div></Link></div></div>
      </div>
    </div>
  );
}

export default Admin;
