// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from "react";
import Annotations from "./Annotations";
import { useAnnotations } from "./AppContext";
import "../styles/Annotations.css";

const AnnotationsBar = () => {
	const [annotations, setAnnotations] = useAnnotations();
	const [existingLabels, setExistingLabels] = useState([]);

	useEffect(() => {

		const CUSTOM_LABELS = ["example1", "example2"];


		let newLabels = [...CUSTOM_LABELS];
		for (let annotation of annotations) {
			if (!newLabels.includes(annotation.label)) {
				newLabels.push(annotation.label)
			}
		}

		setExistingLabels(newLabels);

	}, [annotations]);

	return (
		<>
			{annotations && annotations?.map((annotation, idx) => {
				return <Annotations key={idx} annotation={annotation} index={idx} existingLabels={existingLabels}/>;
			})}
		</>
	);
};

export default AnnotationsBar;
