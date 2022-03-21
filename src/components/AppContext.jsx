import React, { createContext, useContext, useState } from "react";

export const AnnotationsContext = createContext();
export const UpdateAnnotationsContext = createContext();

export const useAnnotations = () => {
	const annotations = useContext(AnnotationsContext);
	const setAnnotations = useContext(UpdateAnnotationsContext);
	return [annotations, setAnnotations];
};

const AppContext = ({ children }) => {
	const [annotations, setAnnotations] = useState([]);

	return (
		<AnnotationsContext.Provider value={annotations}>
			<UpdateAnnotationsContext.Provider value={setAnnotations}>
				{children}
			</UpdateAnnotationsContext.Provider>
		</AnnotationsContext.Provider>
	);
};

export default AppContext;
