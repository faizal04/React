import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useState } from "react";
import Button from "../ui/Button";

function Cabins() {
  const [isopen, setisopen] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>

      <Row>
        <CabinTable />
        <Button
          onClick={() => {
            setisopen(!isopen);
          }}
        >
          Add Cabin
        </Button>
        {isopen && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
