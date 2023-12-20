import ListGroup from 'react-bootstrap/ListGroup';
import ListItem from '../components/ListItem';
import { Button, Spinner, ToastContainer } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';

import './../utils/scss/Home.scss';
import AddContent from '../components/AddContent';
import { addData, Contents, deleteData, getContents } from '../helper/ApiCall';

const Home = () => {
  const [show, setShow] = useState(false);
  const [contentData, setContentData] = useState<Contents[]>([]);
  const [toastData, setToastData] = useState({
    showToast: false,
    title: '',
    message: '',
    type: '',
  });

  const [isDeleted, setIsDeleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoding, setIsLoading] = useState(true);

  useEffect(() => {
    getContents()
      .then((data) => {
        setContentData(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setToastData({
          showToast: true,
          title: 'Connection Error',
          message: 'Connection not established',
          type: 'danger',
        });
        setIsLoading(false);
      });

    setIsDeleted(false);
  }, [isDeleted, isLoding]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveHandler = (formData: { title: string; description: string }) => {
    if (
      formData.title?.trim().length === 0 ||
      formData.description?.trim().length === 0
    ) {
      setToastData({
        showToast: true,
        title: 'Invalid Data',
        message: 'Please fill form data',
        type: 'danger',
      });
      setShow(false);
    } else {
      addData(formData)
        .then((newData) => {
          setContentData((preData) => [...preData, newData]);
          setShow(false);
          setIsSaving(false);
          setToastData({
            showToast: true,
            title: 'Added Data',
            message: 'Data added successfully',
            type: 'success',
          });
        })
        .catch((e) => console.log(e));
    }
  };

  const deleteHandler = (id: string) => {
    deleteData(id)
      .then((data) => {
        setToastData({
          showToast: true,
          title: 'Deleted data',
          message: 'Data deleted successfully',
          type: 'success',
        });
        setIsDeleted(true);
      })
      .catch((e) => console.log(e));
  };

  const BlankSection = () => {
    return (
      <div className='empty-section'>
        {isLoding ? (
          <Button variant='primary' disabled>
            <Spinner
              as='span'
              animation='border'
              size='sm'
              role='status'
              aria-hidden='true'
            />
            {'  '}Loading...
          </Button>
        ) : (
          'Data not available'
        )}
      </div>
    );
  };

  return (
    <>
      <ToastContainer className='p-3' position='top-end' style={{ zIndex: 1 }}>
        <Toast
          show={toastData?.showToast}
          onClose={() =>
            setToastData({ showToast: false, title: '', message: '', type: '' })
          }
          delay={3000}
          autohide
          bg={toastData.type}
        >
          <Toast.Header>
            <strong className='me-auto'>{toastData?.title}</strong>
          </Toast.Header>
          <Toast.Body>{toastData?.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <div className='home'>
        <Button variant='primary' className='mb-3' onClick={handleShow}>
          + Add Data
        </Button>
        <ListGroup as='ol' numbered>
          {contentData.length > 0 ? (
            [...contentData].reverse().map((data) => {
              return (
                <ListItem
                  key={data['_id']}
                  id={data._id}
                  title={data.title}
                  description={data.description}
                  deleteHandler={deleteHandler}
                />
              );
            })
          ) : (
            // <div className='empty-section'>Data not available</div>
            <BlankSection />
          )}
        </ListGroup>
      </div>
      <AddContent
        key={'key'}
        show={show}
        handleClose={handleClose}
        saveHandler={(data) => saveHandler(data)}
        isSaving={isSaving}
        onSaving={setIsSaving}
      />
    </>
  );
};

export default Home;
