import { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

export default function User() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageItems, setPageItems]=useState([]);

  useEffect(() => {
    loadUsers();
  }, [currentPage]);

  function loadUsers() {
    fetch(`http://localhost:8080/api/users?page=${currentPage - 1}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.content);
        setUsers(result.content);
      });
  }

  return (
    <>
      <Container>
        <Row>
          <Col sm={8}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Identity No</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Gender</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} onClick={() => {}}>
                    <td>{user.identityNo}</td>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.gender}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col sm={4}>
            <h1>Form</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
}
