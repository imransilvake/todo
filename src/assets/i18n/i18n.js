// app
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en.json';
import translationDE from './locales/de.json';

// add translations
const resources = {
	en: { translation: translationEN },
	de: { translation: translationDE }
};

// init i18n
i18n
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next
	// which will make it available for all the components via the context api.
	.use(initReactI18next)
	.init({
		resources,
		lng: 'en',
		interpolation: { escapeValue: false } // react already safes from xss
	})
	.then();
