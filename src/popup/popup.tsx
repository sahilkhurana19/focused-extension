import React from "react";
import logo from "./logo.svg";
import "./popup.css";
import { Button, Heading, Center } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";

function Popup() {
  return (
    <div className="App">
      <Center>
        <Heading as="h5">Focused!</Heading>
        <Heading as="h6">Block sites and get working</Heading>
        <Button colorScheme="blue">Block This Site!</Button>
        <Button colorScheme="gray">The website is already blocked!</Button>
        <SettingsIcon />
      </Center>
    </div>
  );
}

export default Popup;
