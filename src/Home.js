import React, { useState, useEffect } from "react";
import { Card, Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";

const Home = () => {
  const [gitContain, setgitContain] = useState([]);
  let [search, setSearch] = useState("");
  useEffect(function () {
    axios
      .get("http://localhost:90/api")
      .then(function (response) {
        if (response.data.success) {
          setgitContain(response.data.data);
        } else {
          setgitContain([]);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  let filter = gitContain.filter(function (val) {
    return val.repository_name
      .toLowerCase()
      .trim()
      .startsWith(search.toLowerCase().trim());
  });
  console.log(gitContain);
  return (
    <Container>
      <Row>
        <input
          type="text"
          className="form-control"
          name="search"
          placeholder="Search your repo"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        {filter.map(function (data) {
          return (
            <Col lg={3}>
              <Card className="m-3">
                <Card.Body>
                  <Card.Title>Repository Detail</Card.Title>
                  <Card.Text>
                    <strong>Repository_name:</strong>
                    {data.repository_name}
                  </Card.Text>
                  <Card.Text>
                    <strong>Author:</strong>
                    {data.author}
                  </Card.Text>
                  <Card.Text>
                    <strong>No of stars:</strong>
                    {data.no_of_star}
                  </Card.Text>
                  <Card.Text>
                    <strong>Watcher:</strong>
                    {data.watcher}
                  </Card.Text>
                  <Card.Text>
                    <strong>Fork:</strong>
                    {data.forks}
                  </Card.Text>
                  <Card.Text>
                    <strong>Description:</strong>
                    {data.desc}
                  </Card.Text>
                  <Card.Text>
                    <strong>Last updated:</strong>
                    {data.last_update}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Home;
