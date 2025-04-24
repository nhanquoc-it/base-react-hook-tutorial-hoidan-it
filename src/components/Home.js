import React from "react";

const Home = () => {
	return (
		<>
			<div className="home-container">
				<h1>Welcome to NhanQuocDev</h1>
				<p>This is a simple React application.</p>
				<p>Explore the features and enjoy!</p>

				<div className="mt-3">
					<h2>Yêu cầu:</h2>
					<br />
					<p>Sử dụng API từ trang web https://reqres.in/ để tạo website</p>
				</div>
				<div>
					Sử dụng thư viện React để tạo một màn hình website cơ bản bao gồm các
					chức năng:
				</div>
				<ul className="mt-3">
					<li>1. Đăng nhập</li>
					<li>2. Thêm User</li>
					<li>3. Sửa User</li>
					<li>4. Xóa User</li>
					<li>5. Hiển thị tất cả User</li>
					<li>6. Tìm kiếm User theo Email</li>
					<li>7. Sắp xếp theo First Name</li>
					<li>8. Import User từ file CSV</li>
					<li>9. Export User từ file CSV</li>
				</ul>
			</div>
			<div>
				Tự do tùy chỉnh html, css, để có một website nhẹ nhàng, khoa học
			</div>
		</>
	);
};

export default Home;
