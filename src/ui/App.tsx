import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  MouseEvent,
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
  ListGroupItem,
} from "react-bootstrap";
import Markdown from "react-markdown";
import {
  ContentEditableEvent,
  Editor,
  EditorProvider,
} from "react-simple-wysiwyg";

function App() {
  const [editing, setEditing] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);
  const [files, setFiles] = useState<filePackage[]>([
    { filename: "empty", contents: "Select Folder", bookmarks: [] },
  ]);
  const [editorBoxText, setEditorBoxText] = useState<string>("");
  const toggleEditing = (event: MouseEvent) => {
    event.preventDefault();
    setEditing(!editing);
    if (!editing) {
      console.log(JSON.stringify(files[selected].contents));
      setEditorBoxText(files[selected].contents);
    } else {
      const edited = editorBoxText.replaceAll("\n", "\r\n");
      const newFiles = files;
      newFiles[selected].contents = edited;
      setFiles(newFiles);
      console.log(JSON.stringify(files[selected].contents));
    }
  };
  const getFiles = async () => {
    // @ts-ignore
    const mdFilenames = await window.electron.getMarkdownFiles();
    setFiles(mdFilenames);
  };
  useEffect(() => {
    getFiles();
  }, []);

  return (
    <Container fluid className="border">
      <Row className="">
        <Col className="d-flex mt-3 text-start text-center" sm={1}>
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
            onClick={toggleEditing}
            variant="success"
            className="align-self-center"
          >
            Edit
          </Button>
        </Col>
      </Row>
      {editing ? (
        <EditingBox
          editorBoxText={editorBoxText}
          setEditorBoxText={setEditorBoxText}
        />
      ) : (
        <MainContentRow
          files={files}
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </Container>
  );
}

function MDCheatSheet() {
  return (
    <ListGroup>
      <ListGroup.Item variant="primary">Heading</ListGroup.Item>
      <ListGroup.Item variant="secondary">
        <div># H1</div>
        <div>## H2</div>
        <div>### H3</div>
      </ListGroup.Item>
      <ListGroup.Item variant="primary">Bold</ListGroup.Item>
      <ListGroup.Item variant="secondary">**bold text**</ListGroup.Item>
      <ListGroup.Item variant="primary">Italic</ListGroup.Item>
      <ListGroup.Item variant="secondary">*italicized text*</ListGroup.Item>
      <ListGroup.Item variant="primary">Blockquote</ListGroup.Item>
      <ListGroup.Item variant="secondary">{"> blockquote"}</ListGroup.Item>
      <ListGroup.Item variant="primary">Ordered List</ListGroup.Item>
      <ListGroup.Item variant="secondary">
        <div>1. First Item</div>
        <div>2. Second Item</div>
        <div>3. Third Item</div>
      </ListGroup.Item>
      <ListGroup.Item variant="primary">Unordered List</ListGroup.Item>
      <ListGroup.Item variant="secondary">
        <div>- First Item</div>
        <div>- Second Item</div>
        <div>- Third Item</div>
      </ListGroup.Item>
      <ListGroup.Item variant="primary">Code</ListGroup.Item>
      <ListGroup.Item variant="secondary">`code`</ListGroup.Item>
      <ListGroup.Item variant="primary">Horizontal Rule</ListGroup.Item>
      <ListGroup.Item variant="secondary">---</ListGroup.Item>
      <ListGroup.Item variant="primary">Link</ListGroup.Item>
      <ListGroup.Item variant="secondary">
        [title](https://www.example.com)
      </ListGroup.Item>
      <ListGroup.Item variant="primary">Image</ListGroup.Item>
      <ListGroup.Item variant="secondary">
        ![alt text](image.jpg)
      </ListGroup.Item>
    </ListGroup>
  );
}

function EditingBox(props: {
  editorBoxText: string;
  setEditorBoxText: React.Dispatch<SetStateAction<string>>;
}): JSX.Element {
  const { editorBoxText, setEditorBoxText } = props;
  const ref = useRef(null);
  function onChange() {
    // @ts-ignore
    console.log(JSON.stringify(ref.current.value));
    // @ts-ignore
    setEditorBoxText(ref.current?.value);
  }
  return (
    <Row>
      <Col sm={3} className="overflow-auto heightadj">
        <MDCheatSheet />
      </Col>
      <Col sm={9}>
        <textarea
          rows={30}
          cols={50}
          value={editorBoxText}
          ref={ref}
          onChange={onChange}
          spellCheck="false"
        />
      </Col>
    </Row>
  );
}
/*
 <EditorProvider>
          <Editor value={editorBoxText} onChange={onChange}></Editor>
        </EditorProvider>
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
    <Row className="">
      <Col sm={3}>
        <Accordion
          defaultActiveKey={props.selected.toString()}
          className="overflow-auto h90"
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
      <Col sm={9} className="heightadj overflow-auto">
        {textContent}
      </Col>
    </Row>
  );
}

const Target = forwardRef((props, ref) => {
  return (
    //@ts-ignore
    <div ref={ref}></div>
  );
});
export default App;
