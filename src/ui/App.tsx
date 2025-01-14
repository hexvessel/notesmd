import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Col, Container, Row, Accordion, Button } from "react-bootstrap";
import Markdown from "react-markdown";

function App() {
  const [editing, setEditing] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);
  const [files, setFiles] = useState<filePackage[]>([
    { filename: "empty", contents: "hey", bookmarks: [] },
  ]);

  const toggleEditing = () => {
    setEditing(!editing);
  };
  const getFiles = async () => {
    // @ts-ignore
    const mdFilenames = await window.electron.getMarkdownFiles();
    setFiles(mdFilenames);
    parser(files[0].contents);
  };
  useEffect(() => {
    getFiles();
  }, []);

  return (
    <Container className="ms-0 me-0 mb-3 h90">
      <Row className="mb-3">
        <Col className="text-start" sm={1}>
          Explorer
        </Col>
        <Col sm={1}>
          <Button onClick={getFiles}>Dir</Button>
        </Col>
        <Col className="text-center" sm={9}>
          title
        </Col>
        <Col sm={1}>
          <Button onClick={toggleEditing}>Edit</Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3}>
          <Accordion>
            {files.map((file, index) => {
              return AccordionElement(file.filename, index, setSelected);
            })}
          </Accordion>
        </Col>
        <Col sm={9} className="h80 overflow-auto ">
          {editing ? (
            files[selected].contents
          ) : (
            <Markdown>{files[selected].contents}</Markdown>
          )}
        </Col>
      </Row>
    </Container>
  );
}

function AccordionElement(
  element: string,
  eventKey: number,
  setSelected: React.Dispatch<SetStateAction<number>>
): JSX.Element {
  const select = () => {
    setSelected(eventKey);
  };
  return (
    <Accordion.Item
      eventKey={eventKey.toString()}
      key={eventKey}
      onClick={select}
    >
      <Accordion.Header>{element}</Accordion.Header>
      <Accordion.Body>
        <div>kek</div>
        <div>keek</div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

function parser(text: string) {
  let i = 0;
  const lines = text.split("\n");
  let bookmarks: string[] = [];
  while (i < lines.length) {
    if (lines[i].startsWith("#")) {
      console.log(lines[i]);
    }
    i++;
  }
}
export default App;
