import { to_html } from '$lib/util/markdown/parse/index.js';

onmessage = (e) => {
	postMessage(to_html(e.data));
};
