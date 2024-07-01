import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

function App() {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newReminders = [...reminders];

    if (editIndex !== null) {
      newReminders[editIndex] = { title, description, isImportant };
      setEditIndex(null);
    } else {
      newReminders.push({ title, description, isImportant });
    }

    setReminders(newReminders);
    setTitle('');
    setDescription('');
    setIsImportant(false);
  };

  const handleDelete = (index) => {
    const newReminders = [...reminders];
    newReminders.splice(index, 1);
    setReminders(newReminders);
  };

  const handleEdit = (index) => {
    setTitle(reminders[index].title);
    setDescription(reminders[index].description);
    setIsImportant(reminders[index].isImportant);
    setEditIndex(index);
  };

  const toggleImportance = (index) => {
    const newReminders = [...reminders];
    newReminders[index].isImportant = !newReminders[index].isImportant;
    setReminders(newReminders);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Importante"
                checked={isImportant}
                onChange={(e) => setIsImportant(e.target.checked)}
              />
            </Form.Group>
            <Button type="submit">
              {editIndex !== null ? 'Actualizar Recordatorio' : 'Agregar Recordatorio'}
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        {reminders.map((reminder, index) => (
          <Col sm={6} key={index}>
            <Card style={{ width: '18rem', marginTop: '20px' }}>
              <Card.Body>
                <Card.Title>
                  {reminder.title}{' '}
                  {reminder.isImportant ? (
                    <FaStar color="gold" onClick={() => toggleImportance(index)} />
                  ) : (
                    <FaRegStar onClick={() => toggleImportance(index)} />
                  )}
                </Card.Title>
                <Card.Text>{reminder.description}</Card.Text>
                <Button variant="danger" onClick={() => handleDelete(index)}>
                  Eliminar
                </Button>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(index)}
                  style={{ marginLeft: '10px' }}
                >
                  Editar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
