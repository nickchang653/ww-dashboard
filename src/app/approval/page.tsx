"use client";

import { useAppDispatch } from "@/redux/hooks";
import { setIsLoading } from "@/redux/slices/calcSlice";
import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getAccessToken } from "supertokens-web-js/recipe/session";
import Session from "supertokens-web-js/recipe/session";

const Approval = () => {
    const dispatch = useAppDispatch();
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();
    useEffect(() => {
        (async () => {
            try {
                const userInfoRes = await fetch(
                    process.env.NEXT_PUBLIC_FRONTEND_URL + "/api/user",
                    {
                        headers: {
                            /**
                             * We read the access token from the cookies and use that as a Bearer token when
                             * making network requests.
                             */
                            Authorization: "Bearer " + getAccessToken(),
                        },
                    }
                );
                setLoaded(true);
                if (userInfoRes.status === 200) {
                    const userInfoResponse = await userInfoRes.json();

                    if (
                        userInfoResponse.accessTokenPayload["st-perm"] &&
                        userInfoResponse.accessTokenPayload["st-perm"].v
                            .length != 0
                    ) {
                        router.push("/");
                    }
                }
            } catch (error) {
                setLoaded(true);
            }
        })();
    }, []);

    const logout = async () => {
        dispatch(setIsLoading(true));
        await Session.signOut();
        window.location.href = "/auth";
    };

    return (
        <div className="flex w-[100vw] h-[100vh] items-center justify-center text-center">
            <div>
                <h1 className="text-[25px] mb-1">Pending Approval</h1>
                <p className="text-[18px] mb-10">
                    Your account is pending approval. Please check back later.
                </p>
                <Button onClick={logout}>Log out</Button>
            </div>
        </div>
    );
};

export default Approval;
