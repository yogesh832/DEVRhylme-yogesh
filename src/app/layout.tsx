"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import ToasterContext from "./api/contex/ToasetContex";
import { useEffect, useState } from "react";
import PreLoader from "@/components/Common/PreLoader";
import Loading from "@/components/Common/PreLoader";
import Script from "next/script";
import { UserProvider } from '@auth0/nextjs-auth0/client';


export default function RootLayout({
  children,
}: {
  //this is the type of the children prop
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html
      suppressHydrationWarning={true}
      className="!scroll-smooth"
      lang="en"
    >
            <head>
       {/* Google Analytics */}
       <Script
         strategy="afterInteractive"
         src="https://www.googletagmanager.com/gtag/js?id=G-78M5LJT67E"
       />
       <Script id="google-analytics" strategy="afterInteractive">
         {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', 'G-78M5LJT67E');
         `}
       </Script>
     </head>
      
      <body>
      <UserProvider>
        {loading ? (
          <PreLoader />
        ) : (
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="dark" // Set default theme to dark
            >
              <ToasterContext />
              <Header />
              {children}
              <Footer />
              <ScrollToTop />
            </ThemeProvider>
          </SessionProvider>
        )}
        </UserProvider>
      </body>
    </html>
  );
}
