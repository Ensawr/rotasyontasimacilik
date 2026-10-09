import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, MapPin, Clock } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { WHATSAPP_NUMBER, PHONE_DISPLAY } from '../constants';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import OrganizationJsonLd, { WebPageJsonLd } from '../components/OrganizationJsonLd';

const baseInputClassName =
  'mt-1.5 w-full border bg-white px-3 py-2.5 text-base text-slate-800 outline-none transition dark:bg-ink dark:text-slate-100';

const normalInputClassName =
  `${baseInputClassName} border-slate-200 focus:border-brand-500 dark:border-white/10 dark:focus:border-accent-500`;

const errorInputClassName =
  `${baseInputClassName} border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-400`;

function Contact() {
  const { t } = useTranslation();
  const location = useLocation();
  const [serviceType, setServiceType] = useState('corporate');
  const [errors, setErrors] = useState({});
  const [missingFields, setMissingFields] = useState([]);

  const isCorporate = serviceType === 'corporate';

  const requiredFields = [
    { name: 'fullName', label: t('contact.fields.fullName') },
    { name: 'cargo', label: t('contact.fields.cargo') },
    ...(isCorporate
      ? [{ name: 'cargoWeight', label: t('contact.fields.cargoWeight') }]
      : []),
    { name: 'fromAddress', label: t('contact.fields.fromAddress') },
    { name: 'toAddress', label: t('contact.fields.toAddress') },
  ];

  const selectServiceType = (type) => {
    setServiceType(type);
    setErrors({});
    setMissingFields([]);
  };

  const typeTabClass = (type) =>
    [
      'flex-1 rounded-md px-3 py-2.5 text-center text-sm font-semibold uppercase tracking-wide transition sm:text-base',
      serviceType === type
        ? 'bg-brand-900 text-white dark:bg-accent-500 dark:text-ink'
        : 'bg-white text-brand-800 hover:bg-slate-100 dark:bg-ink dark:text-white/80 dark:hover:bg-white/10',
    ].join(' ');

  const infoCards = [
    {
      key: 'phone',
      title: t('contact.cards.phone.title'),
      text: PHONE_DISPLAY,
      detail: t('contact.cards.phone.detail'),
      Icon: Phone,
    },
    {
      key: 'address',
      title: t('contact.cards.address.title'),
      text: t('contact.cards.address.text'),
      detail: t('contact.cards.address.detail'),
      Icon: MapPin,
    },
    {
      key: 'hours',
      title: t('contact.cards.hours.title'),
      text: t('contact.cards.hours.text'),
      detail: t('contact.cards.hours.detail'),
      Icon: Clock,
    },
  ];

  useEffect(() => {
    if (location.hash !== '#teklif-formu') return;

    const timer = setTimeout(() => {
      document.getElementById('teklif-formu')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 80);

    return () => clearTimeout(timer);
  }, [location]);

  const getInputClass = (name) =>
    errors[name] ? errorInputClassName : normalInputClassName;

  const clearFieldError = (name) => {
    if (!errors[name]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const closePopup = () => setMissingFields([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = {
      fullName: String(formData.get('fullName') || '').trim(),
      company: String(formData.get('company') || '').trim(),
      cargo: String(formData.get('cargo') || '').trim(),
      cargoWeight: String(formData.get('cargoWeight') || '').trim(),
      fromAddress: String(formData.get('fromAddress') || '').trim(),
      toAddress: String(formData.get('toAddress') || '').trim(),
    };

    const nextErrors = {};
    const nextMissing = [];

    requiredFields.forEach((field) => {
      if (!values[field.name]) {
        nextErrors[field.name] = true;
        nextMissing.push(field.label);
      }
    });

    setErrors(nextErrors);

    if (nextMissing.length > 0) {
      setMissingFields(nextMissing);
      return;
    }

    setMissingFields([]);

    const lines = [
      isCorporate
        ? t('contact.whatsapp.greetingCorporate')
        : t('contact.whatsapp.greetingHome'),
      '',
      `${t('contact.whatsapp.serviceType')}: ${
        isCorporate ? t('contact.types.corporate') : t('contact.types.home')
      }`,
      `${t('contact.whatsapp.fullName')}: ${values.fullName}`,
    ];

    if (isCorporate && values.company) {
      lines.push(`${t('contact.whatsapp.company')}: ${values.company}`);
    }

    lines.push(`${t('contact.whatsapp.cargo')}: ${values.cargo}`);

    if (isCorporate) {
      lines.push(`${t('contact.whatsapp.cargoWeight')}: ${values.cargoWeight}`);
    }

    lines.push(
      `${t('contact.whatsapp.fromAddress')}: ${values.fromAddress}`,
      `${t('contact.whatsapp.toAddress')}: ${values.toAddress}`,
      '',
      isCorporate
        ? t('contact.whatsapp.closingCorporate')
        : t('contact.whatsapp.closingHome')
    );

    const phone = WHATSAPP_NUMBER.replace(/\D/g, '');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white dark:bg-ink">
      <Seo
        title={t('seo.contact.title')}
        description={t('seo.contact.description')}
        path="/iletisim"
      />
      <OrganizationJsonLd />
      <WebPageJsonLd
        name={t('seo.contact.title')}
        description={t('seo.contact.description')}
        path="/iletisim"
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <Reveal variant="fade">
          <header className="max-w-2xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400 sm:text-sm">
              {t('contact.eyebrow')}
            </p>
            <h1 className="section-heading mt-2 font-display text-3xl font-bold uppercase tracking-wide text-brand-900 dark:text-white sm:text-4xl md:text-5xl">
              {t('contact.title')}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              {t('contact.intro')}
            </p>
            <p className="mt-3 text-sm">
              <Link
                to="/#hizmetler"
                className="link-underline font-semibold text-accent-600 transition hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
              >
                {t('about.ctaServices')}
              </Link>
            </p>
          </header>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
          {infoCards.map(({ key, title, text, detail, Icon }, index) => (
            <Reveal key={key} delay={index * 100} variant="scale">
              <div className="card-hover h-full border border-brand-100 bg-brand-50 p-5 sm:p-6 dark:border-white/10 dark:bg-ink-raised">
                <div className="flex h-11 w-11 items-center justify-center bg-brand-700 text-white transition-transform duration-300 group-hover:scale-105 dark:bg-accent-500 dark:text-ink">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-brand-800 dark:text-white">
                  {title}
                </h2>
                <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200 sm:text-base">
                  {text}
                </p>
                {detail ? (
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{detail}</p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140} variant="up">
          <form
            id="teklif-formu"
            onSubmit={handleSubmit}
            noValidate
            className="mt-8 flex scroll-mt-28 flex-col gap-5 border border-brand-100 bg-brand-50 p-4 sm:mt-10 sm:scroll-mt-32 sm:p-6 dark:border-white/10 dark:bg-ink-raised"
          >
          <div>
            <p className="mb-2 block text-sm font-semibold text-brand-900 dark:text-white">
              {t('contact.types.label')}
            </p>
            <div
              className="flex gap-2 rounded-md border border-slate-200 bg-slate-100 p-1 dark:border-white/10 dark:bg-white/5"
              role="tablist"
              aria-label={t('contact.types.label')}
            >
              <button
                type="button"
                role="tab"
                aria-selected={isCorporate}
                className={typeTabClass('corporate')}
                onClick={() => selectServiceType('corporate')}
              >
                {t('contact.types.corporate')}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={!isCorporate}
                className={typeTabClass('home')}
                onClick={() => selectServiceType('home')}
              >
                {t('contact.types.home')}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-brand-900 dark:text-white">
              {t('contact.fields.fullName')}
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              className={getInputClass('fullName')}
              onChange={() => clearFieldError('fullName')}
            />
          </div>

          {isCorporate ? (
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-brand-900 dark:text-white">
                {t('contact.fields.company')}{' '}
                <span className="font-normal text-slate-500">{t('contact.fields.optional')}</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                className={normalInputClassName}
              />
            </div>
          ) : null}

          {isCorporate ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="cargo" className="block text-sm font-semibold text-brand-900 dark:text-white">
                  {t('contact.fields.cargo')}
                </label>
                <input
                  id="cargo"
                  name="cargo"
                  type="text"
                  placeholder={t('contact.fields.cargoPlaceholder')}
                  className={getInputClass('cargo')}
                  onChange={() => clearFieldError('cargo')}
                />
              </div>
              <div>
                <label htmlFor="cargoWeight" className="block text-sm font-semibold text-brand-900 dark:text-white">
                  {t('contact.fields.cargoWeight')}
                </label>
                <input
                  id="cargoWeight"
                  name="cargoWeight"
                  type="text"
                  placeholder={t('contact.fields.cargoWeightPlaceholder')}
                  className={getInputClass('cargoWeight')}
                  onChange={() => clearFieldError('cargoWeight')}
                />
              </div>
            </div>
          ) : (
            <div>
              <label htmlFor="cargo" className="block text-sm font-semibold text-brand-900 dark:text-white">
                {t('contact.fields.cargo')}
              </label>
              <input
                id="cargo"
                name="cargo"
                type="text"
                placeholder={t('contact.fields.cargoPlaceholderHome')}
                className={getInputClass('cargo')}
                onChange={() => clearFieldError('cargo')}
              />
            </div>
          )}

          <div>
            <label htmlFor="fromAddress" className="block text-sm font-semibold text-brand-900 dark:text-white">
              {t('contact.fields.fromAddress')}
            </label>
            <textarea
              id="fromAddress"
              name="fromAddress"
              rows="3"
              className={`${getInputClass('fromAddress')} resize-y`}
              onChange={() => clearFieldError('fromAddress')}
            />
          </div>

          <div>
            <label htmlFor="toAddress" className="block text-sm font-semibold text-brand-900 dark:text-white">
              {t('contact.fields.toAddress')}
            </label>
            <textarea
              id="toAddress"
              name="toAddress"
              rows="3"
              className={`${getInputClass('toAddress')} resize-y`}
              onChange={() => clearFieldError('toAddress')}
            />
          </div>

          <button
            type="submit"
            className="btn-lift inline-flex w-full items-center justify-center gap-2 bg-accent-500 px-6 py-3 font-display text-base font-semibold uppercase tracking-wider text-white transition hover:bg-accent-600 sm:w-auto sm:text-lg"
          >
            <span className="inline-flex size-5 shrink-0 items-center justify-center">
              <FontAwesomeIcon icon={faWhatsapp} className="h-full w-full" aria-hidden />
            </span>
            <span>{t('contact.submit')}</span>
          </button>
          </form>
        </Reveal>
      </div>

      {missingFields.length > 0 && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 px-4"
          onClick={closePopup}
          role="presentation"
        >
          <div
            className="w-full max-w-md border border-brand-100 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-ink-raised"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="validation-title"
          >
            <h2
              id="validation-title"
              className="font-display text-2xl font-bold uppercase tracking-wide text-brand-900 dark:text-white"
            >
              {t('contact.validation.title')}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {t('contact.validation.intro')}
            </p>
            <ul className="mt-4 space-y-2">
              {missingFields.map((field) => (
                <li
                  key={field}
                  className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-red-500" aria-hidden />
                  <span>
                    {t('contact.validation.required', { field })}
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={closePopup}
              className="mt-6 w-full bg-brand-700 px-5 py-2.5 font-display text-base font-semibold uppercase tracking-wider text-white transition hover:bg-brand-600 sm:w-auto"
            >
              {t('contact.validation.ok')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;
