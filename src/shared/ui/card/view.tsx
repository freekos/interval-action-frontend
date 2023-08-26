"use client";
import { HTMLProps, ReactNode } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

interface CardProps extends HTMLProps<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}

export function Card(props: CardProps) {
	const { children, className } = props;
	return <div className={cn(styles.card, className)}>{children}</div>;
}
