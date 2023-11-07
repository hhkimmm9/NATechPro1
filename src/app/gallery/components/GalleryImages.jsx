"use client"

import React from 'react'
import { Text, Grid, Row, Col, Spacer, Card } from "@nextui-org/react";

const GalleryImages = ({ imageData, galleryType }) => {
  return (
    <>
      <div className="p-5 flex rounded-lg shadow bg-stone-100">
        {imageData && (
          <Grid.Container gap={2} wrap="wrap" justify="flex-start">
            { imageData.map((item, index) => {
              if (item.type === galleryType) {
                return (
                  <Grid xs={6} sm={3} key={index}>
                    <Card isPressable borderWeight="light">
                      <Card.Body css={{ p: 0 }}>
                        <Card.Image
                          src={item.image}
                          objectFit="cover"
                          width={240}
                          height={200}
                          alt={item.description}
                        />
                      </Card.Body>
                      <Card.Footer css={{ justifyItems: "flex-start" }}>
                        <Row wrap="wrap" justify="space-between" align="center">
                          <Text b>{item.description}</Text>
                          {/* <Col>
                            <Text css={{
                              color: "$accents7",
                              fontWeight: "$semibold",
                              fontSize: "$sm",
                            }}>
                              Tags: {item.tags}
                            </Text>
                          </Col> */}
                        </Row>
                      </Card.Footer>
                    </Card>
                  </Grid>
                )
              } 
              
            })}
          </Grid.Container>
        )}
      </div>
    </>
  )
}

export default GalleryImages