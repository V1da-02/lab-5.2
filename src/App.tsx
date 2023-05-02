import { FileOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Layout,
  Menu,
  MenuProps,
  Row,
  Spin,
} from "antd";
import Card from "antd/es/card/Card";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import "./App.css";
import Car from "./car";
import storeProvider from "./mst/store/StoreProvider";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const carCards: Car[] = [
  {
    caiputere: "UTM",
    culoare: "7.659",
    caroserie: "tractiune fata",
    motor: "1.400",
    cuteiedeviteze: 7,
    incalzireautonoma: true,
    image: "/utm.jpg",
  },
  {
    caiputere: "ASEM",
    culoare: "8.750",
    caroserie: "tractiune spate",
    motor: "1.700",
    cuteiedeviteze: 9,
    incalzireautonoma: true,
    image: "/asem.jpg",
  },
  {
      caiputere: "ULIM",
    culoare: "4.639",
    caroserie: "tractiune 4x4",
    motor: "700",
    cuteiedeviteze: 5,
    incalzireautonoma: false,
    image: "/ulim.jpg",
  },
];

const App = observer(() => {
  const [collapsed, setCollapsed] = useState(false);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cards, setCards] = useState<
    {
      title: string;
      name: string;
      email: string;
      password: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const {
    contents,
    contents_notes,
    addNote,
    removeNote,
    setInitialStorageContents,
    loadDataFromLocalStorage,
  } = storeProvider;

  useEffect(() => {
    setInitialStorageContents();
    setLoading(true);
    setTimeout(() => {
      loadDataFromLocalStorage("content_notes");
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <Layout
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />;
      </Layout>
    );
  }

  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              background: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: "#001529" }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Ovidiu</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 360, background: "#fff" }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Date: ", title, name, email, password);
                  setCards([
                    ...cards,
                    {
                      title,
                      name,
                      email,
                      password,
                    },
                  ]);
                }}
              >
                <Row
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <Col span={6}>
                    <label>
                      Titlu card:
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </label>
                  </Col>
                </Row>

                <Row
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <Col span={6}>
                    <label>
                      Nume:
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </label>
                  </Col>
                </Row>

                <Row
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <Col span={6}>
                    <label>
                      Email:
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                  </Col>
                </Row>

                <Row
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <Col span={6}>
                    <label>
                      Password:
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </label>
                  </Col>
                </Row>

                <Row>
                  <Col span={6}>
                    <button>Submit</button>
                  </Col>
                </Row>
              </form>

              {cards.map((card, index) => (
                <Card
                  key={index}
                  title={card.title}
                  style={{ width: 300, marginTop: "20px" }}
                >
                  <p>Nume: {card.name}</p>
                  <p>Email: {card.email}</p>
                  <p>Password: {card.password}</p>
                </Card>
              ))}

              <Row justify="center" gutter={16}>
                {carCards.map((car, index) => (
                  <Col key={index} span={6}>
                    <Card
                      title={`Universitatea nr. ${index + 1}`}
                      style={{ marginTop: "60px" }}
                    >
                  
                      <img src={car.image} style={{ width: 300 }} />
                      <p>Denumire: {car.caiputere}</p>
                     
                      <p>Nr studenti: {car.culoare}</p>
                      <p>Nr facultati: {car.cuteiedeviteze}</p>
                      
                      <p>Locuri bursa: {car.motor}</p>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Row justify="center" style={{ marginBottom: "50px" }}>
                <h2>Data from RootStore</h2>
              </Row>

              {contents.map((noteCategory) => (
                <Row
                  key={noteCategory?.title}
                  justify="center"
                  gutter={[16, 16]}
                  style={{ margin: "20px", width: "100%" }}
                >
                  <Col span={16}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "30px",
                      }}
                    >
                      <label>
                        {noteCategory.title}:
                        <input
                          type="text"
                          value={noteCategory.notes}
                          style={{
                            marginLeft: "10px",
                          }}
                          onChange={(e) =>
                            noteCategory.changeNotes(e.target.value)
                          }
                        />
                      </label>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "20px",
                        }}
                      >
                        <Button
                          style={{ marginRight: "10px" }}
                          onClick={() => addNote(noteCategory)}
                        >
                          Add
                        </Button>
                        <Button onClick={() => removeNote(noteCategory.id)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              ))}

              <Row justify="center">
                {contents_notes.map((note) => (
                  <Col key={note?.id} span={6}>
                    <Card style={{ width: 300 }}>
                      <p>{note?.notes}</p>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
});

export default App;
