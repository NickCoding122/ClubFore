import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Club Fore",
  description: "Club Fore web app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink">{children}</body>
    </html>
  );
}
