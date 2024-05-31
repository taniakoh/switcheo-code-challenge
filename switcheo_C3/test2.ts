import React, { useEffect, useMemo, useState } from 'react';

interface WalletBalance {
    currency: string;
    amount: number;
  }
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
  }
  
  class Datasource {

    constructor(private url:string){
        this.url=url;
    }
    //fetches json and maps it to array of item price

    async getPrices(): Promise<number[]> {
        const response = await fetch(this.url);
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const jsonData = await response.json();
        const prices = jsonData.map((item: any) => item.price);
        return prices;
    } catch (error) {
      console.error(error);
      return [];
  }
}


  
  interface Props extends BoxProps {
  
  }
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
      const [prices, setPrices] = useState({});
  
    useEffect(() => {
      const datasource = new Datasource("https://interview.switcheo.com/prices.json");
      datasource.getPrices().then(prices => {
        setPrices(prices);
      }).catch(error => {
        console.error(error);
      });
    }, []);
      //accept blockchain as string
      const getPriority = (blockchain: string): number => {
        switch (blockchain) {
          case 'Osmosis':
            return 100
          case 'Ethereum':
            return 50
          case 'Arbitrum':
            return 30
          case 'Zilliqa':
            return 20
          case 'Neo':
            return 20
          default:
            return -99
        }
      }
  
    const sortedBalances = useMemo(() => {
      //add failsafe in case prices are not fetched
      if (!prices) return[];
      return balances.filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        //convert to boolean statement
        return balancePriority > -99 && balance.amount <= 0;

            // if (lhsPriority > -99) {
              //should be balancePriority
            // if (balancePriority>-99)
            //    if (balance.amount <= 0) {
            //      return true;
            //    }
            // }
            // return false
          }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
              const leftPriority = getPriority(lhs.blockchain);
              const rightPriority = getPriority(rhs.blockchain);
            //this can be sorted easier by taking the difference of the priorities
            // if (leftPriority > rightPriority) {
            //   return -1;
            // } else if (rightPriority > leftPriority) {
            //   return 1;
            // }
            return rightPriority-leftPriority; //this will sort in descending order
      });
    }, [balances, prices]);
  
    //can use memoization to improve time complexity since it iterates over the
    //same balances
    const formattedBalances = useMemo(() => {
      return sortedBalances.map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed()
      }));
    }, [sortedBalances]);
  
    const rows = useMemo(() => {
      return sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow 
            className={classes.row}
            key={index}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      });
    }, [sortedBalances, prices]);

    return (
      <div {...rest}>
        {rows}
      </div>
    );
}