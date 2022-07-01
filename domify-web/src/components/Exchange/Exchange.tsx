import React, { FC } from "react";
import { Group, Stack, Divider } from "@mantine/core";
import { ReactComponent as Usaflag } from "../../assets/usaflag.svg";
import { ReactComponent as Ukflag } from "../../assets/ukflag.svg";
import { ReactComponent as Euroflag } from "../../assets/euroflag.svg";
import { ReactComponent as Slflag } from "../../assets/slflagRound.svg";
import { ReactComponent as LeftArrow } from "../../assets/leftArrow.svg";
import { ReactComponent as DownArrow } from "../../assets/downArrow.svg";
import Currency from "../Currency/Currency";
import { useMediaQuery } from '@mantine/hooks';


interface Props {
  rates: any
}

interface Direction {
  new: string;
  old: string;
}

const Exchange: FC<Props> = props => {
 const { rates} = props
 const web = useMediaQuery('(min-width: 570px)');
    
  return (
    <Stack style={{ padding: "10px" }} align="center" justify="center">
      <Group align="center" position="center" direction={web ? "row" : "column"}>
        <Currency name="USD" flag={<Usaflag />} amount={"1.0"} symbol="$" />
        { web ? <LeftArrow  style={{marginLeft: "10px", marginRight: "10px"}}/> : <DownArrow style={{marginLeft: "10px", marginRight: "10px"}} /> }
        <Currency name="SLL" flag={<Slflag />} amount={rates.usd.buying} symbol="SLL" />
        {web ? null : <Divider my="xs" label="___________________" labelPosition="center" />}
      </Group>
      
      <Group align="center" position="center" direction={web ? "row" : "column"}>
        <Currency name="USD-MID" flag={<Usaflag />} amount={"1.0"} symbol="$" />
        { web ? <LeftArrow  style={{marginLeft: "10px", marginRight: "10px"}}/> : <DownArrow style={{marginLeft: "10px", marginRight: "10px"}} /> }
        <Currency name="SLL" flag={<Slflag />} amount={rates.usd_mid['usd midrate']} symbol="SLL" />
        {web ? null : <Divider my="xs" label="___________________" labelPosition="center" />}
      </Group>
      <Group align="center" position="center" direction={web ? "row" : "column"}>
        <Currency name="GBP" flag={<Ukflag />} amount={"1.0"} symbol="£" />
        { web ? <LeftArrow  style={{marginLeft: "10px", marginRight: "10px"}}/> : <DownArrow style={{marginLeft: "10px", marginRight: "10px"}} /> }
        <Currency name="SLL" flag={<Slflag />} amount={rates.gbp.buying} symbol="SLL" />
        {web ? null : <Divider my="xs" label="___________________" labelPosition="center" />}
      </Group>
      <Group align="center" position="center" direction={web ? "row" : "column"}>
        <Currency name="EUR" flag={<Euroflag />} amount={"1.0"} symbol="€" />
        { web ? <LeftArrow  style={{marginLeft: "10px", marginRight: "10px"}}/> : <DownArrow style={{marginLeft: "10px", marginRight: "10px"}} /> }
        <Currency name="SLL" flag={<Slflag />} amount={rates.euro.buying} symbol="SLL" />
        
      </Group>
    </Stack>
  );
};

export default Exchange;
