import { useState, useEffect } from 'react';
import './myAccount.scss';
import {
  signUp,
  signIn,
  signInWithGoogle,
  signOut,
  onAuthChange,
} from '../../services/auth';
import { useAppContext } from '../../context/context';

function MyAccount() {
  const [register, setRegister] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [user, setUser] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { showNotification } = useAppContext();

  useEffect(() => {
    const { data: authListener } = onAuthChange(setUser);
    return () => {
      authListener?.subscription?.unsubscribe?.();
    };
  }, []);

  const handleRegister = async () => {
    try {
      await signUp(email, password, name);
      showNotification('Registro exitoso');
      setRegister(false);
      resetForm();
    } catch (error) {
      showNotification('Error en el registro: ' + error.message, 3500);
    }
  };

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      showNotification('Sesión iniciada');
      setLogIn(false);
      resetForm();
    } catch (error) {
      showNotification('Error al iniciar sesión: ' + error.message, 3500);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      showNotification('Redirigiendo a Google...');
    } catch (error) {
      showNotification('Error con Google: ' + error.message, 3500);
    }
  };

  const handleLogout = async () => {
    await signOut();
    showNotification('Sesión cerrada');
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  if (user) {
    return (
      <div className="container">
        <p>Bienvenido, {user.email}</p>
        <button className="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    );
  }

  if (register) {
    return (
      <div className="main">
        <div className="container">
          <p>Ingrese los datos. Disculpe la formalidad</p>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex-row cond">
            <p>
              Al registrarse esta de acuerdo con los{' '}
              <u className="a">términos y condiciones</u>
            </p>
          </div>
          <button className="button" onClick={handleRegister}>
            Registrarse
          </button>
          <button className="button secondary" onClick={() => setRegister(false)}>
            Volver
          </button>
        </div>
      </div>
    );
  }

  if (logIn) {
    return (
      <div className="main">
        <div className="container">
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" onClick={handleLogin}>
            Ese soy yo
          </button>
          <button className="button google" onClick={handleGoogleLogin}>
            Iniciar con Google
          </button>
          <button className="button secondary" onClick={() => setLogIn(false)}>
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="container">
        <p>Tu cara no nos suena, registrate o inicia sesión</p>
        <div className="cards">
          <button className="card red" onClick={() => setRegister(true)}>
            <p className="tip">Registrarse</p>
          </button>
          <button className="card blue" onClick={() => setLogIn(true)}>
            <p className="tip">Iniciar sesión</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
