import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./component/navbar";
import '../../public/css/bootstrap.min.css'
import ReduxRender from "./component/redux";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Susan Coffee",
  description: "Website đặt đồ uống bằng next js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxRender>
          <NavBar></NavBar>
          {children}
          <script src="/js/bootstrap.bundle.min.js"></script>
        </ReduxRender>
      </body>
    </html>
  );
}
