import React, { FC, ReactElement, useEffect } from "react";
import { Text, Group, Title, Skeleton } from "@mantine/core";
import NumberFormat from "react-number-format";

interface Props {
  name: String;
  amount: string;
  symbol: string;
  flag: ReactElement;
  isLoading?: boolean
}

interface Direction {
  new: string;
  old: string;
}

const Currency: FC<Props> = props => {
  const {name, amount, symbol, flag, isLoading } = props

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
          <Skeleton visible={isLoading || false} height={40}  radius="md">
          <Title order={1} style={{ color: "#012A74" }}>
            {value}
          </Title>
          </Skeleton>
        )}
      />
    </div>
  );
};

export default Currency;
