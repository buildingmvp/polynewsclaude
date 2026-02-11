import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PolyNews — What Prediction Markets Got Right",
  description:
    "See what Polymarket prediction markets just resolved. Track accuracy, browse by category, and stay informed on world events through the lens of prediction markets.",
  openGraph: {
    title: "PolyNews — What Prediction Markets Got Right",
    description:
      "Resolved prediction markets, real-time accuracy tracking, and world events through Polymarket data.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {/* Ambient gradient background for glassmorphism effect */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div
            className="absolute rounded-full blur-[140px]"
            style={{
              top: "-10%",
              left: "-5%",
              width: "500px",
              height: "500px",
              background:
                "radial-gradient(circle, rgba(46, 92, 255, 0.08) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full blur-[140px]"
            style={{
              bottom: "-10%",
              right: "-5%",
              width: "550px",
              height: "550px",
              background:
                "radial-gradient(circle, rgba(46, 92, 255, 0.05) 0%, transparent 70%)",
            }}
          />
        </div>

        {children}
      </body>
    </html>
  );
}
