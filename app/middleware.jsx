import { NextResponse } from 'next/server';

export async function middleware(request) {
    // Lấy token từ cookie
    const token = request.cookies.get('token');

    // Nếu không có token, điều hướng đến trang đăng nhập
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        // Kiểm tra tính hợp lệ của token
        const res = await fetch('http://localhost:3003/users/checktoken', {
            headers: {
                Authorization: `Bearer ${token}`, // Giả định token là chuỗi
            },
        });

        // Nếu phản hồi không thành công, điều hướng đến trang đăng nhập
        if (!res.ok) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } catch (error) {
        console.error("Error checking token:", error);
        // Nếu có lỗi trong quá trình kiểm tra token, điều hướng đến trang đăng nhập
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Nếu token hợp lệ, cho phép tiếp tục
    return NextResponse.next();
}

// Định cấu hình middleware chỉ áp dụng cho các route `/user`
export const config = {
    matcher: '/info',
};
