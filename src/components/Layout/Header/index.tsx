import React from "react";
import Logo from "./Logo";
import DropDownProfile from "./DropdownProfile";
import { cx, focusRing } from "@/lib/utils";
import { Button } from "@/components/Common/Button";
import { RiMore2Fill } from "@remixicon/react";

const Header = () => {
    return (
        <header className="ml-72 sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-lg text-tremo-brand-secondary">
            <div className="w-full px-4 lg:px-8">
                <div className="flex h-16 w-full items-center justify-end"></div>
            </div>
        </header>
    );
};

export default Header;
