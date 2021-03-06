import React from "react";
import { Portal } from "../Portal";

import OverlayStyle from "./Overlay.module.css";

export const Overlay = ({ children, isOpen, close }) => {
	return isOpen ? (
		<Portal>
			<div className={OverlayStyle.dialog} role="dialog">
				<div
					className={OverlayStyle.overlay}
					role="button"
					onClick={close}
					tabIndex={0}
				/>
				{children}
			</div>
		</Portal>
	) : null;
};
