"use client";

import React, { useEffect, useState } from "react";
import Logo from "../Header/Logo";
import DropDownProfile from "../Header/DropdownProfile";
import { Button } from "@/components/Common/Button";
import { cx, focusRing } from "@/lib/utils";
import {
    RiAlarmFill,
    RiMoneyDollarCircleFill,
    RiMore2Fill,
    RiOrganizationChart,
    RiPercentFill,
    RiPsychotherapyFill,
} from "@remixicon/react";
import { Badge, Divider, TextInput } from "@tremor/react";
import { DEFAULT_INPUTS } from "@/data";
import {
    validateBeginningYear,
    validateClientAge,
    validateField,
    validateYears,
} from "@/utils/validate";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    setAvgGrowth,
    setBalances,
    setEarningsCapRate,
    setFinalGrowth,
    setIsLoading,
} from "@/redux/slices/calcSlice";
import { supabase } from "@/utils/supabaseClient";
import { getInitials } from "@/utils";

const LeftSidebar = () => {
    const dispatch = useAppDispatch();
    const { snGrowth, calcAction } = useAppSelector((state) => state.calc);
    const { userInfo } = useAppSelector((state) => state.auth);

    // State for form inputs and errors
    const [investment, setInvestment] = useState<number>(
        DEFAULT_INPUTS.investment
    );
    const [clientAge, setClientAge] = useState<number>(
        DEFAULT_INPUTS.clientAge
    );
    const [years, setYears] = useState<number>(DEFAULT_INPUTS.years);
    const [beginningYear, setBeginningYear] = useState<number>(
        DEFAULT_INPUTS.beginning_year
    );
    const [fee, setFee] = useState<number>(DEFAULT_INPUTS.fee);
    const [spRate, setSpRate] = useState<number>(DEFAULT_INPUTS.sp_rate);
    const [wdMoney, setWdMoney] = useState<number>(DEFAULT_INPUTS.wd_money);
    const [inPar, setInPar] = useState<number>(DEFAULT_INPUTS.in_par);
    const [capRate, setCapRate] = useState<number>(DEFAULT_INPUTS.cap_rate);
    const [inParRate, setInParRate] = useState<number>(DEFAULT_INPUTS.sp_rate);
    const [inParWdMoney, setInParWdMoney] = useState<number>(
        DEFAULT_INPUTS.wd_money
    );
    const [inParBonusRate, setInParBonusRate] = useState<number>(
        DEFAULT_INPUTS.sp_rate
    );
    const [inParBonus, setInParBonus] = useState<number>(DEFAULT_INPUTS.bonus);
    const [inParBonusWdMoney, setInParBonusWdMoney] = useState(
        DEFAULT_INPUTS.wd_money
    );
    const [snRate, setSnRate] = useState<number>(DEFAULT_INPUTS.sp_rate);
    const [snWdMoney, setSnWdMoney] = useState<number>(DEFAULT_INPUTS.wd_money);

    // State for validation errors
    const [investmentError, setInvestmentError] = useState("");
    const [clientAgeError, setClientAgeError] = useState("");
    const [yearsError, setYearsError] = useState("");
    const [beginningYearError, setBeginningYearError] = useState("");
    const [feeError, setFeeError] = useState("");
    const [spRateError, setSpRateError] = useState("");
    const [wdMoneyError, setWdMoneyError] = useState("");
    const [inParError, setInParError] = useState("");
    const [capRateError, setCapRateError] = useState("");
    const [inParRateError, setInParRateError] = useState("");
    const [inParWdMoneyError, setInParWdMoneyError] = useState("");
    const [inParBonusRateError, setInParBonusRateError] = useState("");
    const [inParBonusError, setInParBonusError] = useState("");
    const [inParBonusWdMoneyError, setInParBonusWdMoneyError] = useState("");
    const [snRateError, setSnRateError] = useState("");
    const [snWdMoneyError, setSnWdMoneyError] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        console.log(userInfo);
        (async () => {
            if (
                userInfo &&
                userInfo.userInfo.emails &&
                userInfo.userInfo.emails.length != 0
            ) {
                const { data, error } = await supabase
                    .from("users")
                    .select("*")
                    .eq("email", userInfo.userInfo.emails[0]);
                console.log(data, error);
                if (data != null && data.length != 0) {
                    setUserName(data[0].name);
                }
                if (error) {
                    console.error("error", error);
                }
            }
        })();
    }, [userInfo]);

    const calcAccuntBalance = async () => {
        // Ignore if the validation is not correct.
        if (
            investmentError != "" ||
            clientAgeError != "" ||
            yearsError != "" ||
            beginningYearError != ""
        ) {
            return;
        }
        dispatch(setIsLoading(true));
        try {
            const response = await fetch("/api/calculate-rate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    investment,
                    clientAge,
                    years,
                    beginningYear,
                    fee,
                    spRate,
                    wdMoney,
                    inPar,
                    inParRate,
                    capRate,
                    inParWdMoney,
                    inParBonusRate,
                    inParBonus,
                    inParBonusWdMoney,
                    snRate,
                    snWdMoney,
                    snGrowth: snGrowth.slice(
                        beginningYear - 1970,
                        beginningYear - 1970 + years
                    ),
                }),
            });
            const data = await response.json();
            dispatch(setBalances(data.history));
            dispatch(setAvgGrowth(data.avgGrowth));
            dispatch(setEarningsCapRate(data.earningsCapRate));
            dispatch(setFinalGrowth(data.final));
            dispatch(setIsLoading(false));
        } catch (error: any) {
            console.log(error.message);
            dispatch(setIsLoading(false));
        }
    };

    useEffect(() => {
        calcAccuntBalance();
    }, [calcAction]);

    // Handle form submission or field changes
    const handleInvestmentChange = (value: number) => {
        setInvestment(value);
        validateField(value, setInvestmentError);
    };

    const handleClientAgeChange = (value: number) => {
        setClientAge(value);
        validateClientAge(value, setClientAgeError);
    };

    const handleYearsChange = (value: number) => {
        setYears(value);
        validateYears(value, setYearsError);
    };

    const handleBeginningYearChange = (value: number) => {
        setBeginningYear(value);
        validateBeginningYear(value, setBeginningYearError);
    };

    const handleFeeChange = (value: number) => {
        setFee(value);
        validateField(value, setFeeError);
    };

    const handleSpRateChange = (value: number) => {
        setSpRate(value);
        validateField(value, setSpRateError);
    };

    const handleWdMoneyChange = (value: number) => {
        setWdMoney(value);
        validateField(value, setWdMoneyError);
    };

    const handleInParRateChange = (value: number) => {
        setInParRate(value);
        validateField(value, setInParRateError);
    };

    const handleInParChange = (value: number) => {
        setInPar(value);
        validateField(value, setInParError);
    };

    const handleCapRateChange = (value: number) => {
        setCapRate(value);
        validateField(value, setCapRateError);
    };

    const handleInParWdMoneyChange = (value: number) => {
        setInParWdMoney(value);
        validateField(value, setInParWdMoneyError);
    };

    const handleInParBonusRateChange = (value: number) => {
        setInParBonusRate(value);
        validateField(value, setInParBonusRateError);
    };

    const handleInParBonusChange = (value: number) => {
        setInParBonus(value);
        validateField(value, setInParBonusError);
    };

    const handleInParBonusWdMoneyChange = (value: number) => {
        setInParBonusWdMoney(value);
        validateField(value, setInParBonusWdMoneyError);
    };

    const handleSnRateChange = (value: number) => {
        setSnRate(value);
        validateField(value, setSnRateError);
    };

    const handleSnWdMoneyChange = (value: number) => {
        setSnWdMoney(value);
        validateField(value, setSnWdMoneyError);
    };

    // JSX rendering
    return (
        <aside className="flex grow flex-col gap-y-6 overflow-y-auto border-r border-gray-200 bg-white py-4 dark:border-gray-800 dark:bg-gray-950">
            <div className="flex flex-1 flex-col">
                <div className="flex justify-center mt-4 px-4">
                    <Logo />
                </div>
                <div className="mt-[40px] h-[calc(100vh-188px)] overflow-y-auto px-4">
                    <div>
                        <Divider className="my-2">Default Values</Divider>
                        <div className="col-span-full sm:col-span-3 h-[90px]">
                            <label className="text-sm leading-none text-gray-600 dark:text-gray-50 font-medium">
                                Investment amount($)
                            </label>
                            <TextInput
                                icon={RiMoneyDollarCircleFill}
                                className="mx-auto max-w-xs mt-1"
                                placeholder="Investment"
                                type="number"
                                value={investment.toString()}
                                onChange={(e) =>
                                    handleInvestmentChange(
                                        parseFloat(e.target.value)
                                    )
                                }
                                onBlur={(e) => {
                                    calcAccuntBalance();
                                    handleInvestmentChange(
                                        parseFloat(e.target.value)
                                    );
                                }}
                                error={!!investmentError}
                                errorMessage={investmentError}
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3 h-[90px]">
                            <label className="text-sm leading-none text-gray-600 dark:text-gray-50 font-medium">
                                Client age
                            </label>
                            <TextInput
                                className="mx-auto max-w-xs mt-1"
                                icon={RiPsychotherapyFill}
                                placeholder="Client Age"
                                type="number"
                                value={clientAge.toString()}
                                onChange={(e) =>
                                    handleClientAgeChange(
                                        parseInt(e.target.value)
                                    )
                                }
                                onBlur={(e) => {
                                    calcAccuntBalance();
                                    handleClientAgeChange(
                                        parseInt(e.target.value)
                                    );
                                }}
                                error={!!clientAgeError}
                                errorMessage={clientAgeError}
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3 h-[90px]">
                            <label className="text-sm leading-none text-gray-600 dark:text-gray-50 font-medium">
                                Years
                            </label>
                            <TextInput
                                className="mx-auto max-w-xs mt-1"
                                icon={RiAlarmFill}
                                placeholder="Years"
                                type="number"
                                value={years.toString()}
                                onChange={(e) =>
                                    handleYearsChange(parseInt(e.target.value))
                                }
                                onBlur={(e) => {
                                    calcAccuntBalance();
                                    handleYearsChange(parseInt(e.target.value));
                                }}
                                error={!!yearsError}
                                errorMessage={yearsError}
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3 h-[90px]">
                            <label className="text-sm leading-none text-gray-600 dark:text-gray-50 font-medium">
                                Beginning year
                            </label>
                            <TextInput
                                className="mx-auto max-w-xs mt-1"
                                icon={RiOrganizationChart}
                                placeholder="Year"
                                type="number"
                                value={beginningYear.toString()}
                                onChange={(e) =>
                                    handleBeginningYearChange(
                                        parseInt(e.target.value)
                                    )
                                }
                                onBlur={(e) => {
                                    calcAccuntBalance();
                                    handleBeginningYearChange(
                                        parseInt(e.target.value)
                                    );
                                }}
                                error={!!beginningYearError}
                                errorMessage={beginningYearError}
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3 h-[90px]">
                            <label className="text-sm leading-none text-gray-600 dark:text-gray-50 font-medium">
                                Management fee (%)
                            </label>
                            <TextInput
                                className="mx-auto max-w-xs mt-1"
                                icon={RiAlarmFill}
                                placeholder="Fee"
                                type="number"
                                value={fee.toString()}
                                onChange={(e) =>
                                    handleFeeChange(parseInt(e.target.value))
                                }
                                onBlur={(e) => {
                                    calcAccuntBalance();
                                    handleFeeChange(parseInt(e.target.value));
                                }}
                                error={!!feeError}
                                errorMessage={feeError}
                            />
                        </div>
                    </div>
                    <div className="mt-[10px]">
                        <Divider className="my-2">
                            <Badge color={"orange"}>S&P 500 Index</Badge>
                        </Divider>
                        <div className="col-span-full sm:col-span-3 h-[90px]">
                            <label className="text-sm leading-none text-gray-600 dark:text-gray-50 font-medium">
                                Desired allocation (%)
                            </label>
                            <TextInput
                                className="mx-auto max-w-xs mt-1"
                                icon={RiPercentFill}
                                placeholder="Allocation"
                                type="number"
                                value={spRate.toString()}
                                onChange={(e) =>
                                    handleSpRateChange(
                                        parseFloat(e.target.value)
                                    )
                                }
                                onBlur={(e) => {
                                    calcAccuntBalance();
                                    handleSpRateChange(
                                        parseFloat(e.target.value)
                                    );
                                }}
                                error={!!spRateError}
                                errorMessage={spRateError}
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3 h-[90px]">
                            <label className="text-sm leading-none text-gray-600 dark:text-gray-50 font-medium">
                                Withdrawals
                            </label>
                            <TextInput
                                className="mx-auto max-w-xs mt-1"
                                icon={RiMoneyDollarCircleFill}
                                placeholder="Withdrawals"
                                type="number"
                                value={wdMoney.toString()}
                                onChange={(e) =>
                                    handleWdMoneyChange(
                                        parseFloat(e.target.value)
                                    )
                                }
                                onBlur={(e) => {
                                    calcAccuntBalance();
                                    handleWdMoneyChange(
                                        parseFloat(e.target.value)
                                    );
                                }}
                                error={!!wdMoneyError}
                                errorMessage={wdMoneyError}
                            />
                        </div>
                    </div>
                    <div className="mt-[10px]">
                        <Divider className="my-2">
                            <Badge color={"purple"}>FIA + Index Par</Badge>
                        </Divider>
                        <div className="col-span-full sm:col-span-3 h-[90px]">
                            <label className="text-sm leading-none text-gray-600 dark:text-gray-50 font-medium">
                                Desired allocation (%)
                            </label>
                            <TextInput
                                className="mx-auto max-w-xs mt-1"
                                icon={RiPercentFill}
                                placeholder="Allocation"
                                type="number"
                                value={inParRate.toString()}
                                onChange={(e) =>
                                    handleInParRateChange(
                                        parseFloat(e.target.value)
                                    )
                                }
                                onBlur={(e) => {
                                    calcAccuntBalance();
                                    handleInParRateChange(
                                        parseFloat(e.target.value)
                                    );
                                }}
                                error={!!inParRateError}
                                errorMessage={inParRateError}
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3 h-[90px]">
                            <label className="text-sm leading-none text-gray-600 dark:text-gray-50 font-medium">
                                Index Par (%)
                            </label>
                            <TextInput
                                className="mx-auto max-w-xs mt-1"
                                icon={RiPercentFill}
                                placeholder="Index Par"
                                type="number"
                                value={inPar.toString()}
                                onChange={(e) =>
                                    handleInParChange(
                                        parseFloat(e.target.value)
                                    )
                                }
                                onBlur={(e) => {
                                    calcAccuntBalance();
                                    handleInParChange(
                                        parseFloat(e.target.value)
                                    );
                                }}
                                error={!!inParError}
                                errorMessage={inParError}
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3 h-[90px]">
                            <label className="text-sm leading-none text-gray-600 dark:text-gray-50 font-medium">
                                Earnings Cap Rate (%)
                            </label>
                            <TextInput
                                className="mx-auto max-w-xs mt-1"
                                icon={RiPercentFill}
                                placeholder="Earnings Cap Rate"
                                type="number"
                                value={capRate.toString()}
                                onChange={(e) =>
                                    handleCapRateChange(
                                        parseFloat(e.target.value)
                                    )
                                }
                                onBlur={(e) => {
                                    calcAccuntBalance();
                                    handleCapRateChange(
                                        parseFloat(e.target.value)
                                    );
                                }}
                                error={!!capRateError}
                                errorMessage={capRateError}
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3 h-[90px]">
                            <label className="text-sm leading-none text-gray-600 dark:text-gray-50 font-medium">
                                Withdrawals
                            </label>
                            <TextInput
                                className="mx-auto max-w-xs mt-1"
                                icon={RiMoneyDollarCircleFill}
                                placeholder="Withdrawals"
                                type="number"
                                value={inParWdMoney.toString()}
                                onChange={(e) =>
                                    handleInParWdMoneyChange(
                                        parseFloat(e.target.value)
                                    )
                                }
                                onBlur={(e) => {
                                    calcAccuntBalance();
                                    handleInParWdMoneyChange(
                                        parseFloat(e.target.value)
                                    );
                                }}
                                error={!!inParWdMoneyError}
                                errorMessage={inParWdMoneyError}
                            />
                        </div>
                    </div>
                    <div className="mt-[10px]">
                        <Divider className="my-2">
                            <Badge color={"green"}>
                                FIA + Index Par + Bonus
                            </Badge>
                        </Divider>
                        <div className="col-span-full sm:col-span-3 h-[90px]">
                            <label className="text-sm leading-none text-gray-600 dark:text-gray-50 font-medium">
                                Desired allocation (%)
                            </label>
                            <TextInput
                                className="mx-auto max-w-xs mt-1"
                                icon={RiPercentFill}
                                placeholder="Allocation"
                                type="number"
                                value={inParBonusRate.toString()}
                                onChange={(e) =>
                                    handleInParBonusRateChange(
                                        parseFloat(e.target.value)
                                    )
                                }
                                onBlur={(e) => {
                                    calcAccuntBalance();
                                    handleInParBonusRateChange(
                                        parseFloat(e.target.value)
                                    );
                                }}
                                error={!!inParBonusRateError}
                                errorMessage={inParBonusRateError}
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3 h-[90px]">
                            <label className="text-sm leading-none text-gray-600 dark:text-gray-50 font-medium">
                                Bonus (%)
                            </label>
                            <TextInput
                                className="mx-auto max-w-xs mt-1"
                                icon={RiPercentFill}
                                placeholder="Bonus"
                                type="number"
                                value={inParBonus.toString()}
                                onChange={(e) =>
                                    handleInParBonusChange(
                                        parseFloat(e.target.value)
                                    )
                                }
                                onBlur={(e) => {
                                    calcAccuntBalance();
                                    handleInParBonusChange(
                                        parseFloat(e.target.value)
                                    );
                                }}
                                error={!!inParBonusError}
                                errorMessage={inParBonusError}
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3 h-[90px]">
                            <label className="text-sm leading-none text-gray-600 dark:text-gray-50 font-medium">
                                Withdrawals
                            </label>
                            <TextInput
                                className="mx-auto max-w-xs mt-1"
                                icon={RiMoneyDollarCircleFill}
                                placeholder="Withdrawals"
                                type="number"
                                value={inParBonusWdMoney.toString()}
                                onChange={(e) =>
                                    handleInParBonusWdMoneyChange(
                                        parseFloat(e.target.value)
                                    )
                                }
                                onBlur={(e) => {
                                    calcAccuntBalance();
                                    handleInParBonusWdMoneyChange(
                                        parseFloat(e.target.value)
                                    );
                                }}
                                error={!!inParBonusWdMoneyError}
                                errorMessage={inParBonusWdMoneyError}
                            />
                        </div>
                    </div>
                    <div className="mt-[10px]">
                        <Divider className="my-2">
                            <Badge color={"blue"}>Structured Notes</Badge>
                        </Divider>
                        <div className="col-span-full sm:col-span-3 h-[90px]">
                            <label className="text-sm leading-none text-gray-600 dark:text-gray-50 font-medium">
                                Desired allocation (%)
                            </label>
                            <TextInput
                                className="mx-auto max-w-xs mt-1"
                                icon={RiPercentFill}
                                placeholder="Allocation"
                                type="number"
                                value={snRate.toString()}
                                onChange={(e) =>
                                    handleSnRateChange(
                                        parseFloat(e.target.value)
                                    )
                                }
                                onBlur={(e) => {
                                    calcAccuntBalance();
                                    handleSnRateChange(
                                        parseFloat(e.target.value)
                                    );
                                }}
                                error={!!snRateError}
                                errorMessage={snRateError}
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3 h-[90px]">
                            <label className="text-sm leading-none text-gray-600 dark:text-gray-50 font-medium">
                                Withdrawals
                            </label>
                            <TextInput
                                className="mx-auto max-w-xs mt-1"
                                icon={RiMoneyDollarCircleFill}
                                placeholder="Withdrawals"
                                type="number"
                                value={snWdMoney.toString()}
                                onChange={(e) =>
                                    handleSnWdMoneyChange(
                                        parseFloat(e.target.value)
                                    )
                                }
                                onBlur={(e) => {
                                    calcAccuntBalance();
                                    handleSnWdMoneyChange(
                                        parseFloat(e.target.value)
                                    );
                                }}
                                error={!!snWdMoneyError}
                                errorMessage={snWdMoneyError}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:w-full px-4">
                <DropDownProfile>
                    <Button
                        aria-label="User settings"
                        variant="ghost"
                        className={cx(
                            focusRing,
                            "group flex w-full !outline-none items-center justify-between rounded-md p-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                        )}
                    >
                        <span className="flex items-center gap-3">
                            <span
                                className="flex aspect-square size-8 items-center justify-center rounded bg-tremor-brand-primary p-2 text-xs font-medium text-white dark:bg-indigo-500"
                                aria-hidden="true"
                            >
                                {getInitials(userName)}
                            </span>
                            <span>{userName}</span>
                        </span>
                        <RiMore2Fill
                            className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-hover:dark:text-gray-400"
                            aria-hidden="true"
                        />
                    </Button>
                </DropDownProfile>
            </div>
        </aside>
    );
};

export default LeftSidebar;
