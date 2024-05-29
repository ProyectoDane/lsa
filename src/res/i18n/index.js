import { I18n } from 'i18n-js';
import es from './es';
import pt from './pt';

const translations = { es, 'pt-BR': pt };

const i18n = new I18n(translations, {
  defaultLocale: 'es',
  enableFallback: true,
});

export { i18n };
