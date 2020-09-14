import React, { useState } from "react";
import {Button, FormGroup, FormControl, Alert} from "react-bootstrap";
import {Link, useHistory} from 'react-router-dom'

export default function Login(props) {
	console.log(props);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [smessage, setSmessage] = useState("");
	const [fmessage, setFmessage] = useState("");

	function validateForm() {
		return email.length > 0 && password.length > 0;
	}

	function handleSubmit(event) {
		if (email.length == 0 || password.length == 0){
			return;
		}
		setSmessage('');
		setFmessage('');
		fetch("http://localhost:3000/api/login",
			{
				method: 'post',
				headers: {'Content-Type':'application/json'},
				body: JSON.stringify({
					"email": email,
					"password":password
				})
			})
			.then(res => {
				console.log(res)
				if (res.status >= 200 && res.status < 300) {
					setSmessage("Successfully Logged in");
				}
				else {
					res.json()
						.then(data => {
							setFmessage(data.err);
						})
				}
				console.log(res);
			})
			.catch(err => {
				setFmessage(err.err)
				console.log(err)

			})

		event.preventDefault();
	}

	return (
		<div className="Login">
			<form onSubmit={handleSubmit}>
				<FormGroup controlId="email" bssize="large">
					<div>Email</div>
					<FormControl
						autoFocus
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</FormGroup>
				<FormGroup controlId="password" bssize="large">
					<div>Password</div>
					<FormControl
						value={password}
						onChange={e => setPassword(e.target.value)}
						type="password"
					/>
				</FormGroup>
				{smessage && <Alert variant={'success'}>{smessage}</Alert>}
				{fmessage && <Alert variant={'danger'}>{fmessage}</Alert>}
				<br/>
				<Button  bssize="large" type="submit">
					Login
				</Button>
				<Button className={'mx-3 text-white	'}  bssize="large" onClick={() => {window.location.href = "/register"}}>
					Register
				</Button>

			</form>
		</div>
	);
}