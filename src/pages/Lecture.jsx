import { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
  Form,
  Button,
  Alert,
  Modal,
  ModalTitle,
} from 'react-bootstrap';

export default function Lecture() {
  const [lectures, setLectures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageItems, setPageItems] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [lectureStudents, setLectureStudents] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState({
    name: '',
    teacherId: 0,
    teacher: {},
    students: [],
  });

  useEffect(() => {
    loadLectures();
    loadTeachers();
  }, [currentPage]);

  function loadLectures() {
    fetch(`http://localhost:8080/api/lectures?page=${currentPage - 1}`)
      .then((res) => res.json())
      .then((result) => {
        setLectures(result.content);
        let items = [];
        for (let index = 1; index <= result.totalPages; index++) {
          items.push(
            <Pagination.Item
              key={index}
              active={currentPage === index}
              onClick={() => setCurrentPage(index)}
            >
              {index}
            </Pagination.Item>
          );
          setPageItems(items);
        }
      });
  }

  function loadTeachers() {
    fetch(`http://localhost:8080/api/users/by-role?role=TEACHER`)
      .then((res) => res.json())
      .then((result) => {
        setTeachers(result);
      });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setSelectedLecture({ ...selectedLecture, [name]: value });
    setLectureStudents([]);
  }

  return (
    <>
      <Container>
        <Row>
          <Col sm={9}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody>
                {lectures.map((lec) => (
                  <>
                    <tr
                      key={lec.id}
                      onClick={() => {
                        setSelectedLecture(lec);
                      }}
                    >
                      <td>{lec.id}</td>
                      <td>{lec.name}</td>
                      <td>{lec.teacher.name + ' ' + lec.teacher.surname}</td>
                    </tr>
                    {selectedLecture.id && lec.id === selectedLecture.id
                      ? selectedLecture.students.map((student) => (
                          <tr key={student.identityNo}>
                            <td></td>
                            <td>{student.identityNo}</td>
                            <td>{student.name + ' ' + student.surname}</td>
                            <td>{student.name}</td>
                            <td>
                              <Button
                                size='sm'
                                variant='danger'
                                onClick={() => {}}
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        ))
                      : ''}
                  </>
                ))}
              </tbody>
            </Table>
            <Pagination>{pageItems}</Pagination>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Container>
    </>
  );
}
