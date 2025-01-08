"use client";

import { LineChart } from "@tremor/react";

import { FinancialDataProps } from "@/data/types/global";
import Card from "../Common/Card";
import { useAppSelector } from "@/redux/hooks";

const dataFormatter = (number: number) =>
    `$${Intl.NumberFormat("us").format(number).toString()}`;

export function LineChartHero() {
    const { balances, isIndexPar } = useAppSelector((state) => state.calc);

    const chart_data = isIndexPar ? balances.map((item: any) => ({
        year: item.year,
        "S&P 500 Index": item.sp.balance,
        // "Fixed Rate of Return": item.sn.balance,
        "FIA + Index Par": item.inPar.balance,
        "FIA + Index Par + Bonus": item.inParBonus.balance,
    })): balances.map((item: any) => ({
        year: item.year,
        "S&P 500 Index": item.sp.balance,
        "Fixed Rate of Return": item.sn.balance,
    }));
    return (
        <Card title="Account Balance">
            <LineChart
                className="h-80 w-full"
                data={chart_data}
                index="year"
                categories={isIndexPar ? [
                    "S&P 500 Index",
                    // "Fixed Rate of Return",
                    "FIA + Index Par",
                    "FIA + Index Par + Bonus",
                ]: [
                    "S&P 500 Index",
                    "Fixed Rate of Return",
                ]}
                colors={isIndexPar ? ["orange", "purple", "green"]: ["orange", "blue"]}
                valueFormatter={dataFormatter}
                yAxisWidth={80}
                onValueChange={(v) => console.log(v)}
            />
        </Card>
    );
}
