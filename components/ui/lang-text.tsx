import { Fragment } from "react";
import { foreignTerms } from "@/lib/content/terms";

/**
 * "Classifica · Sell-through" gibi karışık dilli etiketleri " · " ayracından
 * böler ve yabancı parçalara lang niteliği verir; böylece büyük harf
 * dönüşümü her parçayı kendi dilinin kurallarıyla yapar.
 */
export function LangText({ text }: { text: string }) {
  const parts = text.split(" · ");
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && " · "}
          {foreignTerms[part] ? <span lang={foreignTerms[part]}>{part}</span> : part}
        </Fragment>
      ))}
    </>
  );
}
