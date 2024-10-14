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
import { url } from "inspector";

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
      const result = SuperTokens.canHandleRoute([EmailPasswordPreBuiltUI]);
      setIsAuthURL(result);
    } catch (error) {
      console.error("Error checking if SuperTokens can handle route:", error);
    }
  }, [pathname]);

  return (
    <SuperTokensWrapper>
      {!isAuthURL ? (
        <>{children}</>
      ) : (
        <div className="flex h-[100vh] items-center bg-[url(/images/bg-img.jpg)] bg-no-repeat xl:bg-[length:100%] bg-cover relative after:content-[''] after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-[#78a942] after:opacity-80">
          <div className="container mx-auto px-4 h-full">
            <div className="h-full relative z-50 flex items-center justify-between mx-auto w-full 2xl:max-w-6xl xl:max-w-5xl lg:max-w-4xl">
              <div className="text-[#fff] 2xl:gap-y-8 lg:gap-y-6 md:gap-y-5 text-left 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg 2xl:leading-[40px] pr-2 2xl:max-w-lg xl:max-w-md md:max-w-sm md:grid hidden">
                <p className="flex items-center">
                  <span className="xl:mr-4 md:mr-2 2xl:w-6 2xl:h-6 xl:w-5 xl:h-5 lg:w-4 lg:h-4 md:w-4 md:h-4">
                    <img
                      className="w-full"
                      src="/images/plus-icon.svg"
                      alt="plus-icon"
                    />
                  </span>{" "}
                  <span className="mr-2 text-white font-bold"> PREVENT </span>{" "}
                  <span className="font-light">An IRA Death Spiral</span>
                </p>
                <p className="flex items-center">
                  <span className="xl:mr-4 md:mr-2 2xl:w-6 2xl:h-6 xl:w-5 xl:h-5 lg:w-4 lg:h-4 md:w-4 md:h-4">
                    <img
                      className="w-full"
                      src="/images/plus-icon.svg"
                      alt="plus-icon"
                    />
                  </span>
                  <span className="mr-2 text-white font-bold"> PROTECT </span>{" "}
                  <span className="font-light">Your IRA Income</span>
                </p>
                <p className="flex items-center">
                  <span className="xl:mr-4 md:mr-2 2xl:w-6 2xl:h-6 xl:w-5 xl:h-5 lg:w-4 lg:h-4 md:w-4 md:h-4">
                    <img
                      className="w-full"
                      src="/images/plus-icon.svg"
                      alt="plus-icon"
                    />
                  </span>{" "}
                  <span className="mr-2 text-white font-bold"> PLAN </span>
                  <span className="font-light">
                    {" "}
                    For A Tax Free Retirement{" "}
                  </span>
                </p>
              </div>
              <div className="flex flex-col 2xl:max-w-lg lg:max-w-md md:max-w-[420px] sm:max-w-md md:mx-0 mx-auto w-full md:pl-2 h-full justify-center items-center relative">
                <Card className="!p-0 !rounded-[0px] shadow-xl">
                  <AuthRecipeComponentsOverrideContextProvider
                    components={{
                      AuthPageHeader_Override: ({
                        isSignUp,
                        hasSeparateSignUpView,
                        onSignInUpSwitcherClick,
                        ...props
                      }) => {
                        return (
                          <>
                            <div
                              style={{
                                maxWidth: "400px",
                                width: "100%",
                              }}
                            >
                              <img
                                src="/images/Logo-02.png"
                                style={{
                                  marginBottom: "36px",
                                  objectFit: "contain",
                                  width: "100%",
                                }}
                                alt="logo-4"
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                                maxWidth: "300px",
                                width: "100%",
                                margin: "0px auto 45px",
                              }}
                            >
                              <button
                                style={{
                                  padding: "6px 10px",
                                  fontSize: "20px",
                                  lineHeight: "26px",
                                  height: "100%",
                                  backgroundColor: "white",
                                  color: "black",
                                  border: "none",
                                  fontWeight: "600",
                                  borderBottom: !isSignUp
                                    ? "3px solid #78a942"
                                    : "3px solid transparent",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  if (onSignInUpSwitcherClick) {
                                    onSignInUpSwitcherClick();
                                  }
                                }}
                              >
                                Sign In
                              </button>
                              <button
                                style={{
                                  padding: "6px 10px",
                                  fontSize: "20px",
                                  lineHeight: "26px",
                                  height: "100%",
                                  backgroundColor: "white",
                                  color: "black",
                                  border: "none",
                                  fontWeight: "600",
                                  borderBottom: isSignUp
                                    ? "3px solid #78a942"
                                    : "3px solid transparent",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  if (onSignInUpSwitcherClick) {
                                    onSignInUpSwitcherClick();
                                  }
                                }}
                              >
                                Sign Up
                              </button>
                            </div>
                          </>
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
                          return (
                            <div>
                              <DefaultComponent {...props} />
                            </div>
                          );
                        },
                        EmailPasswordSignInForm_Override: ({
                          DefaultComponent,
                          ...props
                        }) => {
                          // Use Next.js hook to get current path
                          const pathname = usePathname();

                          // Determine if the user is on the sign-up page by checking the path
                          const isSignUp = pathname.includes("signup");
                          // Access isSignUp here from props
                          return (
                            <div>
                              <DefaultComponent {...props} />
                              {!isSignUp ? (
                                <div
                                  className="text-center"
                                  style={{
                                    marginTop: "12px",
                                    lineHeight: "normal",
                                  }}
                                >
                                  <a
                                    href="auth/reset-password?rid=emailpassword"
                                    style={{
                                      color: "#78a942",
                                      textDecoration: "none",
                                      fontSize: "12px",
                                      lineHeight: "16px",
                                    }}
                                  >
                                    Forgot Password?
                                  </a>
                                </div>
                              ) : null}
                            </div>
                          );
                        },
                      }}
                    >
                      <div className="2xl:px-10 2xl:py-20 xl:px-8 xl:py-16 px-6 sm:py-14 py-12">
                        {children}
                      </div>
                    </EmailPasswordComponentsOverrideProvider>
                  </AuthRecipeComponentsOverrideContextProvider>
                </Card>
                <div className="flex flex-col items-center justify-center text-center absolute bottom-10">
                  <div className="2xl:max-w-52 md:max-w-44 max-w-40 w-full mb-1">
                    <img
                      className="w-full"
                      src="/images/Logo-grey-white.png"
                      alt="copyright logo"
                    />
                  </div>
                  <span className="text-white 2xl:text-[10px] md:text-[9px] text-[9px]">
                    © 2025 RothReady & Withdrawal Wizard, All Rights Reserved.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </SuperTokensWrapper>
  );
};
