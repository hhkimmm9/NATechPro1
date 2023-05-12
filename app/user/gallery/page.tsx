"use client";

import { Card, Text, Grid, Row, Col, Spacer } from "@nextui-org/react";
import SearchInput from "../components/SearchInput";

export default function Gallery() {
  const list = [
    {
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      price: 200,
      tags: "fruit, orange",
      date: "May 10, 2023",
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      date: "December 20, 2022",
    },
    {
      title: "Cherry",
      img: "/images/fruit-3.jpeg",
    },
    {
      title: "Lemon",
      img: "/images/fruit-4.jpeg",
    },
    {
      title: "Avocado",
      img: "/images/fruit-5.jpeg",
      tags: "fruit",
    },
    {
      title: "Lemon 2",
      img: "/images/fruit-6.jpeg",
    },
    {
      title: "Banana",
      img: "/images/fruit-7.jpeg",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
    },
  ];

  return (
    <div className="p-5 flex flex-col h-full">
      <div>
        <text className="font-bold text-lg px-5">My Gallery</text>
        <SearchInput />
        <Spacer></Spacer>
      </div>
      <div className="p-5 flex">
        <Grid.Container gap={2} wrap="wrap" justify="flex-start">
          {list.map((item, index) => (
            <Grid xs={6} sm={3} key={index}>
              <Card isPressable borderWeight="light">
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={"https://nextui.org" + item.img}
                    objectFit="cover"
                    width={240}
                    height={200}
                    alt={item.title}
                  />
                </Card.Body>
                <Card.Footer css={{ justifyItems: "flex-start" }}>
                  <Row wrap="wrap" justify="space-between" align="center">
                    <Text b>{item.title}</Text>
                    <Col>
                      <Text
                        css={{
                          color: "$accents7",
                          fontWeight: "$semibold",
                          fontSize: "$sm",
                        }}
                      >
                        Tags: {item.tags}
                      </Text>
                    </Col>
                    <Col>
                      <Text
                        css={{
                          color: "$accents7",
                          fontWeight: "$semibold",
                          fontSize: "$sm",
                        }}
                      >
                        Date: {item.date}
                      </Text>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      </div>
    </div>
  );
}
