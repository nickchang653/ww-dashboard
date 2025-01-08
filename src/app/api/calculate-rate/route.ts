// app/api/calculate-rate/route.ts

import { SP_500_GROWTHS } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

type RateRequestBody = {
    investment: number;
    clientAge: number;
    years: number;
    beginningYear: number;
    fee: number;
    spRate: number;
    wdMoney: number;
    inPar: number;
    capRate: number;
    inParRate: number;
    inParWdMoney: number;
    inParBonusRate: number;
    inParBonus: number;
    inParBonusWdMoney: number;
    snRate: number;
    snWdMoney: number;
    fixedRate: number;
    snGrowth: number[];
};

export async function POST(request: NextRequest) {
  const body: RateRequestBody = await request.json();

  const {
    investment,
    clientAge,
    years,
    beginningYear,
    fee,
    spRate,
    wdMoney,
    inPar,
    capRate,
    inParRate,
    inParWdMoney,
    inParBonusRate,
    inParBonus,
    inParBonusWdMoney,
    snRate,
    snWdMoney,
    fixedRate,
    snGrowth,
  } = body;

  // Calculate the rate
  let history: any = [];
  let spLastBalance = 0;

  for(let index = 0; index < years; index ++) {
    let year = beginningYear + index;
    let ages = clientAge + index;
    let spBalance = index == 0 ? (investment * 1.0 * spRate / 100): history[index - 1].sp.balance * (1 + ((SP_500_GROWTHS as any)[(year - 1).toString()] - fee)/100) - wdMoney;
    let spGrowth = (SP_500_GROWTHS as any)[(year).toString()] - fee
    let spWdMoney = wdMoney;

    let inParBalance = index == 0 ? (investment * 1.0 * inParRate / 100): history[index - 1].inPar.balance * (1 + history[index - 1].inPar.growth / 1.0 / 100) - inParWdMoney;
    let inParTotalGrowth = (SP_500_GROWTHS as any)[(year).toString()] * inPar / 1.0 / 100;
    let inParGrowth = (inParTotalGrowth > capRate ? capRate: inParTotalGrowth) - fee;
    inParGrowth = inParGrowth > 0 ? inParGrowth: 0;
    
    let inParBonusBalance = index == 0 ? (investment * 1.0 * inParBonusRate / 100): history[index - 1].inParBonus.balance * (1 + (history[index - 1].inParBonus.growth ) / 1.0 / 100 ) - inParWdMoney;
    let inParBonusGrowth = inParBonus - fee;
    inParBonusGrowth = inParBonusGrowth > 0 ? inParBonusGrowth: 0;

    let snBalance = index == 0 ? (investment * 1.0 * snRate / 100): history[index - 1].sn.balance * history[index - 1].sn.growth  / 1.0 / 100 +  history[index - 1].sn.balance - snWdMoney;
    let snTmpGrowth = fixedRate - fee;
    snTmpGrowth = snTmpGrowth > 0 ? snTmpGrowth: 0;

    history.push({
      year,
      ages,
      sp: {
        balance: spBalance,
        growth: spGrowth,
        wdMoney: spWdMoney
      },
      inPar: {
        balance: inParBalance,
        growth: inParGrowth,
        wdMoney: inParWdMoney,
      },
      inParBonus: {
        balance: inParBonusBalance,
        growth: inParBonusGrowth,
        wdMoney: inParBonusWdMoney,
      },
      sn: {
        balance: snBalance,
        growth: snTmpGrowth,
        wdMoney: snWdMoney
      }
    })
  }
  
  let year = beginningYear + years - 1;
  let spBalance = history[years - 1].sp.balance * (1 + ((SP_500_GROWTHS as any)[(year - 1).toString()] - 1)/100) - wdMoney;
  let inParBalance = history[years - 1].inPar.balance * (1 + history[years - 1].inPar.growth / 1.0 / 100) - inParWdMoney;
  let inParBonusBalance = history[years - 1].inParBonus.balance * (1 + (history[years - 1].inParBonus.growth ) / 1.0 / 100 ) - inParWdMoney;
  let snBalance = history[years - 1].sn.balance * history[years - 1].sn.growth  / 1.0 / 100 +  history[years - 1].sn.balance - snWdMoney;

  let spCapRate = (spBalance - investment * 1.0 * spRate / 100 + wdMoney * years) / (investment * 1.0 * spRate / 100 * years) * 100;
  let inParCapRate = (inParBalance - investment * 1.0 * inParRate / 100 + inParWdMoney * years) / (investment * 1.0 * inParRate / 100 * years) * 100;
  let inParBonusCapRate = (inParBonusBalance - investment * 1.0 * inParBonusRate / 100 + inParBonusWdMoney * years) / (investment * 1.0 * inParBonusRate / 100 * years) * 100;
  let snCapRate = (snBalance - investment * 1.0 * snRate / 100 + snWdMoney * years) / (investment * 1.0 * snRate / 100 * years) * 100;

  return NextResponse.json({ 
    history,
    final: {
      spBalance,
      inParBalance,
      inParBonusBalance,
      snBalance,
    },
    avgGrowth: {
      sp: history.reduce((sum: number, entry: any) => sum + entry.sp.growth, 0) / 1.0 / years,
      inPar: history.reduce((sum: number, entry: any) => sum + entry.inPar.growth, 0) / 1.0 / years,
      inParBonus: history.reduce((sum: number, entry: any) => sum + entry.inParBonus.growth, 0) / 1.0 / years,
      sn: history.reduce((sum: number, entry: any) => sum + entry.sn.growth, 0) / 1.0 / years,
    },
    earningsCapRate: {
      sp: spCapRate,
      inPar: inParCapRate,
      inParBonus: inParBonusCapRate,
      sn: snCapRate,
    }
  });
}
