import React from "react";
import { useField, useFormikContext } from "formik";
import MapModal from "./MapModal";

const LocationField = ({ ...props }) => {
	const { setFieldValue } = useFormikContext();
	const [field] = useField(props);

	const onChange = (field, value) => {
		setFieldValue(field, value);
	};

	return <MapModal {...field} {...props} onChange={onChange} />;
};

export default LocationField;
