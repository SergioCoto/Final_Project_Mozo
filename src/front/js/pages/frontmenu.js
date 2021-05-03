import React, { useState, useEffect, useContext } from "react";
import PropTypes, { element } from "prop-types";
import { Container, Button, Image, Card, CardDeck, Carousel, Badge } from "react-bootstrap";
import { BsEnvelope, BsPeopleCircle, BsFillLockFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const Frontmenu = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getAllProducts();
		actions.newOrder();
	}, []);

	return (
		<Container>
			<h1 className="mr-auto text-center">MOZO MENU</h1>
			<div>
				<CardDeck>
					{store.products && store.products.length > 0
						? store.products.map((element, index) => (
								<Card key={index}>
									<Card.Img variant="top" src={`${element.ImageURL}`} />
									<Card.Body>
										<Card.Title>{element.Name}</Card.Title>
										<Card.Text>{element.Description}</Card.Text>
									</Card.Body>
									<Card.Footer>
										<div className="text-center pb-0">
											<Badge pill variant="primary">
												{element.Available}
											</Badge>{" "}
											<Badge variant="light">{element.Price}</Badge>{" "}
										</div>
										<div className="text-center pb-0">
											<Button
												variant="success"
												size="sm"
												onClick={() => {
													actions.newOrder(index);
												}}>
												Agregar
											</Button>{" "}
										</div>
									</Card.Footer>
								</Card>
						  ))
						: ""}
				</CardDeck>
			</div>
		</Container>
	);
};