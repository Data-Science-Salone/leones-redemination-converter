import React, { useEffect, useState } from "react";
import {
  AppShell,
  Header,
  Footer,
  Container,
  Group,
  Title,
  Card,
  Divider,
  Center,
  Stack,
  Box,
  Image,
  LoadingOverlay,
  Overlay
} from "@mantine/core";
import Converter from "./components/Converter/converter";
import Exchange from "./components/Exchange/Exchange";
import Calculator from "./components/Calculator/Calculator";
import { useLocalStorage, useScrollIntoView } from "@mantine/hooks";
const axios = require("axios").default;

function App() {
  const [rates, setRates] = useLocalStorage<any>({
    key: "rates",
    defaultValue: {
      usd: { buying: "11,140" },
      gbp: { buying: "11,140" },
      euro: { buying: "11,140" },
      usd_mid: { 'usd midrate': "11,140"}
    },
  });
  const [loading, setLoading] = useState(false);
  const [IsError, setIsError ] = useState(false)
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://slmoney-converter.herokuapp.com/")
      .then((res: any) => {
        setRates(res.data);
        setLoading(false);
        scrollIntoView()
      })
      .catch((error: any) => {
        console.log(error)
        setIsError(true)
        setLoading(false)
        scrollIntoView()
      });
  }, []);

  return (
    <div className="App">
      {loading ? (
        <LoadingOverlay visible={loading} />
      ) : (
        <AppShell

          padding={0}
          header={
            <Header fixed height={60} pt="sm" pl="lg" >
              <Group ref={targetRef}>
                <Box component="a" href="https://bsl.gov.sl">
                  <Image
                    width={40}
                    height={40}
                    fit="contain"
                    src="https://bsl.gov.sl/BSL_Logo.jpeg"
                  />
                  
                </Box>
                <Title order={3} style={{ color: "#0059B3" }} >
                    The Bank of Sierra Leone
                  </Title>
              </Group>
            </Header>
          }
          footer={
            <Footer height={60} p="md">
            <Title order={5}>
            Developed & Maintained by Data Science Salone
            </Title>
            </Footer>
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
            style={{ marginTop: "100px", marginBottom: '40px' }}
            fluid
          >
            <Stack align="center" justify="center" spacing="lg">
              <Title style={{ color: "#0059B3" }} >Leones Converter</Title>
              <Group py="lg" spacing="xl">
                <Converter
                  flagName1={"SLL"}
                  flagName2={"SLE"}
                  title="OLD TO NEW LEONES"
                  subTitle="1000 SLL  = 1 SLE"
                />
                <Converter
                  flagName1={"SLE"}
                  flagName2={"SLL"}
                  title="NEW TO OLD LEONES"
                  direction="new"
                  subTitle="1 SLE = 1000 SLL"
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
            <Box sx={{ position: 'relative' }}> 
              
              <Stack align="center" justify="center">
                <Title style={{ color: `${IsError ? "red" : "white"}`, paddingTop: "57px" }}>
                  {IsError ? "Forex Not Available" : "Forex Exchanges"}
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
                  
                  { IsError && <Overlay opacity={0.6} color="#000" blur={4}/> }
                  <Stack align="center" justify="center">
                  
                  {/* {IsError && <p>fag</p>} */}
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
            </Box>
          </Container>
        </AppShell>
      )}
    </div>
  );
}

export default App;
