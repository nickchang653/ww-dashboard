"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { SuperTokensProvider } from "@/app/components/supertokensProvider";
export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <SuperTokensProvider>{children}</SuperTokensProvider>
        </Provider>
    );
}
