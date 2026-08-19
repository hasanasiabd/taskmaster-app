import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';

const Dashboard = () => {
  const [tasks] = useState([
    { id: 1, title: 'dd', description: 'gfshejjkugey548643f', dueDate: '8/21/2026', status: 'To Do', priority: 'MEDIUM' },
    { id: 2, title: 'hge', description: 'fre', dueDate: '8/25/2026', status: 'To Do', priority: 'HIGH' },
    { id: 3, title: 'add', description: 'asx', dueDate: '8/21/2026', status: 'To Do', priority: 'LOW' },
    { id: 4, title: 'tEST', description: 'FASDF', dueDate: '8/20/2026', status: 'To Do', priority: 'MEDIUM' },
    { id: 5, title: 'Trh', description: 'ASDFGG', dueDate: '8/19/2026', status: 'In Progress', priority: 'MEDIUM' },
    { id: 6, title: 'asdc', description: 'dfgh', dueDate: '8/18/2026', status: 'Done', priority: 'MEDIUM' },
  ]);

  const getPriorityBadgeProps = (priority) => {
    switch (priority) {
      case 'HIGH':
        return { bg: 'danger', text: 'white' };
      case 'MEDIUM':
        return { bg: 'warning', text: 'dark' };
      case 'LOW':
        return { bg: 'info', text: 'dark' };
      default:
        return { bg: 'secondary', text: 'white' };
    }
  };

  const renderColumn = (status, count, badgeBg) => {
    const filteredTasks = tasks.filter((t) => t.status === status);

    return (
      <Col lg={4} md={4} className="mb-4">
        <div className="task-column p-3 rounded-4 shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3 px-1">
            <h6 className="fw-bold m-0 tracking-wide">{status}</h6>
            <Badge bg={badgeBg} pill className="px-2 py-1 fs-7">
              {count}
            </Badge>
          </div>

          {filteredTasks.map((task) => {
            const badgeProps = getPriorityBadgeProps(task.priority);
            return (
              <Card key={task.id} className="task-card mb-3 border-0 shadow-sm rounded-3">
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="h6 fw-bold m-0 text-truncate" style={{ maxWidth: '160px' }}>
                      {task.title}
                    </Card.Title>
                    <Badge bg={badgeProps.bg} text={badgeProps.text} className="fw-bold priority-badge">
                      {task.priority}
                    </Badge>
                  </div>
                  <Card.Text className="small text-muted mb-3 text-truncate">{task.description}</Card.Text>
                  
                  <div className="d-flex justify-content-between align-items-center pt-2 border-top border-secondary-subtle">
                    <small className="text-muted font-monospace fs-7">📅 {task.dueDate}</small>
                    <div className="d-flex gap-1">
                      <Button variant="outline-secondary" size="sm" className="action-btn">✏️</Button>
                      <Button variant="outline-danger" size="sm" className="action-btn">🗑️</Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Col>
    );
  };

  return (
    /* fluid সরিয়ে ফিক্সড Container ব্যবহার করা হলো যেন দুইপাশে মার্জিন থাকে */
    <Container className="py-2 px-3 px-md-5">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary-subtle">
        {/* মডার্ন কালারফুল গ্রেডিয়েন্ট টাইটেল */}
        <h3 className="fw-extrabold m-0 board-title">
          Task Management Board
        </h3>
        <Button variant="primary" className="fw-semibold px-3 py-2 rounded-3 shadow-sm btn-add-task">
          + Add New Task
        </Button>
      </div>

      <Row className="g-3">
        {renderColumn('To Do', 4, 'secondary')}
        {renderColumn('In Progress', 1, 'warning')}
        {renderColumn('Done', 1, 'success')}
      </Row>
    </Container>
  );
};

export default Dashboard;