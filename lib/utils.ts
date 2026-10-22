/** wa.me bağlantısı yalnızca rakam kabul eder: "+90 (5xx) ..." → "905xx..." */
export function whatsappHref(number: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}`;
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
