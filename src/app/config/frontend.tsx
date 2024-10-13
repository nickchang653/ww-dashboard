import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Dashboard from "supertokens-node/recipe/dashboard";
import Session from "supertokens-auth-react/recipe/session";
import { appInfo } from "./appInfo";
import { useRouter } from "next/navigation";
import { SuperTokensConfig } from "supertokens-auth-react/lib/build/types";

const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } =
  {};

export function setRouter(
  router: ReturnType<typeof useRouter>,
  pathName: string
) {
  routerInfo.router = router;
  routerInfo.pathName = pathName;
}

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo,
    recipeList: [
      EmailPassword.init({
        signInAndUpFeature: {
          signInForm: {
            formFields: [
              {
                id: "email",
                label: " ",
                placeholder: "Email address",
              },
              {
                id: "password",
                label: " ",
                placeholder: "Password",
              },
            ],
          },
          signUpForm: {
            formFields: [
              {
                id: "email",
                // label: "✉️",
                label: "",
                placeholder: "Email address",
              },
              {
                id: "password",
                // label: "🔓",
                label: "",
                placeholder: "Password",
              },
              {
                id: "name",
                // label: "👤",
                label: "",
                placeholder: "Full name",
              },
            ],
          },
        },
        // resetPasswordUsingTokenFeature: {
        //   disableDefaultUI: true,
        // }
      }),
      Session.init(),
    ],
    windowHandler: (original) => ({
      ...original,
      location: {
        ...original.location,
        getPathName: () => routerInfo.pathName!,
        assign: (url) => routerInfo.router!.push(url.toString()),
        setHref: (url) => routerInfo.router!.push(url.toString()),
      },
    }),
    style: `
            [data-supertokens~="container"] {
                width: 100%;
                --palette-primary: 140 196 79;
                border-radius: 15px;
            }
            [data-supertokens~="auth-logo"]{
              display: flex;
            }
            [data-supertokens~=container] {
                box-shadow: none;
                border-radius: 0px;
                margin: 0;
            }
            [data-supertokens="container authPage singleFactor"] [data-supertokens~="row"] {
                width: 100%;
                padding: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            [data-supertokens="container authPage singleFactor"] [data-supertokens~="authComponentList"]{
                max-width: 350px;
                width: 100%;
                padding: 0px 0px 0px 0px;
                margin: 0 auto;
            } 
            [data-supertokens="container authPage singleFactor"] [data-supertokens=button] {
                border-color: #78a942;
                background-color: #78a942;
                border-radius: 30px;
                height: 38px;
            }
            [data-supertokens="container resetPasswordEmailForm"] [data-supertokens=button] {
                border-color: #78a942;
                background-color: #78a942;
            }
            [data-supertokens=superTokensBranding] {
                display: none;
            }
            [data-supertokens=link] {
                color: #78a942;
            }
            [data-supertokens="link linkButton formLabelLinkBtn forgotPasswordLink"] {
                display: none;
            }
            [data-supertokens="container authPage singleFactor"] [data-supertokens~="inputWrapper"] {
                border-radius: 30px;
                height: 38px;
                position: relative;
            }
            [data-supertokens="container authPage singleFactor"] [data-supertokens~="input"]{
                border-radius: 30px;
                border-color: #e2e2e2;
                height: 100%;
                font-size: 12px;
                padding-left: 30px;
                padding-right: 15px;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
            }
            [data-supertokens~="inputContainer"]{
              margin-top: 0px;
            }
             [data-supertokens~="formRow"]{
              position: relative;
            }
            [data-supertokens="container authPage singleFactor"] [data-supertokens~="formRow"]:last-child{
              max-width: 280px;
              width: 100%;
              margin: 0 auto;
            }
            [data-supertokens="container authPage singleFactor"] [data-supertokens~="inputErrorMessage"]{
              font-size: 12px;
              line-height: 1;
              padding: 5px 0px 10px 8px;
              width: 100%;
              max-width: 100%;
            }

            [data-supertokens="container authPage singleFactor"] [data-supertokens="formRow "]:nth-of-type(1) [data-supertokens="label"] {
              background-image: url(/images/email-icon.svg);
              background-repeat: no-repeat;
              background-position: center;
              background-size: 10px;
              height: 12px;
              width: 12px;
              position: absolute;
              z-index: 2;
              top: 12px;
              left: 10px;
            }
            [data-supertokens="container authPage singleFactor"] [data-supertokens="formRow "]:nth-of-type(2) [data-supertokens="label"] {
              background-image: url(/images/password-icon.svg);
              background-repeat: no-repeat;
              background-position: center;
              background-size: 10px;
              height: 12px;
              width: 12px;
              position: absolute;
              z-index: 2;
              top: 12px;
              left: 10px;
            }
            [data-supertokens="container authPage singleFactor"] [data-supertokens="formRow "]:nth-of-type(3) [data-supertokens="label"] {
              background-image: url(/images/user-icon.svg);
              background-repeat: no-repeat;
              background-position: center;
              background-size: 10px;
              height: 12px;
              width: 12px;
              position: absolute;
              z-index: 2;
              top: 12px;
              left: 10px;
            }
            [data-supertokens="container authPage singleFactor"] [data-supertokens="formRow hasError"]:nth-of-type(1) [data-supertokens="label"] {
              background-image: url(/images/email-icon.svg);
              background-repeat: no-repeat;
              background-position: center;
              background-size: 10px;
              height: 12px;
              width: 12px;
              position: absolute;
              z-index: 2;
              top: 12px;
              left: 10px;
            }
            [data-supertokens="container authPage singleFactor"] [data-supertokens="formRow hasError"]:nth-of-type(2) [data-supertokens="label"] {
              background-image: url(/images/password-icon.svg);
              background-repeat: no-repeat;
              background-position: center;
              background-size: 10px;
              height: 12px;
              width: 12px;
              position: absolute;
              z-index: 2;
              top: 12px;
              left: 10px;
            }
            [data-supertokens="container authPage singleFactor"] [data-supertokens="formRow hasError"]:nth-of-type(3) [data-supertokens="label"] {
              background-image: url(/images/user-icon.svg);
              background-repeat: no-repeat;
              background-position: center;
              background-size: 10px;
              height: 12px;
              width: 12px;
              position: absolute;
              z-index: 2;
              top: 12px;
              left: 10px;
            }
            `,
  };
};
