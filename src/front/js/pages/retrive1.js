import React, { useContext, useState } from "react";
import { Container, Button, Image, Form, Modal } from "react-bootstrap";
import { BsFillUnlockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Retrive1 = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState(null);

	return (
		<Container>
			<Modal.Dialog>
				<Modal.Header closeButton>
					<Modal.Title>Recuperar Contraseña</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>No te preocupes, a todos nos pasa.</p>

					<Form>
						<Form.Group controlId="formBasicEmail font-weight-bold">
							<Form.Label className="mb-0">
								<BsFillUnlockFill /> Ingrese su Correo ó nombre de Usuario
							</Form.Label>
							<Form.Control
								type="email"
								onChange={e => setEmail(e.target.value)}
								placeholder="Ingrese Correo ó Usuario"
								required
								isInvalid
							/>
						</Form.Group>
					</Form>
				</Modal.Body>

				<Modal.Footer className="justify-content-center">
					<Button
						variant="outline-dark"
						onClick={() => {
							actions.sendEmailRetrievePassword(email);
						}}>
						Recuperar Contraseña
					</Button>
				</Modal.Footer>
			</Modal.Dialog>
		</Container>
	);
};
