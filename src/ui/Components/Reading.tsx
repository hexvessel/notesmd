import { SetStateAction, MouseEvent, useRef } from "react";
import Markdown from "react-markdown";
import { Target } from "./Target";
import { Col, Row, Accordion, ListGroup } from "react-bootstrap";

export function GenerateElements(textBody: string): {
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

export function MainContentRow(props: {
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
