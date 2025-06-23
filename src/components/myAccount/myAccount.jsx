import { useState, useEffect } from "react";
import "./myAccount.scss";
import { ContextProvider } from "../../context/context";
import { useAppContext } from "../../context/context";

// Firebase
import { auth, db } from "/src/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

function MyAccount() {
  const [register, setRegister] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {showNotification} = useAppContext();

  // Escucha de sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, { displayName: name });

      // Guardar datos en Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name,
        email,
        createdAt: serverTimestamp()
      });

      showNotification("Registro exitoso");
      setRegister(false);
      resetForm();
    } catch (error) {
      showNotification("Error en el registro: " + error.message, 3500);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showNotification("Sesión iniciada");
      setLogIn(false);
      resetForm();
    } catch (error) {
     showNotification("Error al iniciar sesión: " + error.message, 3500);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;

      // Guarda en Firestore si no existía antes
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email,
        createdAt: serverTimestamp()
      }, { merge: true });

      showNotification("Sesión iniciada con Google");
    } catch (error) {
      showNotification("Error con Google: " + error.message, 3500);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    showNotification("Sesión cerrada");
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  // UI
  if (user) {
    return (
      <div className="container">
        <p>Bienvenido, {user.displayName || user.email}</p>
        <button className="button" onClick={handleLogout}>Cerrar sesión</button>
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
          <p>Al registrarse esta de acuerdo con los <u className="a">términos y condiciones</u></p>
        </div>
        <button className="button" onClick={handleRegister}>Registrarse</button>
        <button className="button secondary" onClick={() => setRegister(false)}>Volver</button>
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
        <button className="button" onClick={handleLogin}>Ese soy yo</button>
        <button className="button google" onClick={handleGoogleLogin}>Iniciar con Google</button>
        <button className="button secondary" onClick={() => setLogIn(false)}>Volver</button>
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
