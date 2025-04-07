import Link from "next/link";
import React from "react";

const Header = () => {
	return (
		<header className="w-full h-[3rem] flex justify-between items-center p-4">
			<div></div>
			<div className="flex">
				<Link href="#">
					<span className="text-link">로그인</span>
				</Link>
			</div>
		</header>
	);
};

export default Header;
