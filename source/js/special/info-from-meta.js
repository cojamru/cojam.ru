export const getInfoFromMeta = name => {
	let metaTag = document.head.querySelector(`meta[name='_cojam:${name}']`);

	return metaTag ? metaTag.getAttribute('content') : void 0;
};
