import React, { FC, useEffect, useState } from "react";
import { Card, TextInput, Text, Group, Button, Title } from "@mantine/core";
import { ReactComponent as Coins } from "../../assets/coins.svg";
import { ReactComponent as Exchange } from "../../assets/exchange.svg";
import { ReactComponent as SlFlag } from "../../assets/slflag.svg";
import NumberFormat from "react-number-format";

interface Props {
  title: String;
  subTitle: String;
  flagName1: String;
  flagName2: String;
  direction?: string;
}

interface Direction {
  new: string;
  old: string;
}

const Converter: FC<Props> = (props) => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {});

  return (
    <div style={{ width: 340, margin: "auto" }}>
      <Card shadow="lg" p="md" radius="md">
        <Card.Section p="lg">
          <Group spacing="lg">
            <Coins />{" "}
            <Text style={{ color: "#012A74" }} size="md" weight="bold">
              {props.title}
            </Text>
          </Group>
        </Card.Section>
        <Text size="sm" style={{ color: "#012A74" }}>
          {props.subTitle}
        </Text>
        <Card.Section p="lg">
          <Group spacing="lg" p="xs">
            <SlFlag />{" "}
            <Text style={{ color: "#C4C4C4" }} weight="bold">
              {props.flagName1}
            </Text>
          </Group>
          <NumberFormat
            value={amount == 0 ? "" : amount}
            onValueChange={({ formattedValue, value }) =>
              setAmount(parseFloat(value))
            }
            displayType="input"
            decimalScale={2}
            inputMode="decimal"
            placeholder="Enter Amount"
            size="md"
            color="#012A74"
            variant="filled"
            thousandSeparator
            allowNegative={false}
            prefix={"Le "}
            suffix={ props.direction && amount < 0.99 ? " cents" : ""}
            customInput={TextInput}
          />
        </Card.Section>
        <Group>
          <Exchange />
          <Button onClick={()=>setAmount(0)} color="red" size="sm" radius="lg" variant="light">
          Clear inputs
        </Button> 
        </Group>
        <Card.Section p="lg">
          <Group spacing="lg" p="xs">
            <SlFlag />{" "}
            <Text style={{ color: "#C4C4C4" }} weight="bold">
              {props.flagName2}
            </Text>
          </Group>
          <NumberFormat
            value={!props.direction ? amount / 1000 : amount * 1000 || 0}
            displayType="text"
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            type="text"
            prefix={"Le "}
            renderText={(value) => (
              <Title order={3} style={{ color: "#012A74" }} pl={20}>
                {value}
              </Title>
            )}
            suffix={!props.direction && amount / 1000 < 0.99 ? " cents" : ""}
          />
        </Card.Section>
      </Card>
    </div>
  );
};

export default Converter;
