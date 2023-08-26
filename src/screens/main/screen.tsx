"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Button, Card, Divider, Template, TextField } from "@/shared/ui";

interface Task {
	value: string;
}
interface Interval {
	startTime: number; // timestamp
	endTime: number; // timestamp
	tasks: Task[];
}

export function MainScreen() {
	const [intervals, setIntervals] = useState<Interval[]>([]);
	const [currentInterval, setCurrentInterval] = useState<Interval | null>(null);
	const [hours, setHours] = useState<number>(1);
	const [timer, setTimer] = useState<number>(0);
	const [taskValue, setTaskValue] = useState<string>("");
	const [isPause, setIsPause] = useState<boolean>(false);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!isPause) {
			let interval = setInterval(() => {
				if (timer === 0) return;
				setTimer((prev) => prev - 1);
			}, 1000);

			return () => {
				clearInterval(interval);
			};
		}
	}, [timer, isPause]);

	function handleStartInterval() {
		const startTime = Date.now();
		const endTime = new Date(startTime);
		endTime.setHours(endTime.getHours() + hours);
		setCurrentInterval({
			startTime: startTime,
			endTime: endTime.getTime(),
			tasks: [],
		});
		setTimer(hours * 60 * 60);
	}

	function handleChangeHours(event: any) {
		const target = event.target;
		const value = target.value;
		const isNumber = !isNaN(Number(value));
		if (!isNumber) return;
		const interval = Number(value);
		if (interval < 0) {
			setHours(0);
			return;
		} else if (interval > 12) {
			setHours(12);
			return;
		}
		setHours(interval);
	}

	function handleAddTask(event: any) {
		event.preventDefault();
		buttonRef.current?.setAttribute("data-active", "true");
		setTimeout(() => buttonRef.current?.setAttribute("data-active", "false"), 500);

		setCurrentInterval((prev) => {
			if (prev) {
				return { ...prev, tasks: [{ value: taskValue }, ...prev.tasks] };
			}
			return prev;
		});
	}

	function handleEndInterval() {
		if (currentInterval) {
			setIntervals((prev) => [currentInterval, ...prev]);
			setCurrentInterval(null);
			setTimer(0);
		}
	}

	return (
		<Template.Main>
			<Template.Section className={styles.hero}>
				<Template.Container>
					<div className={styles.hero__wrapper}>
						<header className={styles.hero__head}>
							{currentInterval ? (
								<TimeView
									date={() => {
										const date = new Date();
										date.setHours(0, 0, timer, 0);
										return date;
									}}
								/>
							) : (
								<div className={styles.hero__time}>
									<span>
										<TextField
											className={styles.hero__hours}
											value={hours > 9 ? hours : "0" + hours}
											onChange={handleChangeHours}
										/>
									</span>
									<span>Hours</span>
								</div>
							)}

							{!!currentInterval ? (
								<div className={styles.time__btns}>
									{isPause ? (
										<Button onClick={() => setIsPause(false)}>Resume</Button>
									) : (
										<Button onClick={() => setIsPause(true)}>Pause</Button>
									)}
									<Button onClick={handleEndInterval}>Stop</Button>
								</div>
							) : (
								<Button onClick={handleStartInterval}>Start</Button>
							)}
						</header>

						<div className={styles.hero__content}>
							<form className={styles.hero__form}>
								<TextField
									placeholder='Enter task'
									className={styles.hero__task}
									value={taskValue}
									onChange={(event) => setTaskValue(event.target.value)}
								/>
								<Button ref={buttonRef} className={styles.hero__add} onClick={handleAddTask}>
									Add
								</Button>
							</form>
							{currentInterval ? (
								<>
									<div className={styles.time__item}>
										<span>{getHhMm(currentInterval.startTime)}</span>
										<Divider />
										<span>Now</span>
										<Divider />
										<span>{getHhMm(currentInterval.endTime)}</span>
									</div>
									<Divider />
									<div className={styles.task__wrapper}>
										{currentInterval.tasks.map((task, index) => (
											<Card key={index} className={styles.task__item}>
												<p>{task.value}</p>
											</Card>
										))}
									</div>
								</>
							) : (
								<Divider>Create New Interval</Divider>
							)}
							<div className={styles.interval}>
								{intervals.map((interval, index) => (
									<Card key={index} className={styles.interval__item}>
										<span>{getHhMm(interval.startTime)}</span>
										<Divider />
										<span>{getHhMm(interval.endTime)}</span>
									</Card>
								))}
							</div>
						</div>
					</div>
				</Template.Container>
			</Template.Section>
		</Template.Main>
	);
}

function TimeView(props: { date: () => Date }) {
	const { date } = props;
	const { hours, minutes, seconds } = getHhMmSs(date());

	return (
		<div className={styles.time}>
			<span>{hours}</span>
			<span>:</span>
			<span>{minutes}</span>
			<span>:</span>
			<span>{seconds}</span>
		</div>
	);
}

function getHhMm(timestamp: number) {
	const date = new Date(timestamp);
	const hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
	const minutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
	return `${hours}:${minutes}`;
}

function getHhMmSs(date: Date) {
	const hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
	const minutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
	const seconds = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
	return { hours, minutes, seconds };
}
