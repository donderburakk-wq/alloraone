import { ViewTransition } from "react";

/**
 * Template her rota değişiminde yeniden bağlanır; böylece ViewTransition
 * eski sayfa için "exit", yenisi için "enter" animasyonunu oynatır.
 * Sınıflar globals.css içinde tanımlıdır.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
