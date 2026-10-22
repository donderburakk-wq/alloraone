export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Vizyon & Misyon", href: "/vizyon-misyon" },
  { label: "Hizmetlerimiz", href: "/hizmetler" },
  { label: "Bize Ulaşın", href: "/iletisim" },
];

export const servicesNav = {
  label: "Hizmetlerimiz",
  href: "/hizmetler",
  overview: "Tüm modüllere genel bakış",
};

export const footerNav = {
  pagesTitle: "Sayfalar",
  modulesTitle: "Modüller",
  contactTitle: "İletişim",
  legal: [{ label: "KVKK Aydınlatma Metni", href: "/kvkk" }],
};

export const ui = {
  skipToContent: "İçeriğe geç",
  openMenu: "Menüyü aç",
  closeMenu: "Menüyü kapat",
  themeToDark: "Koyu temaya geç",
  themeToLight: "Açık temaya geç",
  soon: "Yakında",
  mainNavLabel: "Ana menü",
  backHome: "Ana sayfaya dön",
};
