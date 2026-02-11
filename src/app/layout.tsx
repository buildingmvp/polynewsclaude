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
            className="absolute rounded-full blur-[120px] opacity-80"
            style={{
              top: "-15%",
              left: "-5%",
              width: "500px",
              height: "500px",
              background:
                "radial-gradient(circle, rgba(42, 108, 237, 0.12) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full blur-[120px] opacity-80"
            style={{
              bottom: "-10%",
              right: "-5%",
              width: "600px",
              height: "600px",
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full blur-[100px] opacity-60"
            style={{
              top: "40%",
              right: "15%",
              width: "350px",
              height: "350px",
              background:
                "radial-gradient(circle, rgba(34, 197, 94, 0.06) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full blur-[80px] opacity-40"
            style={{
              top: "60%",
              left: "10%",
              width: "250px",
              height: "250px",
              background:
                "radial-gradient(circle, rgba(239, 68, 68, 0.05) 0%, transparent 70%)",
            }}
          />
        </div>

        {children}
      </body>
    </html>
  );
}
