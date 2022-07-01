import React, { FC } from "react";
import { Group, Stack } from "@mantine/core";
import { ReactComponent as Usaflag } from "../../assets/usaflag.svg";
import { ReactComponent as Ukflag } from "../../assets/ukflag.svg";
import { ReactComponent as Euroflag } from "../../assets/euroflag.svg";
import { ReactComponent as Slflag } from "../../assets/slflagRound.svg";
import { ReactComponent as LeftArrow } from "../../assets/leftArrow.svg";
import Currency from "../Currency/Currency";


interface Props {
  rates: any
}

interface Direction {
  new: string;
  old: string;
}

const Exchange: FC<Props> = props => {
 const { rates} = props
    
  return (
    <Stack style={{ padding: "10px" }} align="center" justify="center">
      <Group grow>
        <Currency name="USD" flag={<Usaflag />} amount={"1.0"} symbol="$" />
        <LeftArrow  style={{marginLeft: "10px", marginRight: "10px"}}/>
        <Currency name="SLL" flag={<Slflag />} amount={rates.usd.buying} symbol="SLL" />
      </Group>
      <Group grow>
        <Currency name="USD-MID" flag={<Usaflag />} amount={"1.0"} symbol="$" />
        <LeftArrow  style={{marginLeft: "10px", marginRight: "25px"}}/>
        <Currency name="SLL" flag={<Slflag />} amount={rates.usd_mid['usd midrate']} symbol="SLL" />
      </Group>
      <Group position="apart">
        <Currency name="GBP" flag={<Ukflag />} amount={"1.0"} symbol="£" />
        <LeftArrow style={{marginLeft: "10px", marginRight: "10px"}} />
        <Currency name="SLL" flag={<Slflag />} amount={rates.gbp.buying} symbol="SLL" />
      </Group>
      <Group position="apart">
        <Currency name="EUR" flag={<Euroflag />} amount={"1.0"} symbol="€" />
        <LeftArrow style={{marginLeft: "10px", marginRight: "10px"}} />
        <Currency name="SLL" flag={<Slflag />} amount={rates.euro.buying} symbol="SLL" />
      </Group>
    </Stack>
  );
};

export default Exchange;
