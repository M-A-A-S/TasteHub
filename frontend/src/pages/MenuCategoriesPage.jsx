import { Plus } from "lucide-react";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import TextArea from "../components/UI/TextArea";
import Modal from "../components/UI/Modal";
import { useState } from "react";

const MenuCategoriesPage = () => {
  const [showModal, setShowModal] = useState(true);
  return (
    <div>
      <h1>MenuCategoriesPage</h1>
      <Button onClick={() => setShowModal(true)}>
        <Plus /> Test
      </Button>
      <Input label="Test" showLabel={true} placeholder="Test" />
      <TextArea label="Test" showLabel={true} placeholder="Test" />
      <Modal
        onClose={() => setShowModal(false)}
        show={showModal}
        title={"Test"}
        // footer={
        //   <>
        //     <button>Test</button>
        //     <button>Test</button>
        //   </>
        // }
      >
        <h1>Test</h1>
        <p>Test</p>
      </Modal>
    </div>
  );
};
export default MenuCategoriesPage;
