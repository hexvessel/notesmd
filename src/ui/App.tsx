import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import { Col, Container, Row, Accordion } from "react-bootstrap";
import Markdown from "react-markdown";

function App() {
  const [files, setFiles] = useState<string[]>([]);
  const getFiles = async () => {
    //@ts-ignore
    const mdFilenames = await window.electron.getMarkdownFiles();
    setFiles(mdFilenames);
  };
  useEffect(() => {
    getFiles();
  }, []);
  const md = `# hey`;
  return (
    <Container>
      <Row>
        <Col className="sidebar">Explorer</Col>
        <Col xs={5} contentEditable={true}>
          Title
        </Col>
      </Row>
      <Row>
        <Col className="sidebar">
          <Accordion defaultActiveKey="0" className="sidebar">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Accordion Item #1</Accordion.Header>
              <Accordion.Body>
                <div>kek</div>
                <div>keek</div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>
                <div>lol</div>
                <div>loool</div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col xs={5} contentEditable={true}>
          <Markdown>{md}</Markdown>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
