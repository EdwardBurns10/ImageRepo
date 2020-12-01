import React from "react";
import styled from "styled-components";
import { EuiCard, EuiButtonIcon } from "@elastic/eui";

const Illustration = styled.img`
  max-height: 200px;
`;

export const ImCard = ({ content, onRemove, onEdit }) => {
  const image = content._attachments && content._attachments.image;

  return (
    <EuiCard
      icon={
        image ? (
          <Illustration
            src={`data:${image.content_type};base64,${image.data}`}
            alt={content.title}
          />
        ) : (
          <Illustration src="./logo192.png" alt="image missing" />
        )
      }
      title={content.title}
      description={content.description}
      footer={
        <React.Fragment>
          <EuiButtonIcon
            aria-label="Remove"
            color="danger"
            iconType="trash"
            onClick={onRemove}
          />
          <EuiButtonIcon
            aria-label="Remove"
            iconType="pencil"
            onClick={onEdit}
          />
        </React.Fragment>
      }
    />
  );
};
