import React, { FC, ReactElement, useEffect } from "react";
import { Text, Group, Title } from "@mantine/core";
import NumberFormat from "react-number-format";

interface Props {
  name: String;
  amount: string;
  symbol: string;
  flag: ReactElement;
}

interface Direction {
  new: string;
  old: string;
}

const Currency: FC<Props> = props => {
  const {name, amount, symbol, flag } = props

  useEffect(() => {});

  return (
    <div style={{ width: "auto", margin: "auto" }}>
      <Group>
        <Text size="lg" style={{ color: "#95BBFF" }}>
          {name}
        </Text>
        <div className="rounded-lg" style={{borderRadius: '5px'}}>
          {flag}
        </div>
      </Group>
      <NumberFormat
        value={amount}
        decimalScale={2}
        fixedDecimalScale
        thousandSeparator
        prefix={symbol}
        displayType={"text"}
        renderText={(value) => (
          <Title order={1} style={{ color: "#012A74" }}>
            {value}
          </Title>
        )}
      />
    </div>
  );
};

export default Currency;
