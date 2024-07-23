import { forwardRef } from "react";
import classes from "./checkbox.module.css";

interface Props
	extends Omit<
		React.DetailedHTMLProps<
			React.InputHTMLAttributes<HTMLInputElement>,
			HTMLInputElement
		>,
		"type"
	> {}

export const Checkbox = forwardRef<HTMLInputElement, Props>((props, ref) => {
	return (
		<input
			type="checkbox"
			className={classes.checkbox}
			{...props}
			ref={ref}
		/>
	);
});
