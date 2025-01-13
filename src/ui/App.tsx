import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ReactElement, useEffect, useRef, useState } from "react";
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

  return (
    <Container className="ms-0 me-0 mb-3 h90">
      <Row className="mb-3">
        <Col className="text-start" sm={3}>
          Explorer
        </Col>
        <Col className="text-center" sm={9}>
          Title
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3}>
          <Accordion>
            {files.map((file, index) => {
              return AccordionElement(file, index.toString());
            })}
          </Accordion>
        </Col>
        <Col sm={9} contentEditable={true} className="h80 overflow-auto ">
          hey
        </Col>
      </Row>
    </Container>
  );
}

function AccordionElement(element: string, eventKey: string): JSX.Element {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{element}</Accordion.Header>
      <Accordion.Body>
        <div>kek</div>
        <div>keek</div>
      </Accordion.Body>
    </Accordion.Item>
  );
}
export default App;
