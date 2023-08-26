"use client";
import styles from "./styles.module.scss";
import cn from "classnames";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { HTMLProps, InputHTMLAttributes, ReactNode, useState } from "react";

type TextFieldVariant = "gray";
type TextFieldSize = "lg" | "md" | "sm";

interface Icon extends HTMLProps<HTMLSpanElement> {
	children: ReactNode;
	className?: string;
}

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	className?: string;
	label?: string;
	icon?: {
		right?: Icon;
		left?: Icon;
	};
	error?: string | boolean;
	variant?: TextFieldVariant;
	size?: TextFieldSize;
}

export function TextField(props: TextFieldProps) {
	const {
		className,
		label,
		icon = {},
		error,
		type,
		variant = "gray",
		size = "md",
		...otherProps
	} = props;
	const [isPassword, setIsPassword] = useState<boolean>(true);

	if (!icon.right && type === "password") {
		icon.right = {
			children: isPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />,
			onClick: () => setIsPassword((prev) => !prev),
		};
	}

	return (
		<div className={styles.textfield} data-error={!!error} data-variant={variant} data-size={size}>
			{label && <label>{label}</label>}
			<div className={styles.textfield__content}>
				{icon?.left && (
					<span
						className={cn(styles.textfield__icon, styles.icon__right, icon.left.className)}
						{...icon.left}>
						{icon.left.children}
					</span>
				)}
				<input className={cn(styles.textfield__input, className)} {...otherProps} />
				{icon?.right && (
					<span
						className={cn(styles.textfield__icon, styles.icon__right, icon.right.className)}
						{...icon.right}>
						{icon.right.children}
					</span>
				)}
			</div>
			{typeof error === "string" && <p className={styles.textfield__error}>{error}</p>}
		</div>
	);
}
