import { Poppins as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700", "800", "100", "200", "300", "500", "600", "900"],
});
