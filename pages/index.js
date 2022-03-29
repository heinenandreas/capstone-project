//import Head from "next/head";
//import Image from "next/image";
import Logo from "../components/Logo/Logo";
import styled from "styled-components";
import ItemList from "../components/Itemlist/Itemlist";
import Category from "../components/Category/Category";
import { ButtonAddCategory } from "../components/Buttons/Buttons";
import IncrementCounter from "../components/Counter/Counter";

export default function Home() {
  return (
    <DeviceContainer>
      <Logo />
      <Category />
      {/* <IncrementCounter /> */}
      <ButtonAddCategory />
    </DeviceContainer>
  );
}

/* Device-Container, remove later */
const DeviceContainer = styled.div`
  position: relative;
  width: 23.44rem;
  height: 50.75rem;
  border: 2px solid black;
  border-radius: 15px;
`;
