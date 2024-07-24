"use client";

import React, { useEffect, useState } from "react";
import { SuperTokensWrapper } from "supertokens-auth-react";
import { AuthRecipeComponentsOverrideContextProvider } from "supertokens-auth-react/ui";
import { EmailPasswordComponentsOverrideProvider } from "supertokens-auth-react/recipe/emailpassword";
import SuperTokensReact from "supertokens-auth-react";
import { frontendConfig, setRouter } from "../config/frontend";
import { usePathname, useRouter } from "next/navigation";
import { Card } from "@tremor/react";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import SuperTokens from "supertokens-auth-react/ui";

if (typeof window !== "undefined") {
    // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
    SuperTokensReact.init(frontendConfig());
}

export const SuperTokensProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    setRouter(useRouter(), usePathname() || window.location.pathname);
    const [isAuthURL, setIsAuthURL] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        try {
            const result = SuperTokens.canHandleRoute([
                EmailPasswordPreBuiltUI,
            ]);
            setIsAuthURL(result);
        } catch (error) {
            console.error(
                "Error checking if SuperTokens can handle route:",
                error
            );
        }
    }, [pathname]);

    return (
        <SuperTokensWrapper>
            {!isAuthURL ? (
                <>{children}</>
            ) : (
                <div className="w-[60vw] mx-auto h-[70vh] mt-[15vh]">
                    <Card className="!p-0 !rounded-[20px] shadow shadow-xl">
                        <div className="grid grid-cols-7">
                            <div className="col-span-4 py-10">
                                <AuthRecipeComponentsOverrideContextProvider
                                    components={{
                                        AuthPageHeader_Override: ({
                                            DefaultComponent,
                                            ...props
                                        }) => {
                                            return (
                                                <div className="flex-row gap-4">
                                                    <img
                                                        src="/images/Logo-04.png"
                                                        style={{
                                                            marginBottom:
                                                                "24px",
                                                        }}
                                                        alt="logo-4"
                                                        width={150}
                                                        height={80}
                                                    />
                                                    <DefaultComponent
                                                        {...props}
                                                    />
                                                </div>
                                            );
                                        },
                                    }}
                                >
                                    <EmailPasswordComponentsOverrideProvider
                                        components={{
                                            EmailPasswordSignUpForm_Override: ({
                                                DefaultComponent,
                                                ...props
                                            }) => {
                                                // your customisations here for the email password sign up form...
                                                return (
                                                    <DefaultComponent
                                                        {...props}
                                                    />
                                                );
                                            },
                                        }}
                                    >
                                        <div className="py-4">{children}</div>
                                    </EmailPasswordComponentsOverrideProvider>
                                </AuthRecipeComponentsOverrideContextProvider>
                            </div>
                            <div
                                className="col-span-3 border-l border-l-[#b2b2b2] py-10 rounded-r-[20px]"
                                style={{
                                    background: "#78a942",
                                }}
                            >
                                <div className="text-center p-16 mt-[7vh]">
                                    <div className="flex justify-center mb-10">
                                        <img
                                            src="/images/Logo-03.png"
                                            alt="Withdrawal Wizard Logo"
                                            className="w-[350px] mb-5"
                                        />
                                    </div>
                                    <div className="text-[#525252] gap-4 text-left text-[22px] grid gap-2 leading-[36px]">
                                        <p>
                                            <span className="">1.</span> Prevent
                                            The IRA Death Spiral.
                                        </p>
                                        <p>
                                            <span className="">2.</span> Protect
                                            Your Retirement Income.
                                        </p>
                                        <p>
                                            <span className="">3.</span> Predict
                                            And Maximize Your
                                            &nbsp;&nbsp;&nbsp;&nbsp;Retirement
                                            Income.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </SuperTokensWrapper>
    );
};
