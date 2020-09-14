import React, { useState } from "react";
import { Button, Form ,FormGroup, FormControl, Alert } from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cnfpassword, cnfsetPassword] = useState("");
	const [smessage, setSmessage] = useState("");
	const [fmessage, setFmessage] = useState("");

	function validateForm() {
		return email.length > 0 && password.length > 0;
	}

	function handleSubmit(event) {
		if (email.length == 0 || password.length == 0 || (password !== cnfpassword)){
			return;
		}
		setSmessage('');
		setFmessage('');
		fetch("http://localhost:3000/api/register",
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
					setEmail('');
					setPassword('');
					cnfsetPassword('');
					setSmessage("Successfully created user");
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
				setMessage(err.err)
				console.log(err)

			})
				event.preventDefault();
	}
		return (
		<div className="Login">
			<form onSubmit={(e) => handleSubmit(e)}>
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
				<FormGroup controlId="cnfpassword" bssize="large">
					<div>Re-Password</div>
					<FormControl
						value={cnfpassword}
						onChange={e => cnfsetPassword(e.target.value)}
						type="password"
					/>
				</FormGroup>
				<br/>
				<Button bssize="small" onClick={e=>handleSubmit(e)}  type="submit">
					Register
				</Button>
				<Button className={'mx-3 text-white	'}  bssize="large" onClick={() => {window.location.href = "/login"}}>
					Register
				</Button>
				{smessage && <Alert variant={'success'}>{smessage}</Alert>}
				{fmessage && <Alert variant={'danger'}>{fmessage}</Alert>}

			</form>
		</div>
	);
}