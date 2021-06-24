import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import { AccountBoxOutlined, Settings, ListAlt } from "@material-ui/icons";
// Styles
import styles from "./styles";
import "./style.css";

export default function Menu() {
	const classes = styles();
	useEffect(() => {
		let menu = document.getElementById("menu");
		menu.addEventListener("click", () => {
			if (menu.classList.contains("active")) {
				menu.classList.remove("active");
			} else {
				menu.classList.add("active");
			}
		});
	}, []);

	return (
		<div id="menu">
			<div className="pie pie1">
				<div className="pie-color pie-color1">
					<Link to="/settings">
						<Tooltip
							placement="right"
							title="Settings"
							classes={{ tooltip: classes.settingsTooltip }}
						>
							<Settings
								className="settings"
								classes={{
									root: classes.menuIcons,
								}}
							/>
						</Tooltip>
					</Link>
				</div>
			</div>
			<div className="pie pie2">
				<div className="pie-color pie-color2">
					<Link to="/games-list">
						<Tooltip
							placement="right"
							title="Games list"
							classes={{ tooltip: classes.gameListTooltip }}
						>
							<ListAlt
								className="game-list"
								classes={{
									root: classes.menuIcons,
								}}
							/>
						</Tooltip>
					</Link>
				</div>
			</div>
			<div className="pie pie3">
				<div className="pie-color pie-color3">
					<Link to="profile">
						<Tooltip
							placement="right"
							title="Profile"
							classes={{ tooltip: classes.profileTooltip }}
						>
							<AccountBoxOutlined
								className="profile"
								classes={{
									root: classes.menuIcons,
								}}
							/>
						</Tooltip>
					</Link>
				</div>
			</div>

			<div className="menu">
				<svg
					className="hamburger"
					xmlns="http://www.w3.org/2000/svg"
					width="100"
					height="100"
					viewBox="0 0 100 100"
				>
					<g
						fill="none"
						stroke="#000"
						strokeWidth="7.999"
						strokeLinecap="round"
					>
						<path d="M 55,26.000284 L 24.056276,25.999716" />
						<path d="M 24.056276,49.999716 L 75.943724,50.000284" />
						<path d="M 45,73.999716 L 75.943724,74.000284" />
						<path d="M 75.943724,26.000284 L 45,25.999716" />
						<path d="M 24.056276,73.999716 L 55,74.000284" />
					</g>
				</svg>
			</div>
		</div>
	);
}
