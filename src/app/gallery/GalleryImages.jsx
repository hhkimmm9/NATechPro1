"use client"

import React from 'react'
import { Text, Grid, Row, Col, Spacer, Card } from "@nextui-org/react";

const GalleryImages = ({ imageData }) => {

    const girlImages = [{
      "description": "Lady with a Teddy",
      "imageUrl": "https://images.pexels.com/photos/3348748/pexels-photo-3348748.jpeg"
    },
    {
      "description": "Girl with camera",
      "imageUrl": "https://images.pexels.com/photos/3812944/pexels-photo-3812944.jpeg"
    },
    {
      "description": "Beautiful Girl with Glasses",
      "imageUrl": "https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg"
    },
    {
      "description": "Redhead with frackles",
      "imageUrl": "https://images.pexels.com/photos/3228213/pexels-photo-3228213.jpeg"
    },
    {
      "description": "Girl in black dress",
      "imageUrl": "https://images.pexels.com/photos/1385472/pexels-photo-1385472.jpeg"
    },
    {
      "description": "Girl Sitting on Chair",
      "imageUrl": "https://images.pexels.com/photos/4725133/pexels-photo-4725133.jpeg"
    }
  ]

  return (
    <>
      <div className="p-5 flex bg-blue-900/10 rounded-lg">
        {girlImages && (
          <Grid.Container gap={2} wrap="wrap" justify="flex-start">
            {girlImages.map((item, index) => (
              <Grid xs={6} sm={3} key={index}>
                <Card isPressable borderWeight="light">
                  <Card.Body css={{ p: 0 }}>
                    <Card.Image
                      src={item.imageUrl}
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
            ))}
          </Grid.Container>
        )}
      </div>
    </>
  )
}

export default GalleryImages