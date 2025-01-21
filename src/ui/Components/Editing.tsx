import { SetStateAction, useRef } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";

export function MDCheatSheet() {
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

export function EditingBox(props: {
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
