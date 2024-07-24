"use client";

import Session from "supertokens-web-js/recipe/session";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/Common/Dropdown";
import { RiArrowRightUpLine } from "@remixicon/react";
import React from "react";
import { DropdownUserProfileProps } from "@/data/types/global";
import { useAppDispatch } from "@/redux/hooks";
import {
    setIsLoading,
    setNoticeModal,
    setDisclaimerModal,
} from "@/redux/slices/calcSlice";

const DropDownProfile = ({
    children,
    align = "start",
}: DropdownUserProfileProps) => {
    const dispatch = useAppDispatch();
    async function logout() {
        dispatch(setIsLoading(true));
        await Session.signOut();
        window.location.href = "/auth"; // or to wherever your logic page is
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent align={align}>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={() => dispatch(setDisclaimerModal(true))}
                    >
                        Disclaimer
                        <RiArrowRightUpLine
                            className="mb-1 ml-1 size-2.5 shrink-0 text-gray-500"
                            aria-hidden="true"
                        />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => dispatch(setNoticeModal(true))}
                    >
                        What the tool
                        <RiArrowRightUpLine
                            className="mb-1 ml-1 size-2.5 shrink-0 text-gray-500"
                            aria-hidden="true"
                        />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={logout}>
                        Sign out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropDownProfile;
