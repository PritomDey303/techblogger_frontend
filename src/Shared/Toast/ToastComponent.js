import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { Notification } from "../../Context/ToastContext";
import "./ToastComponent.css";

function ToastComponent() {
  const { show, message, type } = useContext(Notification);

  return (
    <Row className="toaster">
      <Col className="mb-2">
        <Toast
          show={show}
          bg={type}
          className="text-light py-2 text-center shadow"
          animation={true}
        >
          <Toast.Body className="fw-bold">{message}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default ToastComponent;
