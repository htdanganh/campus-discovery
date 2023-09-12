import { useDispatch } from "react-redux";
import { signup } from "../../actions/auth.actions";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Signup = () => {
	const dispatch = useDispatch();
	const startValues = {
		name: "",
		role: "student",
		username: "",
		password: "",
	};

	const handleValidate = (values) => {
		const errors = {};
		if (!values.name) {
			errors.name = "Name is required!";
		} else if (values.name.indexOf(" ") >= 0) {
			errors.name = "No spaces allowed!";
		}
		if (!values.username) {
			errors.username = "Username is required!";
		} else if (values.username.indexOf(" ") >= 0) {
			errors.username = "No spaces allowed!";
		}
		if (!values.password) {
			errors.password = "Password is required!";
		} else if (values.password.indexOf(" ") >= 0) {
			errors.password = "No spaces allowed!";
		}
		return errors;
	};

	const handleSubmit = (values) => {
		console.log(values);
		dispatch(
			signup(values.name, values.username, values.password, values.role)
		)
			.then((res) => {
				window.location.href = "/signin";
			})
			.catch((err) => {
				console.log("error!");
			});
	};

	return (
		<div className="bg-primary w-full h-screen flex justify-center items-center">
			<Formik
				initialValues={startValues}
				validate={handleValidate}
				onSubmit={handleSubmit}
			>
				<Form className="flex flex-col bg-gray-light rounded-lg p-5 border border-gray-light">
					<h1 className="text-xl text-gray-dark font-extrabold">
						Sign Up
					</h1>

					<label htmlFor="name" className="text-gray">
						Name
					</label>
					<Field
						id="name"
						name="name"
						className="my-1 px-1 py-0.5 border border-gray-dark rounded-md"
					/>
					<ErrorMessage
						name="name"
						component="div"
						className="text-red"
					/>

					<label htmlFor="username" className="text-gray">
						Username
					</label>
					<Field
						id="username"
						name="username"
						className="my-1 px-1 py-0.5 border border-gray-dark rounded-md"
					/>
					<ErrorMessage
						name="username"
						component="div"
						className="text-red"
					/>

					<label htmlFor="role" className="text-gray">
						Role
					</label>
					<Field
						as="select"
						id="role"
						name="role"
						className="my-1 px-1 py-0.5 border border-gray-dark rounded-md"
					>
						<option>student</option>
						<option>teacher</option>
						<option>organizer</option>
					</Field>
					<ErrorMessage
						name="role"
						component="div"
						className="text-red"
					/>

					<label htmlFor="password" className="text-gray">
						Password
					</label>
					<Field
						id="password"
						name="password"
						type="password"
						className="my-1 px-1 py-0.5 border border-gray-dark rounded-md"
					/>
					<ErrorMessage
						name="password"
						component="div"
						className="text-red"
					/>

					<div className="m-auto">
						<button
							type="submit"
							className="mt-3 px-3 py-1 text-white bg-blue rounded-lg"
						>
							Submit
						</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

export default Signup;
