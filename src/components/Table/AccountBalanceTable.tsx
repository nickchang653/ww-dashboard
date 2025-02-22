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
        isIndexPar,
        isEditableModal,
        snGrowth,
        finalGrowth,
        avgGrowth,
        earningsCapRate,
    } = useAppSelector((state) => state.calc);
    return (
        <Card title="Account Balance Table" editable="true">
            <Table className="tremor-table-custom text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell
                            className="table-header-cell"
                            colSpan={3}
                        ></TableHeaderCell>
                        <TableHeaderCell colSpan={3}>
                            <Callout
                                title="S&P 500 Index Decumulation With Volatility & “Naked Risk"
                                color="orange"
                            ></Callout>
                        </TableHeaderCell>
                        {!isIndexPar && (
                            <TableHeaderCell colSpan={3}>
                                <Callout
                                    title="Fixed Rate of Return Decumulation Without Volatility  & No “Naked Risk”"
                                    color="green"
                                ></Callout>
                            </TableHeaderCell>
                        )} 
                        {isIndexPar && (
                            <>
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
                            </>
                        )}
                    </TableRow>
                    <TableRow>
                        <TableHeaderCell>No</TableHeaderCell>
                        <TableHeaderCell>Age</TableHeaderCell>
                        <TableHeaderCell>Year</TableHeaderCell>
                        <TableHeaderCell>Balance</TableHeaderCell>
                        <TableHeaderCell>Growth</TableHeaderCell>
                        <TableHeaderCell>W/D</TableHeaderCell>
                        {!isIndexPar && (
                            <>
                                <TableHeaderCell>Balance</TableHeaderCell>
                                <TableHeaderCell>Growth</TableHeaderCell>
                                <TableHeaderCell>W/D</TableHeaderCell>
                            </>
                        )}
                        {isIndexPar && (
                            <>
                                <TableHeaderCell>Balance</TableHeaderCell>
                                <TableHeaderCell>Growth</TableHeaderCell>
                                <TableHeaderCell>W/D</TableHeaderCell>
                                <TableHeaderCell>Balance</TableHeaderCell>
                                <TableHeaderCell>Growth</TableHeaderCell>
                                <TableHeaderCell>W/D</TableHeaderCell>
                            </>
                        )}
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
                                {!isIndexPar && (
                                    <>
                                        <TableCell className="bg-[#8cc44f1a]">
                                            {formatCurrency(Math.round(bl.sn.balance))}
                                        </TableCell>
                                        <TableCell className="bg-[#8cc44f1a]">
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
                                        <TableCell className="bg-[#8cc44f1a]">
                                            {formatCurrency(bl.sn.wdMoney)}
                                        </TableCell>
                                    </>
                                )}
                                {isIndexPar && (
                                    <>
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
                                    </>
                                )}
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
                        <TableCell className="bg-[#ec732a1a] text-[#ec732a]">
                            {formatCurrency(Math.round(finalGrowth.spBalance))}
                        </TableCell>
                        <TableCell className="bg-[#ec732a1a] text-[#ec732a]">{!!avgGrowth.sp ? avgGrowth.sp.toFixed(2) : 0.0}%</TableCell>
                        <TableCell className="bg-[#ec732a1a] text-[#ec732a]">{formatCurrency(balances[0] ? balances[0].sp.wdMoney * balances.length: 0.0)}</TableCell>
                        {!isIndexPar && (
                            <>
                                <TableCell className="bg-[#8cc44f1a] text-[#8cc44f]">
                                    {formatCurrency(Math.round(finalGrowth.snBalance))}
                                </TableCell>
                                <TableCell className="bg-[#8cc44f1a] text-[#8cc44f]">{!!avgGrowth.sn ? avgGrowth.sn.toFixed(2) : 0.0}%</TableCell>
                                <TableCell className="bg-[#8cc44f1a] text-[#8cc44f]">{formatCurrency(balances[0] ? balances[0].sn.wdMoney * balances.length: 0.0)}</TableCell>
                            </>
                        )}
                        {isIndexPar && (
                            <>
                                <TableCell className="bg-[#f4ecfc] text-[#73309e]">
                                    {formatCurrency(
                                        Math.round(finalGrowth.inParBalance)
                                    )}
                                </TableCell>
                                <TableCell className="bg-[#f4ecfc] text-[#73309e]">
                                    {!!avgGrowth.inPar
                                        ? avgGrowth.inPar.toFixed(2)
                                        : 0.0}{" "}
                                    %
                                </TableCell>
                                <TableCell className="bg-[#f4ecfc] text-[#73309e]">{formatCurrency(balances[0] ? balances[0].inPar.wdMoney * balances.length: 0.0)}</TableCell>
                                <TableCell className="bg-[#8cc44f1a] text-[#8cc44f]">
                                    {formatCurrency(
                                        Math.round(finalGrowth.inParBonusBalance)
                                    )}
                                </TableCell>
                                <TableCell className="bg-[#8cc44f1a] text-[#8cc44f]">
                                    {!!avgGrowth.inParBonus
                                        ? avgGrowth.inParBonus.toFixed(2)
                                        : 0.0}{" "}
                                    %
                                </TableCell>
                                <TableCell className="bg-[#8cc44f1a] text-[#8cc44f]">{formatCurrency(balances[0] ? balances[0].inParBonus.wdMoney * balances.length: 0.0)}</TableCell>
                            </>
                        )}
                    </TableRow>
                </TableFoot>
            </Table>
        </Card>
    );
}
