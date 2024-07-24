import { setNoticeModal } from "@/redux/slices/calcSlice";
import React from "react";
import { useDispatch } from "react-redux";

const NoticeModal = () => {
    const dispatch = useDispatch();

    const closeDlg = (e: any) => {
        if (
            !!e.target.className &&
            e.target.className.includes("notice-modal")
        ) {
            dispatch(setNoticeModal(false));
        }
    };

    return (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
            ></div>
            <div
                className="fixed inset-0 z-10 w-screen overflow-y-auto"
                onClick={(e) => closeDlg(e)}
            >
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 notice-modal">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[37vw]">
                        <div className="bg-white px-4 pb-4 !pt-[32px] sm:p-6 sm:pb-4">
                            <div className="w-full flex justify-center my-4">
                                <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-16 sm:w-16">
                                    <svg
                                        className="h-8 w-8 text-tremor-brand-primary"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3
                                        className="text-tremor-brand-primary text-[20px] text-center font-semibold leading-6"
                                        id="modal-title"
                                    >
                                        Why Every IRA Owner Needs The Withdrawal
                                        Wizard
                                    </h3>
                                    <div className="mt-2 text-center">
                                        <p className="text-sm text-gray-500 leading-sm">
                                            The Withdrawal Wizard was built for
                                            IRA owners to see how taking
                                            withdrawals in down markets can
                                            cannibalize an IRA’s account value &
                                            how this costly & irreversible
                                            mistake can be avoided.
                                        </p>
                                    </div>
                                    <div className="space-y-4 mt-4 mb-4 ml-4">
                                        <p className="">
                                            <span className="italic text-green-500 text-[24px]">
                                                1.
                                            </span>{" "}
                                            Research by William Sharpe,{" "}
                                            <span className="font-bold">
                                                Nobel Prize winning economist
                                            </span>{" "}
                                            shows how withdrawing assets exposed
                                            to market risk in retirement is the
                                            single biggest danger retirees face
                                            today.
                                        </p>
                                        <p className="">
                                            <span className="italic text-green-500 text-[24px]">
                                                2.
                                            </span>{" "}
                                            Why the math is entirely different
                                            when withdrawing assets, versus
                                            accumulating assets & how to{" "}
                                            <span className="font-bold">
                                                Prevent Reverse Dollar Cost
                                                Averaging
                                            </span>{" "}
                                            that can decimate an IRA account
                                            value.
                                        </p>
                                        <p className="">
                                            <span className="text-green-500 text-[24px] italic">
                                                3.
                                            </span>{" "}
                                            <span className="font-bold">
                                                Protect the retirement money
                                                inside your IRA
                                            </span>{" "}
                                            that must work for you 100% of the
                                            time.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-16 py-3 pb-12 sm:flex sm:flex-row-reverse sm:px-12">
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-tremor-brand-primary px-3 py-2 text-sm font-semibold text-white shadow-sm"
                                onClick={() => dispatch(setNoticeModal(false))}
                            >
                                Go back to dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticeModal;
