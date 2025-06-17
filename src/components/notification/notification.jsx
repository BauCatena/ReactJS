import { useEffect, useState } from "react";
import "./notification.scss";

function Notification({ message, visible }) {
  const [show, setShow] = useState(false);
  const [localMessage, setLocalMessage] = useState("");

  useEffect(() => {
    if (visible) {
      setLocalMessage(message);
      setShow(true);
    } else if (show) {
      const timeout = setTimeout(() => setShow(false), 500); 
      return () => clearTimeout(timeout);
    }
  }, [visible, message, show]);

  if (!show) return null;
  return (
    <div className={`notification${visible ? " show" : " hide"}`}>
      {localMessage}
    </div>
  );
}

export default Notification;