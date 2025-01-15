import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Col,
  Container,
  Row,
  Accordion,
  Button,
  ListGroup,
} from "react-bootstrap";
import Markdown from "react-markdown";

function App() {
  const [editing, setEditing] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);
  const [lines, setLines] = useState<string[]>([]);
  const [files, setFiles] = useState<filePackage[]>([
    { filename: "empty", contents: "hey", bookmarks: [] },
  ]);

  const rebbi = useRef(null);
  const clickety = (e: any) => {
    e.preventDefault();
    // @ts-ignore
    rebbi.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleEditing = () => {
    //setEditing(!editing);
  };
  const getFiles = async () => {
    // @ts-ignore
    const mdFilenames = await window.electron.getMarkdownFiles();
    setFiles(mdFilenames);
    const mdlines = parser(files[0].contents);
    setLines(mdlines);
  };
  useEffect(() => {
    getFiles();
  }, []);
  const testement = () => {
    const a = [];
    let d = "";
    const t = ["lol", "hey", "kek"];
    t.map((value, index, array) => {
      d += value;
      if (index === array.length + 1) {
      }
    });
    return d;
  };
  return (
    <Container className="ms-0 me-0 mb-3 h90">
      <Row className="mb-3 ">
        <Col className="text-start text-center" sm={1}>
          Explorer
        </Col>
        <Col sm={2} className="d-flex flex-row-reverse">
          <Button
            onClick={getFiles}
            variant="info"
            className="align-self-center"
          >
            Dir
          </Button>
        </Col>
        <Col className="text-center " sm={8}>
          <h1>{files[selected].filename}</h1>
        </Col>
        <Col sm={1} className="d-flex">
          <Button
            onClick={clickety}
            variant="success"
            className="align-self-center"
          >
            Edit
          </Button>
        </Col>
      </Row>
      <MainContentRow
        files={files}
        selected={selected}
        setSelected={setSelected}
      />
    </Container>
  );
}
/* 
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
*/
function GenerateElements(textBody: string): {
  bookmarks: JSX.Element[];
  textContent: JSX.Element[];
} {
  const lines = textBody.split("\n");
  let tmptxt = "";
  const explorer: JSX.Element[] = [];
  const editor: JSX.Element[] = [];
  lines.map((value, index, array) => {
    if (value.startsWith("# ") || value.startsWith("## ")) {
      tmptxt = "";
      const ref = useRef<HTMLDivElement>(null);
      const bookmarkClick = (event: MouseEvent) => {
        event.preventDefault();
        ref.current?.scrollIntoView({ behavior: "smooth" });
      };
      const colorVariant = value.startsWith("# ") ? "primary" : "secondary";
      explorer.push(
        <ListGroup.Item variant={colorVariant} onClick={bookmarkClick}>
          {value}
        </ListGroup.Item>
      );
      editor.push(<Target ref={ref} />);
    }
    tmptxt += value;
    if (index === array.length - 1) {
      editor.push(<Markdown>{tmptxt}</Markdown>);
    } else if (
      array[index + 1].startsWith("# ") ||
      array[index + 1].startsWith("## ")
    ) {
      editor.push(<Markdown>{tmptxt}</Markdown>);
    }
  });

  return { bookmarks: explorer, textContent: editor };
}

function MainContentRow(props: {
  files: filePackage[];
  selected: number;
  setSelected: React.Dispatch<SetStateAction<number>>;
}): JSX.Element {
  const { bookmarks, textContent } = GenerateElements(
    props.files[props.selected].contents
  );
  return (
    <Row className="mb-3">
      <Col sm={3}>
        <Accordion
          defaultActiveKey={props.selected.toString()}
          className="overflow-auto h80"
        >
          {props.files.map((value, index, array) => {
            if (index === props.selected) {
              return (
                <Accordion.Item
                  eventKey={index.toString()}
                  key={index.toString()}
                >
                  <Accordion.Header>{value.filename}</Accordion.Header>
                  <Accordion.Body>
                    {<ListGroup>{bookmarks}</ListGroup>}
                  </Accordion.Body>
                </Accordion.Item>
              );
            } else {
              return (
                <Accordion.Item
                  eventKey={index.toString()}
                  key={index.toString()}
                  onClick={() => {
                    props.setSelected(index);
                  }}
                >
                  <Accordion.Header>{value.filename}</Accordion.Header>
                </Accordion.Item>
              );
            }
          })}
        </Accordion>
      </Col>
      <Col sm={9} className="h80 overflow-auto">
        {textContent}
      </Col>
    </Row>
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

function parser(text: string): string[] {
  let i = 0;
  const lines = text.split("\n");
  let bookmarks: string[] = [];
  let jsxString = "";
  while (i < lines.length) {
    if (lines[i].startsWith("# ")) {
      jsxString += `<div href=>`;
    } else if (lines[i].startsWith("## ")) {
    } else if (lines[i].startsWith("### ")) {
    }
    i++;
  }
  return lines;
}
const Target = forwardRef((props, ref) => {
  return (
    //@ts-ignore
    <div ref={ref}></div>
  );
});
export default App;
