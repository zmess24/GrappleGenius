import React from "react";

function Response({ data }) {
	return <section dangerouslySetInnerHTML={{ __html: content }}></section>;
}

export default Response;
