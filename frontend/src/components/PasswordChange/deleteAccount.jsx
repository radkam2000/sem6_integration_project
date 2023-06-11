// import axios from "axios";
// import { useState } from "react";

// import { Alert, Button, Label, TextInput } from "flowbite-react";

// const DeleteAccount = (props) => {
// 	const [data, setData] = useState({ password: "" });
// 	const [error, setError] = useState("");
// 	const handleChange = ({ currentTarget: input }) => {
// 		setData({ ...data, [input.name]: input.value });
// 	};
// 	const handleAccountDelete = async (e) => {
// 		e.preventDefault();
// 		const token = localStorage.getItem("token");
// 		if (token) {
// 			try {
// 				const config = {
// 					method: "delete",
// 					url: "http://localhost:5000/api/user",
// 					headers: {
// 						"Content-Type": "application/json",
// 						"x-access-token": token,
// 					},
// 					data: data,
// 				};
// 				const { data: res } = await axios(config);
// 				props.data = res.data;
// 				props.msg = res.message;
// 				localStorage.removeItem("token");
// 				window.location.reload();
// 			} catch (error) {
// 				if (
// 					error.response &&
// 					error.response.status >= 400 &&
// 					error.response.status <= 500
// 				) {
// 					setError(error.response.data.message);
// 				}
// 			}
// 		}
// 	};
// 	return (
// 		<div className="flex flex-col mb-4 mx-5">
// 			<form
// 				onSubmit={handleAccountDelete}
// 				className=" flex flex-row gap-4"
// 			>
// 				<div className=" flex flex-col">
// 					<div className="block">
// 						<Label htmlFor="password" value="Password" />
// 					</div>
// 					<TextInput
// 						id="password"
// 						type="password"
// 						placeholder="Password"
// 						name="password"
// 						onChange={handleChange}
// 						value={data.password}
// 						required
// 						className="form_container__input"
// 					/>
// 				</div>

// 				<div className="mt-6">
// 					<Button type="submit">Submit</Button>
// 				</div>
// 			</form>
// 			{error && (
// 				<Alert color="failure" className="mt-2">
// 					<p>{error}</p>
// 				</Alert>
// 			)}
// 		</div>
// 	);
// };

// export default DeleteAccount;
