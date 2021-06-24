import React, { forwardRef } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
	Slide,
	Fade,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
} from "@material-ui/core";
// core components
import Button from "components/CustomButtons/Button.js";

import styles from "./modalStyle";

const useStyles = makeStyles(styles);

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="left" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export function SlideDialog(props) {
	const { open, title, bodyContent, handleOpen, handleSubmit, trigger } =
		props;
	const classes = useStyles();

	return (
		<>
			{trigger}
			<Dialog
				classes={{
					root: classes.center,
					paper: classes.modal,
				}}
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleOpen}
				aria-labelledby="classic-modal-fade-title"
				aria-describedby="classic-modal-fade-description"
			>
				<DialogTitle
					id="classic-modal-fade-title"
					disableTypography
					className={classes.modalHeader}
				>
					<h4 className={classes.modalTitle}>{title}</h4>
				</DialogTitle>
				<DialogContent
					id="classic-modal-fade-description"
					className={classes.modalBody}
				>
					{bodyContent}
				</DialogContent>
				<DialogActions className={classes.modalFooter}>
					<Button onClick={handleSubmit} color="transparent" simple>
						submit
					</Button>
					<Button onClick={handleOpen} color="danger" simple>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

SlideDialog.propTypes = {
	open: PropTypes.bool,
	title: PropTypes.string,
	bodyContent: PropTypes.element,
	trigger: PropTypes.element,
	handleSubmit: PropTypes.func,
	handleOpen: PropTypes.func,
};

export const ControlledFadeDialog = (props) => {
	const { open, title, bodyContent, handleSubmit } = props;
	const classes = useStyles();

	return (
		<Dialog
			classes={{
				root: classes.center,
				paper: classes.modal,
			}}
			open={open}
			keepMounted
			aria-labelledby="classic-modal-fade-title"
			aria-describedby="classic-modal-fade-description"
		>
			<Fade in={open}>
				<div>
					<DialogTitle
						id="classic-modal-fade-title"
						disableTypography
						className={classes.modalHeader}
					>
						<h4 className={classes.modalTitle}>{title}</h4>
					</DialogTitle>
					<DialogContent
						id="classic-modal-fade-description"
						className={classes.modalBody}
					>
						{bodyContent}
					</DialogContent>
					<DialogActions className={classes.modalFooter}>
						<Button color="transparent" onClick={handleSubmit}>
							Submit
						</Button>
					</DialogActions>
				</div>
			</Fade>
		</Dialog>
	);
};

ControlledFadeDialog.propTypes = {
	open: PropTypes.bool,
	title: PropTypes.string,
	bodyContent: PropTypes.element,
	handleSubmit: PropTypes.func,
};

export const DefaultDialog = (props) => {
	const { open, title, bodyContent, actions, trigger } = props;
	const classes = useStyles();

	return (
		<>
			{trigger}
			<Dialog
				classes={{
					root: classes.center,
					paper: classes.modal,
				}}
				open={open}
				keepMounted
				aria-labelledby="classic-modal-fade-title"
				aria-describedby="classic-modal-fade-description"
			>
				<Fade in={open}>
					<div>
						{title !== undefined && (
							<DialogTitle
								id="classic-modal-fade-title"
								disableTypography
								className={classes.modalHeader}
							>
								<h4 className={classes.modalTitle}>{title}</h4>
							</DialogTitle>
						)}
						<DialogContent
							id="classic-modal-fade-description"
							className={classes.modalBody}
						>
							{bodyContent}
						</DialogContent>
						<DialogActions
							classes={{ spacing: classes.madalActionsSpacing }}
							className={classes.modalFooter}
						>
							{actions}
						</DialogActions>
					</div>
				</Fade>
			</Dialog>
		</>
	);
};

DefaultDialog.propTypes = {
	open: PropTypes.bool,
	title: PropTypes.string,
	trigger: PropTypes.element,
	bodyContent: PropTypes.element,
	actions: PropTypes.element,
};
