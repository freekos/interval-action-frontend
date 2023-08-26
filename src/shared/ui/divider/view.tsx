import { HTMLProps, ReactNode } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

interface DividerProps extends HTMLProps<HTMLDivElement> {
	children?: ReactNode;
	className?: string;
}

export function Divider(props: DividerProps) {
	const { children, className, ...otherProps } = props;
	return (
		<div className={cn(styles.divider)} data-full={!children} {...otherProps}>
			{children}
		</div>
	);
}
