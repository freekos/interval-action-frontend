"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { Template } from "@/shared/ui";

interface Task {
	value: string;
}
interface Interval {
	startTime: string;
	endTime: string;
	tasks: Task[];
}

export default function Home() {
	const [intervals, setIntervals] = useState<Interval[]>([]);
	const [currentInterval, setCurrentInterval] = useState<Interval | null>(null);
	const [intervalValue, setIntervalValue] = useState<number>(1);
	const [taskValue, setTaskValue] = useState<string>("");
	const [timer, setTimer] = useState<number>(0);

	function handleStartInterval() {
		const startTime = new Date(Date.now());
		console.log(startTime.getTime());
		const endTime = new Date(startTime);
		endTime.setHours(endTime.getHours() + intervalValue);
		setCurrentInterval({
			startTime: startTime.toISOString(),
			endTime: endTime.toISOString(),
			tasks: [],
		});
		setTimer(intervalValue * 60 * 60);
	}

	function handleChangeInterval(event: any) {
		const target = event.target;
		const value = target.value;
		const isNumber = !isNaN(Number(value));
		if (!isNumber) return;
		const interval = Number(value);
		if (interval < 0) {
			setIntervalValue(0);
			return;
		} else if (interval > 12) {
			setIntervalValue(12);
			return;
		}
		setIntervalValue(interval);
	}

	function handleAddTask() {
		setCurrentInterval((prev) => {
			if (prev) {
				return { ...prev, tasks: [{ value: taskValue }, ...prev.tasks] };
			}
			return prev;
		});
	}

	useEffect(() => {
		if (timer === 0) return;
		const timeout = setTimeout(() => {
			setTimer((prev) => prev - 1);
		}, 1000);

		return () => {
			clearTimeout(timeout);
		};
	}, [timer]);

	return (
		<Template.Main>
			<Template.Section className={styles.hero}>
				<div className={styles.hero__timer_wrap}>
					<div className={styles.hero__timer}>{getHhMmSs(new Date(), timer)}</div>
				</div>

				<div className={styles.hero__interval}>
					<div className={styles.textfield}>
						<input
							className={styles.textfield__input}
							value={intervalValue > 9 ? intervalValue : "0" + intervalValue}
							onChange={handleChangeInterval}
							onBlur={() => setIntervalValue(1)}
						/>
						<span className={styles.textfield__icon}>Hours</span>
					</div>
					<button
						className={styles.hero__start}
						disabled={!!currentInterval}
						onClick={handleStartInterval}>
						Start
					</button>
				</div>

				<div className={styles.task}>
					<div className={styles.task__time}>
						{currentInterval && <span>{getHhMm(new Date(currentInterval.startTime))}</span>}
						<div className={styles.br} style={{ width: "10vw" }} />
						<span>Now</span>
						<div className={styles.br} style={{ width: "10vw" }} />
						{currentInterval && <span>{getHhMm(new Date(currentInterval.endTime))}</span>}
					</div>
					<h1 className={styles.task__title}>Create Task</h1>
					<div className={styles.task__textfield}>
						<input
							className={styles.task__input}
							value={taskValue}
							onChange={(event) => setTaskValue(event.target.value)}
						/>
						<button className={styles.task__add} onClick={handleAddTask}>
							Add
						</button>
					</div>

					<div className={styles.task__list}>
						{currentInterval?.tasks.map((task, index) => (
							<div key={index} className={styles.task__item}>
								{task.value}
							</div>
						))}
					</div>
				</div>
			</Template.Section>
		</Template.Main>
	);
}

function getHhMm(date: Date) {
	const hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
	const minutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
	return `${hours}:${minutes}`;
}

function getHhMmSs(date: Date, setSeconds: number) {
	date.setHours(0, 0, setSeconds, 0);
	const hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
	const minutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
	const seconds = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
	return `${hours}:${minutes}:${seconds}`;
}
