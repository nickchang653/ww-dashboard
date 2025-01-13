"use client";

import { BarChart } from "@tremor/react";
import { FinancialDataProps } from "@/data/types/global";
import Card from "../Common/Card";
import { useAppSelector } from "@/redux/hooks";

const dataFormatter = (number: number) =>
    Intl.NumberFormat("us").format(number).toString() + "%";

export function BarChartHero() {
    const { avgGrowth, isIndexPar } = useAppSelector((state) => state.calc);
    const chart_data = isIndexPar ? [
        {
            name: "S&P 500",
            "S&P 500": Math.round(avgGrowth.sp * 100) / 100,
        },
        // {
        //     name: "FRR",
        //     SN: Math.round(avgGrowth.sn * 100) / 100,
        // },
        {
            name: "FIA",
            FIA: Math.round(avgGrowth.inPar * 100) / 100,
        },
        {
            name: "FIA+B",
            "FIA+B": Math.round(avgGrowth.inParBonus * 100) / 100,
        }
    ]: [
        {
            name: "S&P 500",
            "S&P 500": Math.round(avgGrowth.sp * 100) / 100,
        },
        {
            name: "Fixed Return",
            "Fixed Return": Math.round(avgGrowth.sn * 100) / 100,
        }
    ];
    return (
        <Card title="Avg RoR Cap">
            <BarChart
                className="mt-6"
                data={chart_data}
                index="name"
                categories={isIndexPar ? ["S&P 500", "FIA", "FIA+B"]: ["S&P 500", "Fixed Return"]}
                colors={isIndexPar ? ["orange", "purple", "green"]: ["orange", "green"]}
                valueFormatter={dataFormatter}
                yAxisWidth={36}
            />
        </Card>
    );
}
