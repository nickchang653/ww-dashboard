import { CardType } from "@/data/types/global";
import { useAppSelector } from "@/redux/hooks";
import {
    setCalcAction,
    setIsEdit,
    setIsEditableModal,
} from "@/redux/slices/calcSlice";
import React from "react";
import { useDispatch } from "react-redux";

const Card = (props: CardType) => {
    const dispatch = useDispatch();
    const { isEdit, calcAction } = useAppSelector((state) => state.calc);
    return (
        <div className={`shadow-tremor rounded-xl ${props.styles}`}>
            <div className="z-10 rounded-xl bg-slate-50/40 p-1.5 ring-1 ring-inset ring-slate-200/50">
                <div className="overflow-hidden rounded-md bg-white p-6 shadow-2xl shadow-black/5 ring-1 ring-slate-900/5">
                    <div className="flex justify-between">
                        <h3 className="text-tremor-default text-tremor-content">
                            {props.title}
                        </h3>
                        {props.editable == "true" && (
                            <div className="">
                                {isEdit == "None" && (
                                    <button
                                        className="relative items-center justify-center whitespace-nowrap rounded-md border text-center text-base font-medium shadow-sm transition-all duration-100 ease-in-out sm:text-sm disabled:pointer-events-none disabled:shadow-none outline outline-offset-2 outline-0 focus-visible:outline-2 outline-indigo-500 dark:outline-indigo-500 border-gray-300 dark:border-gray-800 text-gray-900 dark:text-gray-50 bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900/60 disabled:text-gray-400 disabled:dark:text-gray-600 hidden gap-2 px-2 py-1 sm:flex"
                                        onClick={() => {
                                            dispatch(setIsEditableModal(true));
                                            dispatch(setIsEdit("Edit"));
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                            />
                                        </svg>
                                        Edit
                                    </button>
                                )}
                                {isEdit == "Edit" && (
                                    <button
                                        className="relative inline-flex items-center justify-center whitespace-nowrap rounded-md border px-3 py-1 text-center text-base font-medium shadow-sm transition-all duration-100 ease-in-out sm:text-sm disabled:pointer-events-none disabled:shadow-none outline outline-offset-2 outline-0 focus-visible:outline-2 outline-indigo-500 dark:outline-indigo-500 border-transparent text-white dark:text-gray-50 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-500 dark:hover:bg-indigo-600 disabled:bg-indigo-100 disabled:text-gray-400 gap-2 disabled:dark:bg-indigo-800 disabled:dark:text-indigo-400"
                                        onClick={() => {
                                            dispatch(setIsEditableModal(false));
                                            dispatch(setIsEdit("None"));
                                            setTimeout(() => {
                                                dispatch(
                                                    setCalcAction(!calcAction)
                                                );
                                            }, 300);
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="size-4"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
                                            />
                                        </svg>
                                        Save
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="w-full mt-6 hidden h-fit lg:block">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
