import { setIsEditableModal } from "@/redux/slices/calcSlice";
import React from "react";
import { useDispatch } from "react-redux";

const EditableModal = () => {
    const dispatch = useDispatch();

    const closeDlg = (e: any) => {
        console.log(e.target.className);
        if (
            !!e.target.className &&
            e.target.className.includes("notice-modal")
        ) {
            dispatch(setIsEditableModal(false));
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
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                        <div className="bg-white px-4 pb-4 !pt-[32px] sm:p-6 sm:pb-4">
                            <div className="w-full flex justify-start my-4">
                                <div className="mx-auto flex items-center h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg
                                        className="h-6 w-6 text-tremor-brand-primary"
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
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3
                                        className="text-base font-semibold leading-6 text-gray-900"
                                        id="modal-title"
                                    >
                                        Structured Notes (SI)
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to edit the
                                            growth rates of Structured Notes?
                                            This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"></div>
                            </div>
                        </div>
                        <div className="px-16 py-3 pb-12 sm:flex sm:flex-row-reverse sm:px-12 gap-4">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md bg-tremor-brand-primary px-3 py-2 text-sm font-semibold text-white shadow-sm"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={() =>
                                    dispatch(setIsEditableModal(false))
                                }
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditableModal;
