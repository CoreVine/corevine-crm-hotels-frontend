import { loadFont, loadPageDirection } from "@/lib/fonts";
import "./globals.css";

import { AuthProvider, ReactQueryClientProvider, StoreProvider } from "@/providers";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/toaster";
import { ToastContainer } from "react-toastify";
import { getUser } from "@/actions/auth";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  const user = await getUser();

  return (
    <html lang={locale} dir={loadPageDirection(locale)}>
      <body className={loadFont(locale)}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ReactQueryClientProvider>
            <AuthProvider value={user}>
              <StoreProvider>{children}</StoreProvider>
              <Toaster />
              <ToastContainer />
            </AuthProvider>
          </ReactQueryClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
