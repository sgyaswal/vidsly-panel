import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UpdateForm() {
  // console.log("Update button clicked for xxxxx Name:", first_name);
  return (
    <Form>


      <div className='row'>
        <Form.Group className="col-md-6" controlId="formBasicPassword">
        <Form.Label>First name </Form.Label>
        <Form.Control type="text" placeholder="Password" />
      </Form.Group>
      <Form.Group className="col-md-6" controlId="formBasicPassword">
        <Form.Label>Last name</Form.Label>
        <Form.Control type="text" placeholder="Password" />
      </Form.Group>
      </div>
      <div className='row'>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      </div>
      <div>

      <Form.Group className="mb-3" controlId="formBasicEmail" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      
      </div>
      {/* <Button variant="primary" type="submit">
        Submit
      </Button> */}
    </Form>
  );
}

export default UpdateForm;