import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import ReactSelect from "react-select";
import { getAllUsers } from "../../actions/user.actions";
import { useDispatch, useSelector } from "react-redux";

const WhitelistField = ({ ...props }) => {
	const dispatch = useDispatch();
	const allUsers = useSelector((state) => state.user.users);
	const { setFieldValue } = useFormikContext();
	const [field] = useField(props);
	const [options, setOptions] = useState([]);

	useEffect(() => {
		dispatch(getAllUsers());
	}, []);

	useEffect(() => {
		if (allUsers && allUsers.length > 0) {
			setOptions(
				allUsers.map((user) => ({ value: user._id, label: user.name }))
			);
		}
	}, [allUsers]);

	return (
		<ReactSelect
			{...field}
			{...props}
			value={field.value}
			options={options}
			onChange={(val) => {
				setFieldValue(field.name, val);
			}}
			isMulti={true}
		/>
	);
};

export default WhitelistField;
