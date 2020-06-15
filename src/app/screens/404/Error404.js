// react
import React from 'react';

// app
import { useTranslation } from 'react-i18next';

const Error404 = () => {
	// hook: translation
	const { t } = useTranslation();

	return (
		<section className="sc-app">
			<h2>React</h2>
			<p>{t('404')}</p>
		</section>
	);
};
export default Error404;
