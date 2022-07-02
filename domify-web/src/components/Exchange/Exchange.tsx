import React, { FC } from "react";
import { Group, Stack, Divider, Skeleton } from "@mantine/core";
import { ReactComponent as Usaflag } from "../../assets/usaflag.svg";
import { ReactComponent as Ukflag } from "../../assets/ukflag.svg";
import { ReactComponent as Euroflag } from "../../assets/euroflag.svg";
import { ReactComponent as Slflag } from "../../assets/slflagRound.svg";
import { ReactComponent as LeftArrow } from "../../assets/leftArrow.svg";
import { ReactComponent as DownArrow } from "../../assets/downArrow.svg";
import Currency from "../Currency/Currency";
import { useMediaQuery } from "@mantine/hooks";

interface Props {
  rates: any;
  currency: string;
  isLoading: boolean
}

interface Direction {
  new: string;
  old: string;
}

const Exchange: FC<Props> = (props) => {
  const { rates, currency, isLoading } = props;
  const web = useMediaQuery("(min-width: 570px)");

  const filterNum = (str: any) => {
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

  const remonification = (amount: any, currency: string) => {

    switch (currency) {
      case "sle":
        return amount.sle == undefined ? filterNum(amount) / 1000 : amount.sle;
      case "sll":
        return amount.sll == undefined ? filterNum(amount)  : amount.sll;

      default:
        return amount
        break;
    }
  };

  return (
    <Stack style={{ padding: "10px" }} align="center" justify="center">
      <Group
        align="center"
        position="center"
        direction={web ? "row" : "column"}
      >
        <Currency name="USD" flag={<Usaflag />} amount={"1.0"} symbol="$" />
        {web ? (
          <LeftArrow style={{ marginLeft: "10px", marginRight: "10px" }} />
        ) : (
          <DownArrow style={{ marginLeft: "10px", marginRight: "10px" }} />
        )}
        {/* <Skeleton visible={isLoading}/> */}
        <Currency
          name="SLL"
          flag={<Slflag />}
          isLoading={isLoading}
          amount={remonification(rates.usd.buying, currency)}
          symbol="SLL"
        />

        {web ? null : (
          <Divider my="xs" label="___________________" labelPosition="center" />
        )}
      </Group>

      <Group
        align="center"
        position="center"
        direction={web ? "row" : "column"}
      >
        <Currency name="USD-MID" flag={<Usaflag />} amount={"1.0"} symbol="$" />
        {web ? (
          <LeftArrow style={{ marginLeft: "10px", marginRight: "10px" }} />
        ) : (
          <DownArrow style={{ marginLeft: "10px", marginRight: "10px" }} />
        )}
        {/* <Skeleton visible={isLoading}/> */}
        <Currency
          name="SLL"
          flag={<Slflag />}
          isLoading={isLoading}
          amount={remonification(rates.usd_mid["usd midrate"], currency)}
          symbol="SLL"
        />
      
        {web ? null : (
          <Divider my="xs" label="___________________" labelPosition="center" />
        )}
      </Group>
      <Group
        align="center"
        position="center"
        direction={web ? "row" : "column"}
      >
        <Currency name="GBP" flag={<Ukflag />} amount={"1.0"} symbol="£" />
        {web ? (
          <LeftArrow style={{ marginLeft: "10px", marginRight: "10px" }} />
        ) : (
          <DownArrow style={{ marginLeft: "10px", marginRight: "10px" }} />
        )}
        {/* <Skeleton visible={isLoading}/> */}
        <Currency
          name="SLL"
          flag={<Slflag />}
          isLoading={isLoading}
          amount={remonification(rates.gbp.buying, currency)}
          symbol="SLL"
        />
        
        {web ? null : (
          <Divider my="xs" label="___________________" labelPosition="center" />
        )}
      </Group>
      <Group
        align="center"
        position="center"
        direction={web ? "row" : "column"}
      >
        <Currency name="EUR" flag={<Euroflag />} amount={"1.0"} symbol="€" />
        {web ? (
          <LeftArrow style={{ marginLeft: "10px", marginRight: "10px" }} />
        ) : (
          <DownArrow style={{ marginLeft: "10px", marginRight: "10px" }} />
        )}
        <Currency
          name="SLL"
          isLoading={isLoading}
          flag={<Slflag />}
          amount={remonification(rates.euro.buying, currency)}
          symbol="SLL"
        />
      </Group>
    </Stack>
  );
};

export default Exchange;
