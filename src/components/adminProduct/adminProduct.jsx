import './adminProduct.scss';
import Loader from '../loader/loader';
import { useState } from 'react';
import { useAdminGuard } from '/src/services/adminTools.js';
import { useAppContext } from '/src/context/context.jsx';
import { addProduct } from '/src/services/adminTools.js';

function AdminProduct() {
  const { data, showNotification } = useAppContext();
  const { loading, isAdmin } = useAdminGuard();
  const [add, setAdd] = useState(false);

  const [product, setProduct] = useState({
    name: '',
    description: '',
    dupe: '',
    stock_30ml: '',
    stock_100ml:'',
    notes: '',
    projection: '',
    longevity: '',
    gender: '',
    image_url: '',
    occasion: ''
  });

  const handleChange = (e) => {
    const { placeholder, value } = e.target;
    const map = {
      'Nombre': 'name',
      'Descripción': 'description',
      'Dupe': 'dupe',
      'Stock_30ml': 'stock_30ml',
      'stock_100ml':'stock_100ml',
      'Notas': 'notes',
      'Estela': 'projection',
      'Duración': 'longevity',
      'Género': 'gender',
      'imagen': 'image_url',
      'Ocasión': 'occasion'
    };
    const key = map[placeholder];
    if (key) {
      setProduct((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleAddProduct = async () => {

    const result = await addProduct(product);

    if (result.success) {
      showNotification('Producto agregado con éxito');
      setProduct({
        name: '',
        description: '',
        dupe: '',
        stock_30ml: '',
        stock_100ml:'',
        notes: '',
        projection: '',
        longevity: '',
        gender: '',
        image_url: '',
        occasion: ''
      });
    } else {
      showNotification(result.message || 'Error al agregar el producto');
    }
  };

  if (!data) return <div className='loader-container'><Loader /></div>;
  if (loading) return <div className='loader-container'><Loader /></div>;

  if (isAdmin)
    return (
      <div>
        <p className='heading'>Lista de productos</p>
        <div>
          {data.map(el => (
            <div className='products' key={el.id}>
              <p className='product'>{el.name}</p>
              <p className='product'>{el.dupe}</p>
            </div>
          ))}
        </div>

        {add ? (
          <div className='main'>
            <button className='button' onClick={() => setAdd(false)}>Cancelar</button>
            <div className='container form-container'>
              <form className='form' onSubmit={(e) => e.preventDefault()}>
                {[
                  'Nombre', 'Descripción', 'Dupe', 'Stock_30ml','stock_100ml', 'Notas',
                  'Estela', 'Duración', 'Género', 'imagen', 'Ocasión'
                ].map((placeholder) => (
                  <input
                    key={placeholder}
                    type='text'
                    className='input'
                    placeholder={placeholder}
                    value={product[placeholder.toLowerCase()]}
                    onChange={handleChange}
                  />
                ))}
              </form>
              <button className='button' onClick={handleAddProduct}>
                Agregar producto
              </button>
            </div>
          </div>
        ) : (
          <div className='product-handler'>
            <button className='button' onClick={() => setAdd(true)}>Añadir producto</button>
            <button className='button'>Eliminar producto</button>
          </div>
        )}
      </div>
    );
}

export default AdminProduct;
