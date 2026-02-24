import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import HandbookLayout from "@/components/layout/HandbookLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata = {
  title: "Diqra | Director's Handbook",
  description: "Executive control documentation for Diqra Architecture + Infrastructure",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <HandbookLayout>{children}</HandbookLayout>
      </body>
    </html>
  );
}
