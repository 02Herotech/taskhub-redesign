import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/store/Provider";
import { TokenExpirationCheck } from "@/components/auth/TokenExpirationCheck";

export const metadata: Metadata = {
  title: "Olojà",
  description:
    "Olojà is an AI-driven platform that transcends boundaries, connecting diverse communities with a world of authentic products and services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="facebook-domain-verification"
          content="fvdmvueltfhf25xud8zdn88ms54tib"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '532276502710889');
      fbq('track', 'PageView');
    `,
          }}
        />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=532276502710889&ev=PageView&noscript=1"
          />
        </noscript>

        {/* Google Tag Manager */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9DNH0S7F2B"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-9DNH0S7F2B');
    `,
          }}
        />
      </head>
      <body>
        <Provider>
          <TokenExpirationCheck>
            <main className="min-w-80">{children}</main>
          </TokenExpirationCheck>
        </Provider>
      </body>
    </html>
  );
}
