import { FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

interface IData {
  id: string;
  title: string;
  description: string;
  deleteHandler: (id: string) => void;
}

const ListItem: FC<IData> = ({ id, title, description, deleteHandler}) => {


  return (
    <>
      <ListGroup.Item
        as='li'
        className='d-flex justify-content-between align-items-start'
      >
        <div className='ms-2 me-auto'>
          <div className='fw-bold'>{title}</div>
          {description}
        </div>
        <div>
          <ButtonGroup>
            <Button
              size='sm'
              onClick={(e) => deleteHandler(id)}
              variant='secondary'
            >
              Delete
            </Button>
          </ButtonGroup>
        </div>
      </ListGroup.Item>
    </>
  );
};

export default ListItem;
