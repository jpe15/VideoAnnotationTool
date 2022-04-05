import React, { useEffect } from "react";
import Annotations from "./Annotations";
import { useAnnotations } from "./AppContext";
import "../styles/Annotations.css";

const AnnotationsBar = () => {
	const [annotations, setAnnotations] = useAnnotations();

	useEffect(() => {
	}, [annotations]);

	return (
		<>
			{annotations && annotations?.map((annotation, idx) => {
				return <Annotations key={idx} annotation={annotation} index={idx} />;
			})}
		</>
	);
};

export default AnnotationsBar;
