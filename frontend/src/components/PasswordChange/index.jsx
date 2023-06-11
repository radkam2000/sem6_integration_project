// import { useState } from "react";
// import axios from "axios";
// import { Alert, Button, Label, TextInput } from "flowbite-react";
// const ChangePasswd = (props) => {
// 	const [data, setData] = useState({ oldPassword: "", newPassword: "" });
// 	const [error, setError] = useState("");
// 	const handleChange = ({ currentTarget: input }) => {
// 		setData({ ...data, [input.name]: input.value });
// 	};
// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		const token = localStorage.getItem("token");
// 		try {
// 			const config = {
// 				method: "post",
// 				url: "http://localhost:5000/api/user/password",
// 				headers: {
// 					"Content-Type": "application/json",
// 					"x-access-token": token,
// 				},
// 				data: data,
// 			};
// 			const { data: res } = await axios(config);
// 			props.msg(res.message);
// 		} catch (error) {
// 			if (
// 				error.response &&
// 				error.response.status >= 400 &&
// 				error.response.status <= 500
// 			) {
// 				setError(error.response.data.message);
// 			}
// 		}
// 	};

// 	return (
// 		<div className="flex flex-col mb-4 mx-5">
// 			<form onSubmit={handleSubmit} className=" flex flex-row gap-4">
// 				<div className=" flex flex-col">
// 					<div className="block">
// 						<Label htmlFor="oldPassword" value="Old password" />
// 					</div>
// 					<TextInput
// 						id="oldPassword"
// 						type="password"
// 						placeholder="Password"
// 						name="oldPassword"
// 						onChange={handleChange}
// 						value={data.oldPassword}
// 						required
// 					/>
// 				</div>
// 				<div>
// 					<div className="block">
// 						<Label htmlFor="newPassword" value="New password" />
// 					</div>
// 					<TextInput
// 						id="newPassword"
// 						type="password"
// 						placeholder="Password"
// 						name="newPassword"
// 						onChange={handleChange}
// 						value={data.newPassword}
// 						required
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

// export default ChangePasswd;
