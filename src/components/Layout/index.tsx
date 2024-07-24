"use client";

import { LayoutType } from "@/data/types/global";
import React, { useEffect } from "react";

// Import the JSON file
import { DisclaimerModal, NoticeModal } from "../Common/Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setNoticeModal } from "@/redux/slices/calcSlice";
import { BounceLoader } from "react-spinners";

// Use the data with the defined type

const Layout = (props: LayoutType) => {
    const dispatch = useAppDispatch();

    const { isNoticeModal, isLoading, isDisclaimerModal } = useAppSelector(
        (state) => state.calc
    );

    useEffect(() => {
        // const noticeLocalModal = localStorage.getItem("notice-modal");
        // if (!noticeLocalModal || noticeLocalModal == "") {
        //     localStorage.setItem("notice-modal", "true");
        dispatch(setNoticeModal(true));
        // }
    }, []);

    return (
        <div className="relative">
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-80 lg:flex-col">
                {!!props.leftSidebar && props.leftSidebar}
            </div>
            <div className="w-full p-8 lg:pl-[352px]">
                {props.header}
                <div className="">{props.children}</div>
            </div>
            {!!props.footer && props.footer}
            {isNoticeModal && <NoticeModal />}
            {isDisclaimerModal && <DisclaimerModal />}
            <div
                className={`absolute top-0 left-0 right-0 bottom-0 w-full h-fullflex pt-[calc(50vh-30px)] pl-[calc(50vw-30px)] justify-between ${
                    isLoading ? "bg-white z-[100]" : "bg-transparent z-[-10]"
                } duration-75`}
            >
                <BounceLoader
                    color={"#8cc44f"}
                    loading={isLoading}
                    size={60}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    );
};

export default Layout;
