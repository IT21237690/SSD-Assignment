import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import './Module.toasts.css'

function CustomToasts(props) {
  const { variant, show, setShow, cmpMessage } = props;
  const [message] = useState({
    Success: `${cmpMessage} Succsessfully!`,
    Danger: `${cmpMessage} Failed!`,
    Warning: `${cmpMessage}`,
  });
  return (
    <>
      <Toast
        className="d-inline-block m-1 toast"
        bg={variant.toLowerCase()}
        onClose={() => setShow(false)}
        show={show}
        delay={2000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">{variant}</strong>
        </Toast.Header>
        <Toast.Body className={variant === "Dark" && "text-white"}>
          {variant === "Success"
            ? message.Success
            : variant === "Warning"
            ? message.Warning
            : message.Danger}
        </Toast.Body>
      </Toast>
    </>
  );
}

export default CustomToasts;
