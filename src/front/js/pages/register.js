import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Container, Button, Image, Row, Form, FormGroup, Col } from "react-bootstrap";
import { BsEnvelope, BsPeopleCircle, BsFillLockFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Login } from "./login";
import { Toast } from "primereact/toast";

export const Register = () => {
	const { store, actions } = useContext(Context);
	const toast = useRef(null);
	const [response, setResponse] = useState(store.response);
	const [Username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [type, setType] = useState("");
	const [password, setPassword] = useState("");
	const [validated, setValidated] = useState(false);
	const history = useHistory();
	useEffect(() => {
		if (store.signUp) {
			alert("El usuario ha sido creado exitosamente");
			history.push("/");
		}
		actions.getToken();
		if (!store.login) {
			history.push("/");
		}
	}, []);
	const handleSubmit = event => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		setValidated(true);
	};

	// export const Register = () => {
	//     const { store, actions } = useContext(Context);
	//     const [username, setUsername] = useState("");
	//     const [Email, setEmail] = useState("");
	//     const [Password, setPassword] = useState("");
	//     const [validated, setValidated] = useState(false);
	//     const history = useHistory();
	//     const token = sessionStorage.getItem("token");

	// 	const handleSubmit = event => {
	// 		const form = event.currentTarget;
	// 		if (form.checkValidity() === false) {
	// 			event.preventDefault();
	// 			event.stopPropagation();
	// 		}

	// 		setValidated(true);
	// 	};

	return (
		<Container>
			<Toast ref={toast} />
			<Row className="justify-content-center pt-5 mt-5 mr-1">
				<Col className="col-md-4 formulary">
					<FormGroup className="text-center pb-3">
						<h1 className="text-dark">Nuevo Usuario</h1>
					</FormGroup>
					<Form noValidate validated={validated} onClick={handleSubmit}>
						<Form.Group controlId="formBasicUser">
							<Form.Label>
								{" "}
								<BsPeopleCircle /> Nombre Usuario
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Usuario"
								onChange={e => setUsername(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>
								{" "}
								<BsEnvelope /> Correo Electronico
							</Form.Label>
							<Form.Control
								type="email"
								placeholder="Correo"
								onChange={e => setEmail(e.target.value)}
								required
							/>
							<Form.Text className="text-muted">Nunca compartiremos su correo, con nadie más.</Form.Text>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>
								{" "}
								<BsFillLockFill /> Contraseña
							</Form.Label>
							<Form.Control
								type="password"
								placeholder="Contraseña"
								onChange={e => setPassword(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group id="formHorizontalRadios1" className="text-center">
							<Form.Check
								type="radio"
								inline
								value="Administrador"
								label="Administrador"
								name="UserType"
								onChange={e => setType(e.target.value)}
							/>
							<Form.Check
								type="radio"
								inline
								value="Colaborador"
								label="Colaborador"
								name="UserType"
								onChange={e => setType(e.target.value)}
							/>
						</Form.Group>
						<FormGroup className="mx-sm-4 pb-3 text-center">
							<Button
								type="reset"
								variant="outline-success"
								onClick={async () => {
									await actions.signUp(Username, email, password, type);
									await setResponse(store.response);
									if (store.response == "OK") {
										toast.current.show({
											severity: "success",
											summary: "Registro Correcto",
											detail: "El usuario ha sido registrado",
											life: 3000
										});
										await setUsername("");
										await setPassword("");
										await setType(false);
										await setEmail("");
										await setValidated(false);
									} else {
										toast.current.show({
											severity: "error",
											summary: "Registro Incorrecto",
											detail: "El usuario no pudo ser registrado. Verifique los datos.",
											life: 3000
										});
									}
								}}>
								Crear Usuario
							</Button>
						</FormGroup>
					</Form>
				</Col>
			</Row>
			<br />
			<Link to="/home">
				<Button variant="primary">Ir al inicio</Button>
			</Link>
		</Container>
	);
};
