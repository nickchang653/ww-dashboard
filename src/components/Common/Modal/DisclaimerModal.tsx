import { setDisclaimerModal, setNoticeModal } from "@/redux/slices/calcSlice";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

const DisclaimerModal = () => {
    const dispatch = useDispatch();

    const closeDlg = (e: any) => {
        if (
            !!e.target.className &&
            e.target.className.includes("notice-modal")
        ) {
            dispatch(setDisclaimerModal(false));
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
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[42vw]">
                        <div className="bg-white px-4 pb-4 !pt-[32px] sm:p-6 sm:pb-4">
                            <div className="flex text-[12px] gap-1 mb-4">
                                <span>© All</span>
                                <Image
                                    src="/images/Logo-01.png"
                                    alt="logo"
                                    width={166}
                                    height={30}
                                />
                                <span>
                                    rights reserved, Wealth Pilots LLC and
                                    RothReady
                                </span>
                            </div>
                            <div>
                                <span className="text-[12px]">
                                    This calculator is for illustration purposes
                                    only and does not represent any specific
                                    contract or investment recommendation. It is
                                    general in scope and is not intended to
                                    explain in detail how any of these products
                                    work internally. The purpose of this
                                    illustration is to help give context and
                                    explain how fixed index annuities compare to
                                    the S&P 500 index and how a peak performing
                                    annuity can provide growth and retirement
                                    income. Fixed index annuities are subject to
                                    surrender charges and like most financial
                                    products have limitations and availability
                                    varies by state. Annuity buyers should see
                                    product-specific illustrations, disclosures,
                                    riders and contract forms. All investing
                                    involves risk, including the potential loss
                                    of principal and past performance does not
                                    indicate future results. No investment
                                    strategy can guarantee a profit or protect
                                    against loss in periods of declining values.
                                    Annuities are not FDIC insured and they do
                                    not refer, in any way to securities or
                                    investment advisory products. Insurance and
                                    annuity product guarantees are backed by the
                                    financial strength and claims-paying ability
                                    of the issuing insurer. The S&P values for
                                    the years noted, represents historical
                                    performance. The S&P 500 index does not
                                    allow direct investment. It is provided
                                    solely as a benchmark of overall market
                                    performance. Past performance of the S&P
                                    500® is not an indication of future
                                    performance and cannot be guaranteed.
                                    Standard & Poor{"’"}s: “Standard & Poor{"’"}
                                    s®”, “S&P®”, and “S&P 500®” are registered
                                    trademarks of Standard & Poor
                                    {"’"}s Financial Services LLC (“S&P”). S&P
                                    500® Returns based on information obtained
                                    from &nbsp;
                                    <a
                                        className="text-[#1d4ed8] underline"
                                        href="https://www.macrotrends.net/2526/sp-500-historical-annual-returns"
                                        target="blank"
                                    >
                                        https://www.macrotrends.net/2526/sp-500-historical-annual-returns
                                    </a>
                                    <br /> This information is believed to be
                                    reliable but the accuracy of the information
                                    cannot be guaranteed.
                                </span>
                            </div>
                        </div>
                        <div className="px-[24px] py-3 pb-8 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-tremor-brand-primary px-3 py-2 text-sm font-semibold text-white shadow-sm"
                                onClick={() =>
                                    dispatch(setDisclaimerModal(false))
                                }
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

export default DisclaimerModal;
