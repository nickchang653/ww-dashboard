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
                    signUpForm: {
                        formFields: [
                            {
                                id: "name",
                                label: "Full name",
                                placeholder: "First name and last name",
                            },
                        ],
                    },
                },
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
                width: 32vw;
                --palette-primary: 140 196 79;
            }
            [data-supertokens~=container] {
                box-shadow: none;
            }
            [data-supertokens=button] {
                border-color: #78a942;
            }
            [data-supertokens=superTokensBranding] {
                display: none;
            }
            [data-supertokens=link] {
                color: #78a942;
            }
            [data-supertokens="link linkButton formLabelLinkBtn forgotPasswordLink"] {
                color: #78a942;
            }
        `,
    };
};
