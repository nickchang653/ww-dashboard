import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <Link href={"/"}>
            <Image
                src={"/images/Logo-02.png"}
                alt="logo"
                width={258}
                height={24}
            />
        </Link>
    );
};

export default Logo;
