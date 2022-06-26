import React, { FC, ReactElement, useEffect, useState, useRef } from "react";
import { Card, TextInput, Select, Group, Title } from "@mantine/core";
import { ReactComponent as ExchangeHorizonta } from "../../assets/exchangehorizontal.svg";

import { useLocalStorage } from "@mantine/hooks";
import NumberFormat from "react-number-format";
const _ = require('lodash');
interface Props {
  rates: any
}

const Calculator: FC<Props> = props => {
 const {rates} = props
  const [curreny1, setCurrency1] = useState("usd");
  const [curreny2, setCurrency2] = useState("sll");
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [conversionRate, setConvertionRates] = useState(16725);
  console.log(rates[curreny1].buying.split)
  


  const filterNum = (str: string) => {
    const numericalChar = new Set([ ".","0","1","2","3","4","5","6","7","8","9" ]);
    str = str.split("").filter((char: any) => numericalChar.has(char)).join("");
    return str;
  }
  console.log(  parseFloat(filterNum(rates[curreny1].buying)))
  const dropDown: any = {
    usd: { symbol: "$" },
    euro: { symbol: "€" },
    gbp: { symbol: "£" },
    sllold: { symbol: "SLL" },
    sllnew: { symbol: "SLL" },
  };

  const InputCards: FC<{
    select: string;
    setSelect(value: any): void;
    name: string;
    amount: number;
    setAmount(value: any): void;
    isInput: boolean;
  }> = (props) => (
    <div style={{ width: 340, margin: "auto" }}>
      <Card shadow="lg" p="md" radius="lg" withBorder>
        <Card.Section>
          <Select
            value={props.select}
            onChange={props.setSelect}
            p={5}
            data={[
              {
                value: "usd",
                label: "USD",
                disabled: (props.name == "c2" && curreny1 != "sllold" && curreny1 != "sllnew" ),
                symbol: "$",
              },
              {
                value: "gbp",
                label: "GBP",
                disabled:(props.name == "c2" && curreny1 != "sllold" && curreny1 != "sllnew" ),
                symbol: "£",
              },
              {
                value: "euro",
                label: "EUR",
                disabled: (props.name == "c2" && curreny1 != "sllold" && curreny1 != "sllnew" ),
                symbol: "€",
              },
              { value: "sllnew", label: "SLL (New)", symbol: "SLL",  disabled: (props.name == "c2" && curreny1 == "sllnew" ) },
              { value: "sllold", label: "SLL (Old)", symbol: "SLL", disabled: (props.name == "c2" && curreny1 == "sllold" )},
            ]}
          />
        </Card.Section>
        {!props.isInput && (
          <TextInput
            placeholder="Enter amount"
            value={props.amount}
            onChange={(event) =>
              setAmount1(parseInt(event.currentTarget.value))
            }
            
          />
        )}
        {props.isInput && (
          <NumberFormat
            value={amount1 * (parseFloat(filterNum(rates[curreny1].buying)) / (curreny2 == "sllnew" ? 1000 : 1))}
            decimalScale={2}
            fixedDecimalScale
            thousandSeparator
            prefix={dropDown[props.select]?.symbol}
            displayType={"text"}
            renderText={(value) => (
              <Title order={3} style={{ color: "#012A74" }}>
                {value}
              </Title>
            )}
          />
        )}
      </Card>
    </div>
  );
//   useEffect(() => {
   
//   }, []);


  return (
    <Group pt={20} pb={10}>
      <InputCards
        select={curreny1}
        setSelect={setCurrency1}
        name="c1"
        amount={amount1}
        setAmount={setAmount1}
        isInput={false}
      />
      <ExchangeHorizonta />
      <InputCards
        select={curreny2}
        setSelect={setCurrency2}
        name="c2"
        amount={amount2}
        setAmount={setAmount2}
        isInput
        
      />
    </Group>
  );
};

export default Calculator;
