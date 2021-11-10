import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Box,
  Text,
  Grommet,
  Grid,
} from "grommet";
import React, { useEffect, useState } from "react";
import { Money, Currency } from "grommet-icons";
import { useSelector } from "react-redux";

export default function CompanyCard(props) {
  return (
    <Card background={props.color} key={props.key}>
      <CardBody pad="small">
        <Box gap="small" align="center">
          <Text size="xlarge" weight="bold" margin={{ bottom: "small" }}>
            $ {props.total}
          </Text>
          <Text size="medium" weight="bold">
            {props.title}
          </Text>
          <Text size="medium">{props.subTitle}</Text>
        </Box>
      </CardBody>
      <CardFooter pad={{ horizontal: "medium", vertical: "small" }}>
        <Text size="xsmall">{props.message}</Text>
      </CardFooter>
    </Card>
  );
}
