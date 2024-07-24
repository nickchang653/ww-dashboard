"use client";

import { LineChart } from "@tremor/react";

import { FinancialDataProps } from "@/data/types/global";
import Card from "../Common/Card";
import { useAppSelector } from "@/redux/hooks";

const dataFormatter = (number: number) =>
    `$${Intl.NumberFormat("us").format(number).toString()}`;

export function LineChartHero() {
    const { balances } = useAppSelector((state) => state.calc);

    const chart_data = balances.map((item: any) => ({
        year: item.year,
        "S&P 500 Index": item.sp.balance,
        "FIA + Index Par": item.inPar.balance,
        "FIA + Index Par + Bonus": item.inParBonus.balance,
        "Struntured Notes": item.sn.balance,
    }));
    return (
        <Card title="Account Balance">
            <LineChart
                className="h-80 w-full"
                data={chart_data}
                index="year"
                categories={[
                    "S&P 500 Index",
                    "FIA + Index Par",
                    "FIA + Index Par + Bonus",
                    "Struntured Notes",
                ]}
                colors={["orange", "purple", "green", "blue"]}
                valueFormatter={dataFormatter}
                yAxisWidth={80}
                onValueChange={(v) => console.log(v)}
            />
        </Card>
    );
}
