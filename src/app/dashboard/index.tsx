"use client";

import Layout from "@/components/Layout";
import LeftSidebar from "@/components/Layout/LeftSidebar";
import { LineChartHero } from "@/components/Charts/LineChart";
import { BarChartHero } from "@/components/Charts/BarChart";
import { AccountBalanceTable } from "@/components/Table/AccountBalanceTable";

import { TryRefreshComponent } from "../components/tryRefreshClientComponent";
import { useEffect, useState } from "react";
import { getAccessToken } from "supertokens-auth-react/recipe/session";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
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
                            .length == 0
                    ) {
                        router.push("/approval");
                    }
                    dispatch(setUserInfo(userInfoResponse));
                }
            } catch (error) {
                setLoaded(true);
            }
        })();
    }, []);

    if (loaded) {
        return (
            <Layout leftSidebar={<LeftSidebar />}>
                <div className="grid grid-cols-10">
                    <div className="col-span-7 mr-4">
                        <LineChartHero />
                    </div>
                    <div className="col-span-3">
                        <BarChartHero />
                    </div>
                </div>
                <div className="mt-4">
                    <AccountBalanceTable />
                </div>
            </Layout>
        );
    } else {
        <></>;
    }
};

export default Dashboard;
