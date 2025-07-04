import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '/src/context/context';
import { supabase } from '../lib/supabase';

export async function checkIfAdmin(uid) {
  const { data, error } = await supabase.rpc('admin_access', {
    uid
  });

  if (error) {
    console.error('Error checking admin status:', error);
    return false;
  }

  return data; 
}

export function useAdminGuard() {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user === null) return;

    if (!user) {
      navigate('/myAccount');
      return;
    }

    const verifyAdmin = async () => {
      try {
        const admin = await checkIfAdmin(user.id);
        if (!admin) {
          navigate('/');
        } else {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error verificando admin:", error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [user, navigate]);

  return { loading, isAdmin };
}

function parseProduct(rawProduct) {
  return {
    name: String(rawProduct.name).trim(),
    description: String(rawProduct.description).trim(),
    dupe: String(rawProduct.dupe).trim() || null,
    stock_30ml: parseInt(rawProduct.stock_30ml) || 0,
    stock_100ml: parseInt(rawProduct.stock_100ml) || 0,
    notes: rawProduct.notes?.trim() || null,
    projection: parseInt(rawProduct.projection) || null,
    longevity: parseInt(rawProduct.longevity) || null,
    gender: ['masculine', 'feminine', 'unisex'].includes(rawProduct.gender)
      ? rawProduct.gender
      : null,
    image_url: rawProduct.image_url?.trim() || null,
    occasion: rawProduct.occasion
      ? rawProduct.occasion.split(',').map(o => o.trim()).filter(Boolean)
      : null,
    rating: rawProduct.rating ? parseFloat(rawProduct.rating) : null,
    buyer_comments: [] // opcional: puedes omitir o dejarlo vacío
  };
}


export async function addProduct(productRaw) {

 const product = parseProduct(productRaw)

  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product]);

    if (error) {
      console.error('Error adding product:', error.message);
      return { success: false, error };
    }
    console.log('Product added succesfuly')
    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error adding product:', err);
    return { success: false, error: err };
  }
}
