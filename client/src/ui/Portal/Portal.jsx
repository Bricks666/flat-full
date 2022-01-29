import { createPortal, useEffect } from "react";
import { useState } from "react";

export const Portal = ({ children }) => {
	const [container] = useState(() => document.createElement("div"));

	useEffect(() => {
		document.body.appendChild(container);
		return () => {
			document.body.removeChild(container);
		};
	}, [container]);

	return createPortal(children, container);
};
