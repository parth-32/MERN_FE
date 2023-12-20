import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

interface IAddContent {
  show: boolean;
  handleClose: () => void;
  saveHandler: (data: { title: string; description: string }) => void;
  isSaving: boolean;
  onSaving: (data: boolean) => void;
}

const AddContent: FC<IAddContent> = ({
  show,
  handleClose,
  saveHandler,
  isSaving,
  onSaving,
}) => {
  const [formData, setFormData] = useState({ title: '', description: '' });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const saveModalHandler = () => {
    saveHandler(formData);
    onSaving(true);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Content</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter title'
              onChange={onChangeHandler}
              name='title'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>description</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Enter description'
              rows={3}
              onChange={onChangeHandler}
              name='description'
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='primary'
          type='submit'
          onClick={saveModalHandler}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddContent;
