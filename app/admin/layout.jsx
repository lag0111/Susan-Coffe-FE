import { Inter } from 'next/font/google';
import '../../public/css/bootstrap.min.css';
import '../../public/css/style.css';
import '../../public/css/fontawesome.css';
import LeftBar from './components/leftbar';
import RightBar from './components/rightbar';
import ReduxRender from './components/redux';
import Auth from './auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Susan Coffee',
    description: 'Trang quản lý bằng next js',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body style={{ background: '#eff8ff' }} className={inter.className}>
                <ReduxRender>
                    <Auth>
                        <div className="d-flex min-vh-100">
                            <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-primary" style={{ maxWidth: '280px' }} data-bs-theme="dark">
                                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none justify-content-center">
                                    <img src="/img/logo.svg" alt="Logo" />
                                    <span className="fs-4 d-none d-sm-inline-block">BS ADMIN</span>
                                </a>
                                <hr />
                                <LeftBar />
                            </div>
                            <div className="w-100">
                                <RightBar />
                                <div className="container-fluid p-4">
                                    {children}
                                </div>
                            </div>
                        </div>
                        <script src="/js/google.chart.js"></script>
                        <script src="/js/bootstrap.bundle.min.js"></script>
                    </Auth>
                </ReduxRender>
            </body>
        </html>
    );
}
