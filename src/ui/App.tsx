import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  ReactElement,
  SetStateAction,
  forwardRef,
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

  const rebbi = useRef(null);
  const clickety = (e: any) => {
    e.preventDefault();
    // @ts-ignore
    rebbi.current?.scrollIntoView({ behavior: "smooth" });
  };
  const Target = forwardRef((props, ref) => {
    return (
      //@ts-ignore
      <div ref={ref}></div>
    );
  });
  const toggleEditing = () => {
    //setEditing(!editing);
  };
  const getFiles = async () => {
    // @ts-ignore
    const mdFilenames = await window.electron.getMarkdownFiles();
    setFiles(mdFilenames);
    //parser(files[0].contents);
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
          <Button onClick={clickety}>Edit</Button>
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
            <div>
              <Markdown># Vocant ictu tuearis</Markdown>
              <Markdown> ## Adeste animos inpia</Markdown>
              <Markdown>
                cupido manibus vocalia non Lorem markdownum dictu temerarius
                venisses te parvo faciat inhibente sperneret suorum. Qui acui
                cristis pennas a quoque [cum praebere](http://www.creatis.org/)
                quae, ab. Supplex natus. ## Et equo ab Nelei territus liquores
                imagine Essem tardus animum conlapsa dorso auro, dei alimenta
                ignoscere veneni? Vidit corporeusque sidera, partem, geniti opem
                silvas _carmine_. Et nymphae nitebat figuras _corpus
                nebulasque_, promissaque quae, quo vox adest cernunt: quas iam
                muneris. Urbes concordia? \n ## Sustinet latuit concursibus
                eductam Adunco Medusae \n ego salices relinquit et furit
                submovet instar, socium palustres infelix Exigit.
                [Adsiduis](http://www.concutiuntque.com/cavo.html) dona [advena
                tum](http://adspergine.io/furialibus-pietas.html) quae numerare
                boum, tantum aequa, ac causa? Amnes sole tenuisse nati iam
                trepidoque, temptemus
                [filius](http://utrimque.io/ruit-aphareus), ut mente potuit hoc:
                Athenae. [Proxima](http://locumque.io/) oculos inque Hylen sine
                rotatum iunxit in sed dum patiuntur? Mactare quoque tempora
                argenteus; fassaque favorque ut nuper flamma tot ostro
                sequuntur.\n
              </Markdown>
              <Markdown>
                ## Et dives et matrumque mihi tollit perspicit \n
              </Markdown>

              <Markdown>
                Non quis quam Ismenides potui procellamnos Aeson moratus victrix
                cognoscendo saepe superantque! Nomen unum; me nunc nitidum: esse
                sidera nactus potest tenet. Ipse que penetralia viginti
                discedere flammis feroces vetat, o coniugis pennis! Ego in est
                procul levabas ex ulla excitus vincula mihi eundo fugacia
                saltem, Phoebus caedis. Dare inlimis denique omen retentus teli?
                Tum inane aetatis plenaque, tibi habet cruoris Aetna, laetos num
                agat eramque. Micant per et sua mortisque dictis commissaque ego
                tellus: pater fractarum respiceret extis manus. Germanae
                meliore, quae alii, credas silvis fit latis miserata. Et
                inclamare ingreditur corpus scelus, una nisi onus rerum.
                Detrahat aqua _me sedem perspicit_ herbas: _mens cum quacumque_
                orbem tuentem memorque in cognosceret cura profugi! Bucina tua
                caeli et regia.
              </Markdown>

              <Target ref={rebbi} />
            </div>
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
  let jsxString = "";
  while (i < lines.length) {
    if (lines[i].startsWith("# ")) {
      jsxString += `<div href=>`;
    } else if (lines[i].startsWith("## ")) {
    } else if (lines[i].startsWith("### ")) {
    }
    i++;
  }
}
export default App;
