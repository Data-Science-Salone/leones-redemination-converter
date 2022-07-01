import React, { FC, useState, forwardRef } from "react";
import { Card, TextInput, Select, Group, Title, Text, Button, Center } from "@mantine/core";
import { ReactComponent as ExchangeHorizonta } from "../../assets/exchangehorizontal.svg";

import { ChevronDown } from "tabler-icons-react";
import NumberFormat from "react-number-format";

interface Props {
  rates: any;
}

const Calculator: FC<Props> = (props) => {
  const { rates } = props;
  const [curreny1, setCurrency1] = useState("usd");
  const [curreny2, setCurrency2] = useState("sllnew");
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    value: string;
    label: string;
    disabled: boolean;
  }

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ value, label, disabled, ...others }: ItemProps, ref) => (
      <>
      { !disabled &&
      <div ref={ref} {...others}>
       
        <Group noWrap>
          <div>
            <Text size="sm">{label}</Text>
          </div>
        </Group>
      </div>
      
      }
      </>
    )
  );

  const filterNum = (str: string) => {
    const numericalChar = new Set([
      ".",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ]);
    str = str
      .split("")
      .filter((char: any) => numericalChar.has(char))
      .join("");
    return str;
  };

  const dropDown: any = {
    usd: { symbol: "$" },
    euro: { symbol: "€" },
    gbp: { symbol: "£" },
    sllold: { symbol: "SLL" },
    sllnew: { symbol: "SLE" },
  };

  const InputCards: FC<{
    select: string;
    setSelect(value: any): void;
    name: string;
    amount: number;
    setAmount(value: any): void;
    isInput?: boolean;
  }> = (props) => (
    <div style={{ width: 340, margin: "auto" }}>
      <Card shadow="lg" p="md" radius="lg" withBorder>
        <Card.Section>
          <Select
            value={props.select}
            onChange={props.setSelect}
            variant="unstyled"
            size="md"
            rightSectionWidth={30}
            rightSection={<ChevronDown size={20} />}
            itemComponent={SelectItem}
            style={{
              backgroundColor: "#F5F6FA",
              marginBottom: "10px",
              color: "#95BBFF",
              paddingLeft: "15px",
            }}
            styles={{
              rightSection: { pointerEvents: "none" },
              item: { color: "indigo" },
              label: { color: "blue", weight: "bold" },
            }}
            p={5}
            data={[
              {
                value: "usd",
                label: "USD",
                disabled:
                  props.name == "c2" &&
                  curreny1 != "sllold" &&
                  curreny1 != "sllnew",
                symbol: "$",
              },
              {
                value: "gbp",
                label: "GBP",
                disabled:
                  props.name == "c2" &&
                  curreny1 != "sllold" &&
                  curreny1 != "sllnew",
                symbol: "£",
              },
              {
                value: "euro",
                label: "EUR",
                disabled:
                  props.name == "c2" &&
                  curreny1 != "sllold" &&
                  curreny1 != "sllnew",
                symbol: "€",
              },
              {
                value: "sllnew",
                label: "SLE (New)",
                symbol: "SLE",
                disabled: props.name == "c1",
              },
              {
                value: "sllold",
                label: "SLL (Old)",
                symbol: "SLL",
                disabled: props.name == "c1" ,
              },
            ]}
          />
        </Card.Section>
        {props.isInput && (
          <NumberFormat
            placeholder="Enter amount"
            displayType="input"
            inputMode="decimal"
            decimalScale={2}
            thousandSeparator
            autoFocus
            allowNegative={false}
            size="md"
            color="#012A74"
            type="text"
            styles={{
              wrapper: { color: 'blue'}
            }}
            value={props.amount == 0 ? "" : props.amount}
            customInput={TextInput}
            variant="filled"
            
            prefix={`${dropDown[props.select]?.symbol} `}
            onValueChange={({ formattedValue, value }) =>
              
              setAmount1(parseFloat(value))
            }
          />
        )}
        {!props.isInput && (
          <NumberFormat
            value={
              amount1 *
              (parseFloat(filterNum(rates[curreny1].buying)) /
                (curreny2 == "sllnew" ? 1000 : 1)) || 0
            }
            decimalScale={2}
            fixedDecimalScale
            thousandSeparator
            prefix={`${dropDown[props.select]?.symbol} `}
            displayType={"text"}
            type="text"
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

  return (
    // <div style={{ alignItems: 'center', display: "inline-flex"}}>
    <Group pt={20} pb={20} direction="row" position="center" spacing="sm" align="center">
      <InputCards
        select={curreny1}
        setSelect={setCurrency1}
        name="c1"
        amount={amount1}
        setAmount={setAmount1}
        isInput
      />
      <Group pt={20} pb={20} direction="column">
      <Center style={{ width: 100, height: 50}} component="div">
      <ExchangeHorizonta />
      </Center>
      <Button onClick={()=>setAmount1(0)} color="red" size="sm" radius="lg" variant="light">
          Clear inputs
      </Button> 
      </Group>
      <InputCards
        select={curreny2}
        setSelect={setCurrency2}
        name="c2"
        amount={amount2}
        setAmount={setAmount2}
      />
    </Group>

    // </div>
  );
};

export default Calculator;
