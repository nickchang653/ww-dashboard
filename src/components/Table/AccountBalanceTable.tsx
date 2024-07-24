import React from "react";

import {
    Table,
    TableHead,
    TableHeaderCell,
    TableBody,
    TableRow,
    TableCell,
    Callout,
    TextInput,
    TableFoot,
} from "@tremor/react";
import Card from "../Common/Card";
import "../../styles/table.css";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSnSpecificGrowth } from "@/redux/slices/calcSlice";
import { formatCurrency } from "@/utils";

export function AccountBalanceTable() {
    const dispatch = useAppDispatch();
    const {
        balances,
        isEditableModal,
        snGrowth,
        finalGrowth,
        avgGrowth,
        earningsCapRate,
    } = useAppSelector((state) => state.calc);
    return (
        <Card title="Account Balance Table" editable="true">
            <Table className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell
                            className="table-header-cell"
                            colSpan={3}
                        ></TableHeaderCell>
                        <TableHeaderCell colSpan={3}>
                            <Callout
                                title="S&P 500 Index"
                                color="orange"
                            ></Callout>
                        </TableHeaderCell>
                        <TableHeaderCell colSpan={3}>
                            <Callout
                                title="FIA + Index Par"
                                color="purple"
                            ></Callout>
                        </TableHeaderCell>
                        <TableHeaderCell colSpan={3}>
                            <Callout
                                title="FIA + Index Par + Bonus (CI)"
                                className="!border-tremo-brand-primary"
                                color={"green"}
                            ></Callout>
                        </TableHeaderCell>
                        <TableHeaderCell colSpan={3}>
                            <Callout
                                title="Structured Notes (SI)"
                                color="blue"
                            ></Callout>
                        </TableHeaderCell>
                    </TableRow>
                    <TableRow>
                        <TableHeaderCell>No</TableHeaderCell>
                        <TableHeaderCell>Age</TableHeaderCell>
                        <TableHeaderCell>Year</TableHeaderCell>
                        <TableHeaderCell>Balance</TableHeaderCell>
                        <TableHeaderCell>Growth</TableHeaderCell>
                        <TableHeaderCell>W/D</TableHeaderCell>
                        <TableHeaderCell>Balance</TableHeaderCell>
                        <TableHeaderCell>Growth</TableHeaderCell>
                        <TableHeaderCell>W/D</TableHeaderCell>
                        <TableHeaderCell>Balance</TableHeaderCell>
                        <TableHeaderCell>Growth</TableHeaderCell>
                        <TableHeaderCell>W/D</TableHeaderCell>
                        <TableHeaderCell>Balance</TableHeaderCell>
                        <TableHeaderCell>Growth</TableHeaderCell>
                        <TableHeaderCell>W/D</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {balances.map((bl: any, index: number) => {
                        return (
                            <TableRow key={bl.ages}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{bl.ages}</TableCell>
                                <TableCell>{bl.year}</TableCell>
                                <TableCell className="bg-[#ec732a1a]">
                                    {formatCurrency(Math.round(bl.sp.balance))}
                                </TableCell>
                                <TableCell className="bg-[#ec732a1a]">
                                    {bl.sp.growth.toFixed(2)}%
                                </TableCell>
                                <TableCell className="bg-[#ec732a1a]">
                                    {formatCurrency(bl.sp.wdMoney)}
                                </TableCell>
                                <TableCell className="bg-[#f4ecfc]">
                                    {formatCurrency(
                                        Math.round(bl.inPar.balance)
                                    )}
                                </TableCell>
                                <TableCell className="bg-[#f4ecfc]">
                                    {bl.inPar.growth.toFixed(2)}%
                                </TableCell>
                                <TableCell className="bg-[#f4ecfc]">
                                    {formatCurrency(bl.inPar.wdMoney)}
                                </TableCell>
                                <TableCell className="bg-[#8cc44f1a]">
                                    {formatCurrency(
                                        Math.round(bl.inParBonus.balance)
                                    )}
                                </TableCell>
                                <TableCell className="bg-[#8cc44f1a]">
                                    {bl.inParBonus.growth.toFixed(2)}%
                                </TableCell>
                                <TableCell className="bg-[#8cc44f1a]">
                                    {formatCurrency(bl.inParBonus.wdMoney)}
                                </TableCell>
                                <TableCell className="bg-[#3b82f61a]">
                                    {formatCurrency(Math.round(bl.sn.balance))}
                                </TableCell>
                                <TableCell className="bg-[#3b82f61a]">
                                    {isEditableModal ? (
                                        <TextInput
                                            placeholder="Growth"
                                            className="!w-20 !min-w-20"
                                            type="number"
                                            value={snGrowth[
                                                bl.year - 1970
                                            ].toString()}
                                            onChange={(e) =>
                                                dispatch(
                                                    setSnSpecificGrowth({
                                                        snSpecificGrowth:
                                                            e.target.value,
                                                        index: bl.year - 1970,
                                                    })
                                                )
                                            }
                                        />
                                    ) : (
                                        bl.sn.growth.toFixed(2) + "%"
                                    )}{" "}
                                </TableCell>
                                <TableCell className="bg-[#3b82f61a]">
                                    {formatCurrency(bl.sn.wdMoney)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFoot>
                    <TableRow key={"final-row"} className="font-extrabold">
                        <TableCell
                            rowSpan={1}
                            colSpan={3}
                            className="text-center"
                        >
                            <span>{"Total"}</span>
                        </TableCell>
                        <TableCell className="bg-[#ec732a1a]">
                            {formatCurrency(Math.round(finalGrowth.spBalance))}
                        </TableCell>
                        <TableCell className=""></TableCell>
                        <TableCell className=""></TableCell>
                        <TableCell className="bg-[#f4ecfc]">
                            {formatCurrency(
                                Math.round(finalGrowth.inParBalance)
                            )}
                        </TableCell>
                        <TableCell className=""></TableCell>
                        <TableCell className=""></TableCell>
                        <TableCell className="bg-[#8cc44f1a]">
                            {formatCurrency(
                                Math.round(finalGrowth.inParBonusBalance)
                            )}
                        </TableCell>
                        <TableCell className=""></TableCell>
                        <TableCell className=""></TableCell>
                        <TableCell className="bg-[#3b82f61a]">
                            {formatCurrency(Math.round(finalGrowth.snBalance))}
                        </TableCell>
                        <TableCell className=""></TableCell>
                        <TableCell className=""></TableCell>
                    </TableRow>
                    <TableRow key={"avg-row"} className="font-extrabold">
                        <TableCell
                            rowSpan={1}
                            colSpan={3}
                            className="text-center"
                        ></TableCell>
                        <TableCell className="bg-[#ec732a1a]">
                            Avg ROR
                        </TableCell>
                        <TableCell
                            className="bg-[#ec732a1a] text-center"
                            colSpan={2}
                        >
                            {!!avgGrowth.sp ? avgGrowth.sp.toFixed(2) : 0.0}%
                        </TableCell>
                        <TableCell className="bg-[#f4ecfc]">Avg ROR</TableCell>
                        <TableCell
                            className="bg-[#f4ecfc] text-center"
                            colSpan={2}
                        >
                            {!!avgGrowth.inPar
                                ? avgGrowth.inPar.toFixed(2)
                                : 0.0}{" "}
                            %
                        </TableCell>
                        <TableCell className="bg-[#8cc44f1a]">
                            Avg ROR
                        </TableCell>
                        <TableCell
                            className="bg-[#8cc44f1a] text-center"
                            colSpan={2}
                        >
                            {!!avgGrowth.inParBonus
                                ? avgGrowth.inParBonus.toFixed(2)
                                : 0.0}{" "}
                            %
                        </TableCell>
                        <TableCell className="bg-[#3b82f61a]">
                            Avg ROR
                        </TableCell>
                        <TableCell
                            className="bg-[#3b82f61a] text-center"
                            colSpan={2}
                        >
                            {!!avgGrowth.sn ? avgGrowth.sn.toFixed(2) : 0.0}%
                        </TableCell>
                    </TableRow>
                </TableFoot>
            </Table>
        </Card>
    );
}
