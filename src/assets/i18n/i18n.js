// react
import i18n from 'i18next';

// i18n
import detector from 'i18next-browser-languagedetector';

// app
import translationEN from './locales/en.json';
import translationDE from './locales/de.json';
import { initReactI18next } from 'react-i18next';

// add translations
const resources = {
	en: { translation: translationEN },
	de: { translation: translationDE }
};

// init i18n
i18n
	.use(detector)
	// pass the i18n instance to react-i18next
	// which will make it available for all the components via the context api.
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: 'en',
		interpolation: { escapeValue: false } // react already safes from xss
	})
	.then();

export default i18n;
