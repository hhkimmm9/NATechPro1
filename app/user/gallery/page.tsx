"use client";

import React, { useState, useEffect } from "react";
import { Text, Grid, Row, Col, Spacer, Card } from "@nextui-org/react";
import SearchInput from "../components/SearchInput";
// import Card from "../components/Card";
import axios from "axios";
import { IGallery } from "@/backend/models/GalleryModel";
import { useSession } from "next-auth/react";

export default function Gallery() {
  const [imagesToShow, setImagesToShow] = useState<IGallery[] | undefined>(
    undefined
  );

  const session = useSession();

  useEffect(() => {
    if (!session.data) return;
    const getImgs = async () => {
      const config = {
        headers: {
          // authorization: "secretJWT",
          authorization: `Bearer ${session.data.user.accessToken}`,
        },
      };
      await axios.get("/api/gallery", config).then(({ data }) => {
        console.log(data);
        setImagesToShow(data);
      });
    };
    // fetch images from the server
    getImgs();
  }, []);

  return (
    <div className="p-5 flex flex-col h-full">
      <div>
        <text className="font-bold text-lg px-5">My Gallery</text>
        {/* <SearchInput /> */}
        <Spacer></Spacer>
      </div>
      <div>
        <text className="px-5 font-semibold">Sort By: </text>
        <Spacer></Spacer>
      </div>
      <div className="p-5 flex bg-blue-900/10 rounded-lg">
        {imagesToShow ? (
          <Grid.Container gap={2} wrap="wrap" justify="flex-start">
            {imagesToShow.map((item, index) => (
              <Grid xs={6} sm={3} key={index}>
                <Card isPressable borderWeight="light">
                  <Card.Body css={{ p: 0 }}>
                    <Card.Image
                      src={item.image}
                      // { imagesToShow?.map(item =>  {item.image} ) }
                      objectFit="cover"
                      width={240}
                      height={200}
                      alt={item.name}
                    />
                  </Card.Body>
                  <Card.Footer css={{ justifyItems: "flex-start" }}>
                    <Row wrap="wrap" justify="space-between" align="center">
                      <Text b>{item.name}</Text>
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
                          Date: no date on the images
                        </Text>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </Grid>
            ))}
          </Grid.Container>
        ) : null}
      </div>
    </div>
  );
}
