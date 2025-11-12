import { LanguagesArray } from "@/lib/constants";

import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const store = await cookies();
  const language = store.get("language")?.value || "en";
  const locale = LanguagesArray.includes(language) ? language : "en";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
