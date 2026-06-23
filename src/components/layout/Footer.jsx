import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-ink text-paper">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>  
          <p className="font-display text-lg font-bold tracking-widest mb-3">XIV</p>
          <p className="text-xs text-paper/60 leading-relaxed max-w-[220px]">
            {t('home.newCollectionDesc')}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-4 text-paper/80">{t('nav.products')}</p>
          <ul className="space-y-2 text-xs text-paper/60">
            <li>{t('home.collections')}</li>
            <li>{t('nav.about')}</li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-4 text-paper/80">{t('nav.contact')}</p>
          <ul className="space-y-2 text-xs text-paper/60">
            <li>hello@xiv.com</li>
            <li>+1 555 010 2030</li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-4 text-paper/80">Social</p>
          <ul className="space-y-2 text-xs text-paper/60">
            <li>Instagram</li>
            <li>Pinterest</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10 py-5 text-center text-[11px] text-paper/40">
        © {new Date().getFullYear()} XIV Collections. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;