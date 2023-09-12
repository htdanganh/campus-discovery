import { useDispatch } from "react-redux";
import { signin } from "../../actions/auth.actions";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Signin = () => {
	const dispatch = useDispatch();
	const startValues = {
		username: "",
		password: "",
	};

	const handleValidate = (values) => {
		const errors = {};
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
		dispatch(signin(values.username, values.password))
			.then((res) => {
				window.location.href = "/dashboard";
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="bg-primary w-full h-screen flex justify-center items-center">
			<Formik
				initialValues={startValues}
				validate={handleValidate}
				onSubmit={handleSubmit}
			>
				<Form className="flex flex-col bg-gray-light rounded-lg p-5">
					<h1 className="text-xl text-gray-dark font-extrabold">
						Sign In
					</h1>
					<label htmlFor="username" className="text-gray">
						username
					</label>
					<Field
						id="username"
						name="username"
						className="my-1 px-1 py-0.5 border border-gray-700 rounded-md"
					/>
					<ErrorMessage
						name="username"
						component="div"
						className="text-red"
					/>

					<label htmlFor="password" className="text-gray">
						password
					</label>
					<Field
						id="password"
						name="password"
						type="password"
						className="my-1 px-1 py-0.5 border border-gray-700 rounded-md"
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

export default Signin;
