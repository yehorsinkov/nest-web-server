export enum Languages {
	Ua = 'uk-UA',
	Ru = 'ru-RU',
	En = 'en-US'
}

export const DEFAULT_LANGUAGES = [Languages.Ru, Languages.En, Languages.Ua];

export const DEFAULT_LANGUAGE = Languages.Ua;

export const UKRAINIAN_LANGUAGE = Languages.Ua;

export const LABELS_OF_LANGUAGE = {
	[Languages.Ru]: 'Русский',
	[Languages.En]: 'English',
	[Languages.Ua]: 'Українська'
};

export const LANGUAGES_SHORT_ALIASES = {
	[Languages.Ru]: 'ru',
	[Languages.En]: 'en',
	[Languages.Ua]: 'uk'
};
