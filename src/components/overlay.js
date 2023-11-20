// Overlay.js
import React from "react";
import { CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const OverlayContainer = styled("div")({
	position: "fixed",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black background
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	zIndex: 9999, // Ensure it's above other elements
});

const Overlay = () => {
	return (
		<OverlayContainer>
			<CircularProgress color="inherit" />
		</OverlayContainer>
	);
};

export default Overlay;
