import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';
import { WHATSAPP_NUMBER } from '../constants';

function WhatsAppFloat() {
  const { t } = useTranslation();
  const phone = WHATSAPP_NUMBER.replace(/\D/g, '');
  const href = `https://wa.me/${phone}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('contact.floatWhatsApp')}
      className="fixed bottom-5 right-5 z-[70] inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1ebe57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-6 sm:right-6 sm:size-16"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="text-[1.85rem] sm:text-[2.1rem]" aria-hidden />
    </a>
  );
}

export default WhatsAppFloat;
