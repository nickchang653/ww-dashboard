"use client";

import { BarChart } from "@tremor/react";
import { FinancialDataProps } from "@/data/types/global";
import Card from "../Common/Card";
import { useAppSelector } from "@/redux/hooks";

const dataFormatter = (number: number) =>
    Intl.NumberFormat("us").format(number).toString() + "%";

export function BarChartHero() {
    const { avgGrowth } = useAppSelector((state) => state.calc);
    const chart_data = [
        {
            name: "S&P 500",
            "S&P 500": Math.round(avgGrowth.sp * 100) / 100,
        },
        {
            name: "FIA",
            FIA: Math.round(avgGrowth.inPar * 100) / 100,
        },
        {
            name: "FIA+B",
            "FIA+B": Math.round(avgGrowth.inParBonus * 100) / 100,
        },
        {
            name: "SN",
            SN: Math.round(avgGrowth.sn * 100) / 100,
        },
    ];
    return (
        <Card title="Avg RoR Cap">
            <BarChart
                className="mt-6"
                data={chart_data}
                index="name"
                categories={["S&P 500", "FIA", "FIA+B", "SN"]}
                colors={["orange", "purple", "green", "blue"]}
                valueFormatter={dataFormatter}
                yAxisWidth={36}
            />
        </Card>
    );
}
