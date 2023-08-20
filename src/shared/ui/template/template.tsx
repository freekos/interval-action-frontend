import { ReactNode } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

interface TemplateProps {
	Header: typeof Header;
	Main: typeof Main;
	Section: typeof Section;
	Footer: typeof Footer;
}

interface TemplateItemProps {
	children?: ReactNode;
	className?: string;
}

function Header(props: TemplateItemProps) {
	const { children, className } = props;
	return <header className={cn(styles.template__header, className)}>{children}</header>;
}

function Main(props: TemplateItemProps) {
	const { children, className } = props;
	return <main className={cn(styles.template__main, className)}>{children}</main>;
}

function Section(props: TemplateItemProps) {
	const { children, className } = props;
	return <section className={cn(styles.template__section, className)}>{children}</section>;
}

function Footer(props: TemplateItemProps) {
	const { children, className } = props;
	return <footer className={cn(styles.template__footer, className)}>{children}</footer>;
}

export const Template: TemplateProps = {
	Header,
	Main,
	Section,
	Footer,
};
