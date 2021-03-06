import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import Link from "next/link";
import { ButtonBack, ButtonDelete } from "../../components/Buttons/Buttons";
import { getSession } from "next-auth/react";
import { Loading } from "../../components/Loading/Loading";

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

function DeleteId() {
  const router = useRouter();
  const { deleteId } = router.query;
  const product = useSWR(`/api/products/${deleteId}`, fetcher);
  const products = useSWR("/api/products", fetcher);

  async function handleDeleteItemClick() {
    const response = await fetch(`/api/products/${deleteId}`, {
      method: "DELETE",
    });
    const deletedProduct = await response.json();
    if (deletedProduct.success) {
      router.push("/");
      products.mutate();
    }
  }

  return product.data ? (
    <Container key={deleteId}>
      <LabelStyled>Produkt löschen</LabelStyled>
      <StyledDeleteQuestion>
        <StyledQuestion>Möchtest du</StyledQuestion>
        <StyledProductname> {product.data.productName}</StyledProductname>
        <StyledQuestion>wirklich löschen?</StyledQuestion>
      </StyledDeleteQuestion>
      <ButtonBar>
        <ButtonBack />
        <ButtonDelete deletefunction={handleDeleteItemClick} />
      </ButtonBar>
    </Container>
  ) : (
    <Loading />
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledQuestion = styled.p`
  font-size: 1.5rem;
`;

const StyledProductname = styled.p`
  color: var(--pink);
  font-size: 2rem;
  margin: 1rem;
`;

const StyledDeleteQuestion = styled.div`
  width: 18rem;
  height: 13rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
  border-radius: 25px;
  box-shadow: 0 5px 5px 2px rgba(0, 0, 0, 0.3) inset;
`;

const LabelStyled = styled.label`
  margin: 1rem 0;
  font-size: 40px;
`;

const ButtonBar = styled.div`
  width: 23.44rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // this page is not available for unauthenticated users
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default DeleteId;
