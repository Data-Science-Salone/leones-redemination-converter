import React, { useEffect, useState } from "react";
import {
  AppShell,
  Header,
  Footer,
  Container,
  Group,
  Title,
  Card,
  Text,
  Divider,
  Center,
  Stack,
  LoadingOverlay
} from "@mantine/core";
import Converter from "./components/Converter/converter";
import Exchange from "./components/Exchange/Exchange";
import Calculator from "./components/Calculator/Calculator";
import { useLocalStorage } from "@mantine/hooks";
const axios = require("axios").default;

function App() {
  const [rates, setRates] = useLocalStorage<any>({key: "rates", defaultValue: {usd: {buying: '11,140'}, gbp: {buying: '11,140'}, euro: {buying: '11,140'}}})
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios
      .get("https://slmoney-converter.herokuapp.com/")
      .then((res: any) =>
      { 
        setRates(res.data)
        setLoading(false)
      
      })
      .catch((error: any) => console.log(error));
  },[]);

  return (
    <div className="App">
      { loading ? <LoadingOverlay visible={loading}/> :
      <AppShell
        padding={0}
        header={
          <Header fixed height={60} pt="sm" pl="lg">
            <Title order={3}>SL Data Science Community</Title>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
        
      >
        <Container
          style={{ width: "100%", padding: "40px", marginTop: "40px" }}
          fluid
        >
          <Stack align="center" justify="center" spacing="lg">
            <Title style={{ color: "#0059B3" }}>Leones Converter</Title>
            <Group py="lg" spacing="xl">
              <Converter
              flagName1={"SLL OLD"}
              flagName2={"SLL NEW"}
                title="OLD TO NEW LEONES"
                subTitle="1000 SLL Old = 1 SLL New"
              />
              <Converter
                flagName1={"SLL NEW"}
                flagName2={"SLL OLD"}
                title="NEW TO OLD LEONES"
                direction="new"
                subTitle="1 SLL New = 100 SLL Old"
              />
            </Group>
          </Stack>
        </Container>
        <Container
          style={{
            backgroundColor: "#0059B3",
            width: "100%",
            maxWidth: "100%",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Center>
            <Stack align="center" justify="center">
              <Title style={{ color: "white", paddingTop: "57px" }}>
                Forex Exchanges
              </Title>

              <Card
                shadow="lg"
                p="lg"
                radius="md"
                pt={30}
                pb={30}
                component="div"
                style={{ margin: "40px", justifySelf: "center" }}
              >
                <Stack align="center" justify="center">
                  <Title
                    style={{ color: "#0059B3", padding: "10px" }}
                    order={4}
                  >
                    Rates for today
                  </Title>
                  <Exchange rates={rates} />
                </Stack>
                <Divider />
                <Calculator rates={rates} />
              </Card>
            </Stack>
          </Center>
        </Container>
      </AppShell>}
    </div>
  );
}

export default App;
