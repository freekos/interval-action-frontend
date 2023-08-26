/* eslint-disable react/display-name */
import { ButtonHTMLAttributes, HTMLProps, ReactNode, Ref, forwardRef } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

type ButtonVariant = "black";
type ButtonShape = "fill" | "outlined" | "rounded";
type ButtonSize = "lg" | "md" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode;
	className?: string;
	variant?: ButtonVariant;
	shape?: ButtonShape;
	size?: ButtonSize;
	isActive?: boolean;
}

export const Button = forwardRef((props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
	const {
		children,
		className,
		variant = "black",
		shape = "outlined",
		size = "md",
		isActive = false,
		...otherProps
	} = props;
	return (
		<button
			ref={ref}
			className={cn(styles.button, className)}
			data-variant={variant}
			data-shape={shape}
			data-size={size}
			data-active={isActive}
			{...otherProps}>
			{children}
		</button>
	);
});
